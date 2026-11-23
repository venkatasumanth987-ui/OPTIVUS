// Public demo capture is write-only. The owner reviews submissions in Sites' database viewer.
const reply=(status,message)=>Response.json({message},{status,headers:{'Cache-Control':'no-store'}});

const recipients=['krishnapriya.techlura@gmail.com','venkatasumanth987@gmail.com'];

function base64(text){
  return btoa(String.fromCharCode(...new TextEncoder().encode(text)));
}

function enquiryMail(sender,id,{name,email,hospital,designation,phone,message}){
  const text=[`Full name: ${name}`,`Official email: ${email}`,`Hospital / Organization: ${hospital}`,
    `Designation: ${designation}`,`Phone number: ${phone}`,'Message:',message].join('\r\n');
  const mime=[`From: ${sender}`,`To: ${recipients.join(', ')}`,`Reply-To: ${email}`,
    'Subject: OPTIVUS demo enquiry',`Message-ID: <optivus-${id}@gmail.com>`,
    'Date: '+new Date().toUTCString(),'MIME-Version: 1.0','Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64','',base64(text).match(/.{1,76}/g).join('\r\n')].join('\r\n');
  return base64(mime).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}

async function accessToken(env){
  const response=await fetch('https://oauth2.googleapis.com/token',{
    method:'POST',redirect:'manual',
    body:new URLSearchParams({grant_type:'refresh_token',client_id:env.GOOGLE_CLIENT_ID,
      client_secret:env.GOOGLE_CLIENT_SECRET,refresh_token:env.GMAIL_REFRESH_TOKEN})
  });
  const result=await response.json().catch(()=>({}));
  if(response.ok&&typeof result.access_token==='string')return {token:result.access_token};
  const code=typeof result.error==='string'?result.error:'unknown';
  console.warn('Gmail OAuth token request failed',response.status,code);
  if(code==='invalid_client')return {message:'Gmail setup error: check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET match the same OAuth client.'};
  if(code==='invalid_grant')return {message:'Gmail authorization expired or was revoked. Create a fresh refresh token for this sender and update GMAIL_REFRESH_TOKEN.'};
  if(code==='unauthorized_client'||code==='invalid_scope')return {message:'Gmail authorization is not permitted. Check the OAuth consent setup and gmail.send permission.'};
  return {message:'Gmail authorization failed. Check the three Google OAuth values in site environment settings.'};
}

function gmailSendError(status,reason){
  console.warn('Gmail send request failed',status,reason);
  if(status===401)return 'Gmail authorization was rejected. Reauthorize the sender and replace GMAIL_REFRESH_TOKEN.';
  if(status===403)return 'Gmail denied sending. Confirm Gmail API is enabled and gmail.send permission was authorized.';
  if(status===400)return 'Gmail rejected the message. Check the OAuth Playground scope and request details.';
  return 'Gmail could not accept the message right now. Please try again.';
}

async function receiveDemo(request,env){
  if(request.method!=='POST')return new Response(null,{status:405,headers:{Allow:'POST'}});
  const origin=request.headers.get('Origin');
  if(origin&&origin!==new URL(request.url).origin)return reply(403,'Invalid origin');
  if(!request.headers.get('Content-Type')?.startsWith('application/json'))return reply(415,'Expected JSON');
  if(Number(request.headers.get('Content-Length'))>16384)return reply(413,'Request too large');
  const reader=request.body?.getReader();
  if(!reader)return reply(400,'Missing details');
  const decoder=new TextDecoder();
  let size=0,body='';
  for(;;){
    const {done,value}=await reader.read();if(done)break;
    size+=value.byteLength;
    if(size>16384){await reader.cancel();return reply(413,'Request too large')}
    body+=decoder.decode(value,{stream:true});
  }
  let data;
  try{data=JSON.parse(body+decoder.decode())}catch{return reply(400,'Invalid JSON')}
  const clean=(key,max)=>{
    const v=data?.[key];return typeof v==='string'&&v.trim().length<=max?v.trim():'';
  };
  const name=clean('name',90),hospital=clean('hospital',140),email=clean('email',254).toLowerCase();
  const designation=clean('designation',120),phone=clean('phone',32),message=clean('message',2000);
  const id=clean('id',36);
  if(!name||!hospital||!designation||!message||!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z0-9-]+$/.test(email)||email.split('@').length!==2)
    return reply(400,'Please complete all fields and enter a valid official email.');
  if(!/^[+\d\s().-]+$/.test(phone)||!/^\d{7,15}$/.test(phone.replace(/\D/g,'')))
    return reply(400,'Enter a phone number with 7 to 15 digits.');
  if(!/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(id))return reply(400,'Please refresh the form and try again.');
  const details=JSON.stringify({name,email,hospital,designation,phone,message});
  let recorded=false;
  let stage='save enquiry';
  try{
    stage='save enquiry';
    await env.DB.prepare('INSERT INTO demo_enquiries(id,details) VALUES(?,?) ON CONFLICT(id) DO NOTHING').bind(id,details).run();
    const saved=await env.DB.prepare('SELECT details,provider_id FROM demo_enquiries WHERE id=?').bind(id).first();
    if(saved.details!==details)return reply(409,'Please refresh the form and try again.');
    recorded=true;
    if(saved.provider_id)return reply(200,'Sent');
    const sender=env.GMAIL_SENDER_EMAIL?.trim().toLowerCase();
    if(!sender||!/^\S+@[^\s@]+\.[^\s@]+$/.test(sender)||!env.GOOGLE_CLIENT_ID||!env.GOOGLE_CLIENT_SECRET||!env.GMAIL_REFRESH_TOKEN)
      return reply(503,'Your enquiry is saved. We could not send the email. Please try again later.');
    const raw=enquiryMail(sender,id,JSON.parse(details));
    stage='get Gmail authorization';
    const auth=await accessToken(env);
    if(!auth.token)return reply(503,'Your enquiry is saved. '+auth.message);
    stage='mark email sending';
    const claim=await env.DB.prepare("UPDATE demo_enquiries SET smtp_state='sending' WHERE id=? AND provider_id IS NULL AND smtp_state='ready'").bind(id).run();
    if(!claim.meta.changes)return reply(503,'Your enquiry was recorded. Email confirmation is pending.');
    stage='send Gmail message';
    const response=await fetch('https://gmail.googleapis.com/gmail/v1/users/'+'me/messages/send',{
      method:'POST',redirect:'manual',
      headers:{Authorization:'Bearer '+auth.token,'Content-Type':'application/json'},body:JSON.stringify({raw})
    });
    if(!response.ok){
      const error=await response.json().catch(()=>({}));
      const reason=error.error?.errors?.[0]?.reason||error.error?.status||'unknown';
      if(response.status<500)await env.DB.prepare("UPDATE demo_enquiries SET smtp_state='ready' WHERE id=?").bind(id).run();
      return reply(503,'Your enquiry is saved. '+gmailSendError(response.status,reason));
    }
    stage='read Gmail confirmation';
    const result=await response.json();
    if(typeof result.id!=='string'||!result.id)return reply(503,'Your enquiry was recorded. Email confirmation is pending.');
    stage='save Gmail confirmation';
    await env.DB.prepare("UPDATE demo_enquiries SET provider_id=?,smtp_state='sent' WHERE id=?").bind(result.id,id).run();
    return reply(201,'Sent');
  }catch(error){
    const kind=error instanceof Error?error.name:'UnknownError';
    const cause=error?.cause;
    const safeMessage=error instanceof Error?error.message.slice(0,80):'';
    const causeName=cause instanceof Error?cause.name:'';
    const causeCode=typeof cause?.code==='string'&&/^[A-Z0-9_]+$/.test(cause.code)?cause.code:'';
    console.error('Demo email operation failed',stage,kind,causeName,causeCode,safeMessage);
    let failure='Email service connection failed.';
    if(causeName==='TimeoutError'||kind==='TimeoutError')failure='Connection to Google timed out.';
    else if(causeCode)failure='Google connection failed ('+causeCode+').';
    return reply(503,recorded?'Your enquiry is saved. '+failure+' Please retry in a few minutes.':'We could not confirm submission. Please try again.');
  }
}

export default {
  async fetch(request,env){
    const path=new URL(request.url).pathname;
    if(path==='/api/demo-requests')return receiveDemo(request,env);
    if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405});
    const key=['/','/workspace','/workspace/','/control','/control/'].includes(path)?'/index.html':path;
    if(!Object.hasOwn(publicAssets,key))return new Response('Page not found',{status:404});
    const [mime,base64]=publicAssets[key];
    const bytes=request.method==='HEAD'?null:Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
    return new Response(bytes,{headers:{'Content-Type':mime,'X-Content-Type-Options':'nosniff','Cache-Control':key.startsWith('/assets/')?'public,max-age=3600':'no-cache'}});
  }
};
