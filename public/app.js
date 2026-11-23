/* OPTIVUS interactive prototype — all records are fictional and stored in this browser only. */
(() => {
  'use strict';
  const KEY = 'optivus-demo-v1.4';
  const TODAY = localDate();
  const ICONS = {
    plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
    cross:'<path d="M12 4v16M4 12h16"/>',home:'<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    box:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/>',
    truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8"/><circle cx="6.5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    swap:'<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
    clipboard:'<rect x="5" y="5" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M9 13h6M9 17h4"/>',
    chart:'<path d="M3 20h18M6 16v-5M11 16V6M16 16v-9M21 16V3"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
    building:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 21v-5h6v5M8 7h2M14 7h2M8 11h2M14 11h2"/>',
    shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19 13.5a1 1 0 0 0 .2 1.1l1 1.2-2 2-1.2-1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.7.9L15 20h-3l-.3-1.5a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-1.2 1-2-2 1-1.2a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.7L5 13v-3l1.5-.3a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-1-1.2 2-2 1.2 1a1 1 0 0 0 1.1.2 1 1 0 0 0 .7-.9L12 3h3l.3 1.5a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l1.2-1 2 2-1 1.2a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.7L21 10v3z"/>',
    check:'<path d="m5 12 4 4L19 6"/>',alert:'<path d="m12 3 10 18H2zM12 9v4M12 17h.01"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
    file:'<path d="M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 17h6"/>',
    activity:'<path d="M2 12h5l3-7 4 14 3-7h5"/>',
    return:'<path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-2"/>',
    edit:'<path d="m4 20 4-.8L20 7l-3-3L5 16zM15 6l3 3"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="M5 5l14 14M19 5 5 19"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    layers:'<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    filter:'<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    hospital:'<path d="M3 21V7l9-5 9 5v14M9 21v-6h6v6M9 9h6M12 6v6M3 21h18"/>',
    barcode:'<path d="M3 4v16M6 4v16M10 4v16M13 4v16M16 4v16M20 4v16"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    log:'<path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M13 7l5 5-5 5M18 12H7"/>',
    heart:'<path d="M20 5a5 5 0 0 0-7 0l-1 1-1-1a5 5 0 0 0-7 7l8 9 8-9a5 5 0 0 0 0-7Z"/>',
    spark:'<path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z"/>'
  };
  const ROLE_INFO = {
    admin:{label:'Hospital Admin',name:'K Krishna Priya',title:'System Administrator',dept:null},
    head:{label:'Hospital Head',name:'N Lakshmi Sowmika',title:'Medical Superintendent',dept:null},
    store:{label:'Store Manager',name:'Kavya Iyer',title:'Central Store',dept:'store'},
    staff:{label:'Department Staff',name:'Neha Reddy',title:'ICU Nursing Team',dept:'icu'}
  };
  const DEMO_ACCOUNTS = [
    {key:'staff',label:'Department Staff',email:'staff@optivus.demo',role:'staff',portal:'workspace',dept:'icu',name:'Neha Reddy',title:'ICU Department Staff'},
    {key:'store',label:'Employee / Store Manager',email:'employee@optivus.demo',role:'store',portal:'workspace',dept:'store',name:'Kavya Iyer',title:'Store Manager'},
    {key:'nurse',label:'ICU Nurse',email:'nurse@optivus.demo',role:'staff',portal:'workspace',dept:'icu',name:'Ananya Sharma',title:'ICU Nurse'},
    {key:'ward',label:'Ward Staff',email:'ward@optivus.demo',role:'staff',portal:'workspace',dept:'ward',name:'Rahul Singh',title:'General Ward Staff'},
    {key:'lab',label:'Lab Technician',email:'lab@optivus.demo',role:'staff',portal:'workspace',dept:'lab',name:'Asha Nair',title:'Laboratory Technician'},
    {key:'ot',label:'OT Technician',email:'ot@optivus.demo',role:'staff',portal:'workspace',dept:'ot',name:'Vikram Shah',title:'Operation Theatre Technician'},
    {key:'head',label:'Hospital Head',email:'head@optivus.demo',role:'head',portal:'control',dept:null,name:'N Lakshmi Sowmika',title:'Hospital Head / Superintendent'},
    {key:'admin',label:'Hospital Admin',email:'admin@optivus.demo',role:'admin',portal:'control',dept:null,name:'K Krishna Priya',title:'Hospital Administrator'}
  ];
  const NAV = {
    workspace:[['overview','Overview','grid'],['inventory','Inventory','box'],['receive','Stock Inward','truck'],['issue','Stock Issue','swap'],['usage','Daily Consumption','clipboard'],['requests','Stock Requests','file'],['returns','Returns','return'],['verify','Stock Verification','shield'],['reports','Daily Reports','chart'],['activity','Activity History','clock']],
    control:[['overview','Command Center','grid'],['departments','Departments','building'],['items','Item Catalogue','layers'],['staff','Staff & Access','users'],['approvals','Approvals','check'],['reports','Analytics & Reports','chart'],['audit','Audit Trail','shield'],['settings','Settings','settings']]
  };
  const app=document.getElementById('app');
  let db=loadDB();
  let ui={screen:'landing',mode:'workspace',page:'overview',role:null,loginId:'',identity:null,dept:'icu',modal:null,filter:'all',search:'',form:{},reportDate:TODAY,mobileMenu:false,sidebarCollapsed:false,loginType:'staff',loginShowPassword:false,loginShowDemo:false,loginError:'',trendRange:'7d'};
  function icon(name,cls=''){return `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]||ICONS.box}</svg>`}
  function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function localDate(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function daysFromNow(n){const d=new Date();d.setDate(d.getDate()+n);return localDate(d)}
  function dateLabel(iso){if(!iso)return '—';const [y,m,d]=iso.split('-').map(Number);return new Date(y,m-1,d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}
  function daysUntil(iso){const a=new Date(TODAY+'T12:00:00'),b=new Date(iso+'T12:00:00');return Math.round((b-a)/86400000)}
  const money=n=>'₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:0});
  const fmt=n=>Number(n||0).toLocaleString('en-IN');
  function id(prefix){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6)}
  function seedDB(){
    const departments=[
      {id:'icu',name:'Intensive Care Unit',code:'ICU',active:true,description:'Critical care and monitored beds'},
      {id:'er',name:'Emergency',code:'ER',active:true,description:'Emergency and immediate care'},
      {id:'ot',name:'Operation Theatre',code:'OT',active:true,description:'Surgical and procedure rooms'},
      {id:'ward',name:'General Ward',code:'WARD',active:true,description:'Inpatient nursing units'},
      {id:'lab',name:'Laboratory',code:'LAB',active:true,description:'Diagnostics and sample collection'}
    ];
    const items=[
      {id:'gloves',name:'Nitrile Examination Gloves',sku:'CON-1001',category:'Protective Equipment',unit:'pcs',minimum:500,depts:['icu','er','ot','ward','lab']},
      {id:'syringe',name:'Disposable Syringe 5 mL',sku:'CON-1002',category:'Injection Supplies',unit:'pcs',minimum:350,depts:['icu','er','ot','ward']},
      {id:'cannula',name:'IV Cannula 20G',sku:'CON-1003',category:'IV & Infusion',unit:'pcs',minimum:250,depts:['icu','er','ot','ward']},
      {id:'mask',name:'Surgical Face Mask',sku:'CON-1004',category:'Protective Equipment',unit:'pcs',minimum:400,depts:['icu','er','ot','ward','lab']},
      {id:'gauze',name:'Sterile Gauze Roll',sku:'CON-1005',category:'Dressings',unit:'rolls',minimum:150,depts:['icu','er','ot','ward']},
      {id:'ivset',name:'IV Administration Set',sku:'CON-1006',category:'IV & Infusion',unit:'pcs',minimum:120,depts:['icu','er','ward']},
      {id:'drapes',name:'Sterile Surgical Drape',sku:'CON-1007',category:'Surgical',unit:'pcs',minimum:100,depts:['ot','er']},
      {id:'catheter',name:'Suction Catheter',sku:'CON-1008',category:'Critical Care',unit:'pcs',minimum:190,depts:['icu','er','ot']},
      {id:'tubes',name:'Blood Collection Tube',sku:'CON-1009',category:'Laboratory',unit:'pcs',minimum:250,depts:['lab','er']},
      {id:'disinfectant',name:'Surface Disinfectant 500 mL',sku:'CON-1010',category:'Cleaning',unit:'bottles',minimum:70,depts:['icu','er','ot','ward','lab']}
    ];
    const raw=[
      ['gloves','store','GL-241',180,1600,3.7],['gloves','icu','GL-219',145,230,3.7],['gloves','ot','GL-219',120,110,3.7],
      ['syringe','store','SY-382',250,900,4.5],['syringe','icu','SY-365',45,130,4.5],['syringe','er','SY-365',100,80,4.5],
      ['cannula','store','CV-108',10,210,24],['cannula','er','CV-109',80,34,24],
      ['mask','store','FM-220',200,1000,2],['mask','ward','FM-215',120,140,2],
      ['gauze','store','GZ-431',180,240,18],['gauze','ward','GZ-426',15,45,18],
      ['ivset','store','IV-772',120,160,28],['ivset','icu','IV-772',80,24,28],
      ['drapes','store','DR-122',280,75,64],['drapes','ot','DR-121',20,20,64],
      ['catheter','store','SC-441',13,150,32],['catheter','icu','SC-443',70,20,32],
      ['tubes','store','BT-108',80,450,6],['tubes','lab','BT-107',90,140,6],
      ['disinfectant','store','DC-060',260,60,110],['disinfectant','er','DC-059',70,9,110]
    ];
    const batches=raw.map((r,i)=>({id:'batch-'+(i+1),itemId:r[0],location:r[1],lot:r[2],expiry:daysFromNow(r[3]),qty:r[4],cost:r[5],supplier:'Medline Distributors',status:'available'}));
    const transactions=[
      {id:'TX-1004',type:'usage',date:TODAY,time:'10:45',itemId:'gloves',from:'icu',qty:22,used:20,wasted:2,batchId:'batch-2',actor:'Neha Reddy',note:'Morning round'},
      {id:'TX-1003',type:'issue',date:TODAY,time:'09:32',itemId:'syringe',from:'store',to:'er',qty:40,batchId:'batch-4',actor:'Kavya Iyer',note:'ER replenishment'},
      {id:'TX-1002',type:'usage',date:TODAY,time:'09:10',itemId:'mask',from:'ward',qty:14,used:14,wasted:0,batchId:'batch-10',actor:'Rahul Singh',note:'Daily use'},
      {id:'TX-1001',type:'receive',date:daysFromNow(-1),time:'16:15',itemId:'gloves',to:'store',qty:500,batchId:'batch-1',actor:'Kavya Iyer',note:'Purchase order GRN-042'},
      ...[24,31,18,42,27,36].map((q,i)=>({id:'TX-HIST-'+i,type:'usage',date:daysFromNow(-i-1),time:'11:30',itemId:'gloves',from:i%2?'ward':'icu',qty:q,used:q,wasted:0,batchId:'batch-2',actor:'Demo Shift',note:'Sample prior usage'}))
    ];
    const requests=[{id:'REQ-2401',itemId:'cannula',qty:40,from:'store',to:'icu',status:'pending',created:TODAY,actor:'Neha Reddy',note:'Replenish ICU emergency trolley'}];
    const returns=[];
    const checks=[];
    const staff=[
      {id:'staff-1',name:'K Krishna Priya',role:'admin',department:null,active:true},
      {id:'staff-2',name:'N Lakshmi Sowmika',role:'head',department:null,active:true},
      {id:'staff-3',name:'Kavya Iyer',role:'store',department:null,active:true},
      {id:'staff-4',name:'Neha Reddy',role:'staff',department:'icu',active:true},
      {id:'staff-5',name:'Rahul Singh',role:'staff',department:'ward',active:true}
    ];
    return {version:1,hospital:'Cedarfield Community Hospital',departments,items,batches,transactions,requests,returns,checks,staff,preferences:{requestApproval:true,adjustmentApproval:true,expiryDays:30,notifications:true}};
  }
  function expandHospital(data){
    if(data.demoEdition===2)return data;
    const additions=[
      ['dialysis','Dialysis','DIA','Renal care and dialysis stations'],
      ['maternity','Maternity','MAT','Maternity ward and delivery suites'],
      ['opd','Outpatient Services','OPD','Outpatient clinics and procedure rooms'],
      ['cssd','Sterile Services','CSSD','Instrument processing and sterile supply']
    ];
    const departments=['icu','er','ot','ward','lab'];
    for(const [suffix,name,code,description] of additions){
      const existing=data.departments.find(d=>d.name.toLowerCase()===name.toLowerCase()||d.code.toLowerCase()===code.toLowerCase());
      if(existing){if(existing.active)departments.push(existing.id);continue}
      const id='demo-'+suffix;
      data.departments.push({id,name,code,description,active:true});
      departments.push(id);
    }
    const active=departments.filter(id=>data.departments.some(d=>d.id===id&&d.active));
    const first='Aarav Meera Kiran Divya Arjun Anika Nikhil Kavitha Rohan Lavanya Sameer Ishita Varun Sneha'.split(' ');
    const last='Pillai Joshi Desai Prasad Kapoor Murthy Bose Patil Varma Bhat Sethi Das Jain Kulkarni'.split(' ');
    const roster=new Map();
    for(const account of DEMO_ACCOUNTS){
      if(!data.staff.some(s=>s.name===account.name))data.staff.push({id:'DEMO-'+account.key,name:account.name,role:account.role,department:account.dept,active:true});
    }
    for(const [d,department] of active.entries()){
      const members=[];
      for(let i=0;i<first.length;i++){
        const name=first[i]+' '+last[(i+d)%last.length];
        const person={id:'EMP-'+(3100+d*20+i),name,role:'staff',department,active:true};
        data.staff.push(person);
        members.push(person);
      }
      roster.set(department,members);
    }
    const catalogue=[
      ['Protective Equipment','pcs',6,'Disposable Apron|Bouffant Cap|Face Shield|Protective Sleeve Pair'],
      ['Dressings','packs',24,'Nonwoven Swabs|Absorbent Cotton Pads|Island Dressing|Sterile Dressing Pack'],
      ['Cleaning','packs',95,'Surface Cleaning Wipes|Equipment Wipes|Absorbent Spill Pads'],
      ['Waste Handling','rolls',65,'Yellow Waste Bags|Red Waste Bags|Blue Waste Bags'],
      ['Ward Supplies','pcs',18,'Patient ID Band|Disposable Bed Sheet|Kidney Tray|Underpad'],
      ['Injection Supplies','pcs',7,'Luer Lock Syringe 2 mL|Luer Lock Syringe 10 mL|Blunt Fill Needle'],
      ['IV & Infusion','pcs',32,'IV Extension Line|Three-way Stopcock|IV Fixation Dressing'],
      ['Laboratory','pcs',12,'Specimen Container|Sample Transport Pouch|EDTA Collection Tube'],
      ['Sterilization','rolls',145,'Indicator Tape|Sterilization Pouch Roll|Steam Indicator Strip Pack']
    ];
    const supplier=['Southern Ward Supplies','Cedar Medical Distribution','Meridian Hospital Stores'];
    const storeTeam=['Kavya Iyer','Devika Anand','Imran Ali','Manoj Thomas'];
    storeTeam.slice(1).forEach((name,i)=>data.staff.push({id:'EMP-S'+(31+i),name,role:'store',department:null,active:true}));
    let n=0, movement=0;
    function log(type,date,time,fields){
      data.transactions.push({id:'TX-D'+(++movement),type,date,time,...fields});
    }
    for(const [category,unit,price,names] of catalogue){
      for(const name of names.split('|')){
        const index=n++;
        const eligible=active.filter(d=>{
          if(category==='Sterilization')return ['ot',departments.at(-1)].includes(d);
          if(category==='Laboratory')return ['er','lab','ward'].includes(d);
          if(['Ward Supplies','Injection Supplies','IV & Infusion','Dressings'].includes(category))return !['lab','demo-cssd'].includes(d);
          return true;
        });
        if(!eligible.length)continue;
        const itemId='demo-item-'+index;
        data.items.push({id:itemId,sku:'HSP-'+(2101+index),name,category,unit,minimum:30+index%5*10,depts:eligible});
        const storeActor=storeTeam[index%storeTeam.length];
        const batch={id:'demo-lot-'+index,itemId,location:'store',lot:'CF-'+(6100+index),expiry:daysFromNow(index%9===0?19:150+index*4),qty:0,cost:price+index%4,supplier:supplier[index%3],status:'available'};
        const received=eligible.length*80+(index%7===0?12:135);
        batch.qty=received;
        data.batches.push(batch);
        log('receive',daysFromNow(-35-index%8),'08:05',{itemId,to:'store',qty:received,batchId:batch.id,actor:storeActor,note:'Goods receipt GRN-'+(8600+index)});
        for(const [j,department] of eligible.entries()){
          const members=roster.get(department);
          const actor=k=>members[(index+j+k)%members.length].name;
          const issueDay=daysFromNow(-30+j%3);
          const request={id:'REQ-D'+index+'-'+j,itemId,qty:80,from:'store',to:department,status:'fulfilled',created:daysFromNow(-31+j%3),fulfilled:issueDay,actor:actor(0),note:'Scheduled department replenishment'};
          data.requests.push(request);
          const dest={...batch,id:batch.id+'-'+department,location:department,qty:80};
          data.batches.push(dest);
          batch.qty-=80;
          log('issue',issueDay,'09:10',{itemId,from:'store',to:department,qty:80,batchId:batch.id,actor:storeActor,note:'Request '+request.id});
          for(let week=0;week<4;week++){
            const day=-21+week*7-(index+j)%7;
            const used=3+(index+j+week*3)%11,wasted=(index+j+week)%17===0?1:0;
            dest.qty-=used+wasted;
            log('usage',daysFromNow(day),['07:20','10:35','13:15','16:40'][(index+j+week)%4],{itemId,from:department,qty:used+wasted,used,wasted,batchId:dest.id,actor:actor(week+1),note:'Shift consumption register'});
          }
          if((index+j)%13===0){
            const accepted=index%2===0;
            data.returns.push({id:'RET-D'+index+'-'+j,from:department,to:'store',itemId,batchId:dest.id,lot:dest.lot,qty:2,condition:'good',status:accepted?'accepted':'pending',created:TODAY,actor:actor(5),note:'Unopened surplus from ward stock'});
            if(accepted){dest.qty-=2;batch.qty+=2;log('return',TODAY,'17:05',{itemId,from:department,to:'store',qty:2,batchId:dest.id,actor:storeActor,condition:'good',note:'Unopened surplus returned'})}
          }
          if((index+j)%11===0)data.requests.push({...request,id:request.id+'-R',qty:12,status:index%2?'approved':'pending',created:TODAY,fulfilled:undefined,actor:actor(6),note:'Top-up for next shift'});
        }
      }
    }
    data.transactions.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
    for(const key of ['requests','returns'])data[key].sort((a,b)=>b.created.localeCompare(a.created));
    data.demoEdition=2;
    return data;
  }
  function loadDB(){
    let data;
    try{data=JSON.parse(localStorage.getItem(KEY)||'null')}catch{}
    if(data?.version!==1)data=seedDB();
    if(data.demoEdition!==2 || !data.leadershipNamesUpdated){
      const renamed={'Priya Menon':ROLE_INFO.admin.name,'Dr. Aditya Rao':ROLE_INFO.head.name};
      for(const person of data.staff){
        if(['staff-1','staff-2'].includes(person.id)&&Object.hasOwn(renamed,person.name))person.name=renamed[person.name];
      }
      for(const collection of ['requests','returns','checks','transactions','audit']){
        for(const row of data[collection]||[]){
          if(Object.hasOwn(renamed,row.actor))row.actor=renamed[row.actor];
        }
      }
      expandHospital(data);
      data.leadershipNamesUpdated=true;
      try{localStorage.setItem(KEY,JSON.stringify(data))}catch{}
    }
    return data;
  }
  function save(){localStorage.setItem(KEY,JSON.stringify(db))}
  function itemBy(id){return db.items.find(i=>i.id===id)||{name:'Unknown item',unit:'units',minimum:0,depts:[]}}
  function deptBy(id){return id==='store'?'Central Store':db.departments.find(d=>d.id===id)?.name||'Unknown department'}
  function canManage(){return ui.role==='admin'||ui.role==='store'}
  function canAdmin(){return ui.role==='admin'}
  function canControl(){return ui.role==='admin'||ui.role==='head'}
  function activeUser(){return ui.identity||ROLE_INFO[ui.role]||ROLE_INFO.staff}
  function currentName(){return activeUser().name}
  function readOnly(){return ui.role==='head'}
  function accessibleLocations(){return ui.role==='staff'?[ui.dept]:['store',...db.departments.filter(d=>d.active).map(d=>d.id)]}
  function validBatches(location=null,itemId=null){return db.batches.filter(b=>b.status==='available'&&b.qty>0&&(!location||b.location===location)&&(!itemId||b.itemId===itemId))}
  function usableBatches(location=null,itemId=null){return validBatches(location,itemId).filter(b=>daysUntil(b.expiry)>=0).sort((a,b)=>a.expiry.localeCompare(b.expiry))}
  function qtyAt(location,itemId){return validBatches(location,itemId).reduce((sum,b)=>sum+b.qty,0)}
  function availableQty(location,itemId){return usableBatches(location,itemId).reduce((sum,b)=>sum+b.qty,0)}
  function getScope(){return ui.role==='staff'?ui.dept:null}
  function allLocations(){return ['store',...db.departments.filter(d=>d.active).map(d=>d.id)]}
  function scopedBatches(){return validBatches(getScope())}
  function lowStock(){return db.items.filter(i=>qtyAt('store',i.id)<i.minimum)}
  function expiryRisks(){return validBatches(getScope()).filter(b=>daysUntil(b.expiry)<=db.preferences.expiryDays).sort((a,b)=>a.expiry.localeCompare(b.expiry))}
  function locationOptions(selected,includeStore=false){return (includeStore?allLocations():db.departments.filter(d=>d.active).map(d=>d.id)).filter(id=>ui.role!=='staff'||id===ui.dept).map(id=>`<option value="${escapeHTML(id)}" ${selected===id?'selected':''}>${escapeHTML(deptBy(id))}</option>`).join('')}
  function itemOptions(selected,location=null,stockOnly=false){return db.items.filter(i=>(!location||location==='store'||i.depts.includes(location))&&(!stockOnly||availableQty(location,i.id)>0)).map(i=>`<option value="${i.id}" ${i.id===selected?'selected':''}>${escapeHTML(i.name)}</option>`).join('')}
  function badge(status){const colors={pending:'gold',approved:'blue',fulfilled:'green',accepted:'green',rejected:'red',declined:'red',completed:'green',active:'green',inactive:'gray',available:'green',quarantine:'red'};return `<span class="tag ${colors[status]||'gray'}">${escapeHTML(status[0].toUpperCase()+status.slice(1))}</span>`}
  const referencePhotos = {
    "gloves": "supply-0",
    "syringe": "supply-1",
    "cannula": "supply-2",
    "mask": "supply-3",
    "gauze": "supply-4",
    "ivset": "supply-5",
    "drapes": "supply-6",
    "catheter": "supply-7",
    "tubes": "supply-8",
    "disinfectant": "supply-9",
    "demo-item-0": "supply-10",
    "demo-item-1": "supply-11",
    "demo-item-2": "supply-12",
    "demo-item-3": "supply-13",
    "demo-item-4": "supply-14",
    "demo-item-5": "supply-15",
    "demo-item-6": "supply-16",
    "demo-item-7": "supply-17",
    "demo-item-8": "supply-18",
    "demo-item-9": "supply-19",
    "demo-item-10": "supply-20",
    "demo-item-11": "supply-21",
    "demo-item-12": "supply-22",
    "demo-item-13": "supply-23",
    "demo-item-14": "supply-24",
    "demo-item-15": "supply-25",
    "demo-item-16": "supply-26",
    "demo-item-17": "supply-27",
    "demo-item-18": "supply-28",
    "demo-item-19": "supply-29",
    "demo-item-20": "supply-30",
    "demo-item-21": "supply-31",
    "demo-item-22": "supply-32",
    "demo-item-23": "supply-33",
    "demo-item-24": "supply-34",
    "demo-item-25": "supply-35",
    "demo-item-26": "supply-36",
    "demo-item-27": "supply-37",
    "demo-item-28": "supply-38",
    "demo-item-29": "supply-39",
    "icu": "room-icu",
    "er": "room-er",
    "ot": "room-ot",
    "ward": "room-ward",
    "lab": "room-lab",
    "demo-dialysis": "room-demo-dialysis",
    "demo-maternity": "room-demo-maternity",
    "demo-opd": "room-demo-opd",
    "demo-cssd": "room-demo-cssd"
};
  const demoPortraits = {
    "N Lakshmi Sowmika": "p0",
    "Rahul Singh": "p1",
    "Vikram Shah": "p2",
    "Imran Ali": "p3",
    "Manoj Thomas": "p4",
    "Aarav Pillai": "p5",
    "Kiran Desai": "p6",
    "Arjun Kapoor": "p7",
    "Nikhil Bose": "p8",
    "Rohan Varma": "p9",
    "Sameer Sethi": "p10",
    "Varun Jain": "p11",
    "Aarav Joshi": "p12",
    "Kiran Prasad": "p13",
    "Arjun Murthy": "p14",
    "Nikhil Patil": "p15",
    "Rohan Bhat": "p16",
    "Sameer Das": "p17",
    "Varun Kulkarni": "p18",
    "Aarav Desai": "p19",
    "Kiran Kapoor": "p20",
    "Arjun Bose": "p21",
    "Nikhil Varma": "p22",
    "Rohan Sethi": "p23",
    "Sameer Jain": "p24",
    "Varun Pillai": "p25",
    "Aarav Prasad": "p26",
    "Kiran Murthy": "p27",
    "Arjun Patil": "p28",
    "Nikhil Bhat": "p29",
    "Rohan Das": "p30",
    "Sameer Kulkarni": "p31",
    "Varun Joshi": "p32",
    "Aarav Kapoor": "p33",
    "Kiran Bose": "p34",
    "Arjun Varma": "p35",
    "Nikhil Sethi": "p72",
    "Rohan Jain": "p73",
    "Sameer Pillai": "p74",
    "Varun Desai": "p75",
    "Aarav Murthy": "p76",
    "Kiran Patil": "p77",
    "Arjun Bhat": "p78",
    "Nikhil Das": "p79",
    "Rohan Kulkarni": "p80",
    "Sameer Joshi": "p81",
    "Varun Prasad": "p82",
    "Aarav Bose": "p83",
    "Kiran Varma": "p84",
    "Arjun Sethi": "p85",
    "Nikhil Jain": "p86",
    "Rohan Pillai": "p87",
    "Sameer Desai": "p88",
    "Varun Kapoor": "p89",
    "Aarav Patil": "p90",
    "Kiran Bhat": "p91",
    "Arjun Das": "p92",
    "Nikhil Kulkarni": "p93",
    "Rohan Joshi": "p94",
    "Sameer Prasad": "p95",
    "Varun Murthy": "p96",
    "Aarav Varma": "p97",
    "Kiran Sethi": "p98",
    "Arjun Jain": "p99",
    "Nikhil Pillai": "p100",
    "Rohan Desai": "p101",
    "Sameer Kapoor": "p102",
    "Varun Bose": "p103",
    "Neha Reddy": "p36",
    "K Krishna Priya": "p37",
    "Kavya Iyer": "p38",
    "Ananya Sharma": "p39",
    "Asha Nair": "p40",
    "Devika Anand": "p41",
    "Meera Joshi": "p42",
    "Divya Prasad": "p43",
    "Anika Murthy": "p44",
    "Kavitha Patil": "p45",
    "Lavanya Bhat": "p46",
    "Ishita Das": "p47",
    "Sneha Kulkarni": "p48",
    "Meera Desai": "p49",
    "Divya Kapoor": "p50",
    "Anika Bose": "p51",
    "Kavitha Varma": "p52",
    "Lavanya Sethi": "p53",
    "Ishita Jain": "p54",
    "Sneha Pillai": "p55",
    "Meera Prasad": "p56",
    "Divya Murthy": "p57",
    "Anika Patil": "p58",
    "Kavitha Bhat": "p59",
    "Lavanya Das": "p60",
    "Ishita Kulkarni": "p61",
    "Sneha Joshi": "p62",
    "Meera Kapoor": "p63",
    "Divya Bose": "p64",
    "Anika Varma": "p65",
    "Kavitha Sethi": "p66",
    "Lavanya Jain": "p67",
    "Ishita Pillai": "p68",
    "Sneha Desai": "p69",
    "Meera Murthy": "p70",
    "Divya Patil": "p71",
    "Anika Bhat": "p108",
    "Kavitha Das": "p109",
    "Lavanya Kulkarni": "p110",
    "Ishita Joshi": "p111",
    "Sneha Prasad": "p112",
    "Meera Bose": "p113",
    "Divya Varma": "p114",
    "Anika Sethi": "p115",
    "Kavitha Jain": "p116",
    "Lavanya Pillai": "p117",
    "Ishita Desai": "p118",
    "Sneha Kapoor": "p119",
    "Meera Patil": "p120",
    "Divya Bhat": "p121",
    "Anika Das": "p122",
    "Kavitha Kulkarni": "p123",
    "Lavanya Joshi": "p124",
    "Ishita Prasad": "p125",
    "Sneha Murthy": "p126",
    "Meera Varma": "p127",
    "Divya Sethi": "p128",
    "Anika Jain": "p129",
    "Kavitha Pillai": "p130",
    "Lavanya Desai": "p131",
    "Ishita Kapoor": "p132",
    "Sneha Bose": "p133",
    "Meera Bhat": "p134",
    "Divya Das": "p135",
    "Anika Kulkarni": "p136",
    "Kavitha Joshi": "p137",
    "Lavanya Prasad": "p138",
    "Ishita Murthy": "p139",
    "Sneha Patil": "p140"
};
  function photo(src, kind) {
    return src ? `<img class="reference-photo ${kind}" src="${src}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">` : '';
  }
  function subjectPhoto(id, kind) {
    return Object.hasOwn(referencePhotos, id) ? photo('./assets/clinical/'+referencePhotos[id]+'.webp', kind) : '';
  }
  function portrait(name, person) {
    if(person?.photo?.startsWith('data:image/jpeg;base64,'))return photo(escapeHTML(person.photo),'portrait-photo');
    return Object.hasOwn(demoPortraits, name)
      ? photo('./assets/clinical/'+demoPortraits[name]+'.webp', 'portrait-photo')
      : escapeHTML(initials(name));
  }
  function picturedStaff(name){
    return `<span class="pictured-staff"><span class="staff-thumbnail">${portrait(name||'')}</span>${escapeHTML(name)}</span>`;
  }
  function initials(name){return String(name).split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
  function button(label,action,cls='btn-outline',attrs=''){return `<button type="button" class="btn ${cls}" data-action="${action}" ${attrs}>${label}</button>`}
  function header(kicker,title,subtitle,actions=''){return `<div class="page-heading"><div><div class="page-eyebrow">${kicker}</div><h1>${title}</h1><p>${subtitle}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`}
  function panel(title,subtitle,body,action=''){return `<section class="panel panel-pad"><div class="panel-top"><div><h2>${title}</h2>${subtitle?`<p class="panel-sub">${subtitle}</p>`:''}</div>${action}</div>${body}</section>`}
  function operationPhoto(kind){
    if(kind==='building')return photo('./assets/hospital-exterior.webp','operation-photo');
    const scenes={box:'shelves',alert:'low-stock',calendar:'expiry',file:'request',return:'return',clipboard:'count',truck:'delivery',swap:'dispatch',check:'dispatch',chart:'review',clock:'request',shield:'review',settings:'review'};
    return photo('./assets/operations/'+scenes[kind]+'.webp','operation-photo');
  }
  function kpi(label,value,iconName,note,color='blue'){return `<div class="kpi"><div class="kpi-top"><span>${label}</span><span class="kpi-icon ${color}">${operationPhoto(iconName)}</span></div><div class="kpi-number num">${value}</div><div class="kpi-bottom">${note}</div></div>`}
  function empty(text='No records found'){return `<div class="empty-state">${icon('box')}<h3>${escapeHTML(text)}</h3><p>Try another filter or create a new entry.</p></div>`}
  function toast(message,isError=false){const root=document.getElementById('toast-root');root.innerHTML=`<div class="toast ${isError?'error':''}">${icon(isError?'alert':'check')}<span>${escapeHTML(message)}</span></div>`;clearTimeout(toast.timer);toast.timer=setTimeout(()=>root.innerHTML='',3400)}
  function setPage(mode,page){if(ui.screen!=='app'||mode!==ui.mode)return;ui.page=page;ui.filter='all';ui.search='';ui.form={};ui.modal=null;ui.mobileMenu=false;render();window.scrollTo(0,0)}
  function enter(role,mode){if(!((mode==='workspace'&&['store','staff'].includes(role))||(mode==='control'&&['admin','head'].includes(role))))return;ui.role=role;ui.dept=role==='staff'?(ui.identity?.dept||'icu'):ui.dept;ui.screen='app';ui.mode=mode;ui.page='overview';ui.modal=null;ui.form={};ui.mobileMenu=false;ui.sidebarCollapsed=false;ui.loginError='';render();window.scrollTo(0,0)}
  function render(){document.querySelectorAll('.modal-backdrop').forEach(x=>x.remove());app.innerHTML=ui.screen==='landing'?landing():ui.screen==='login'?loginPage():appShell();if(ui.modal)document.body.insertAdjacentHTML('beforeend',modal());document.title=ui.screen==='landing'?'OPTIVUS | Hospital Consumables & Procurement Intelligence':ui.screen==='login'?`${ui.mode==='control'?'Control':'Workspace'} Login | OPTIVUS`:`${pageTitle()} | OPTIVUS`;}
  function logo(dark=true){return `<span class="brand ${dark?'dark':'light'}"><img class="optivus-mark" src="./assets/favicon.svg" width="36" height="36" alt=""><span class="brand-name">OPTIV<b>U</b>S</span></span>`}
  function loginPage(){
    const control=ui.mode==='control',portal=control?'Control':'Workspace';
    const suggested=DEMO_ACCOUNTS.filter(a=>a.portal===ui.mode);
    return `<div class="login-page ${control?'login-control':'login-workspace'}"><div class="login-frame">
      <section class="login-left"><div class="login-brand-row"><div class="login-brand-group">${logo(false)}<span>by TECHLURA</span></div></div>
        <div class="login-form-area"><div class="login-eyebrow">OPTIVUS / ${portal.toUpperCase()}</div><h1>${control?'Welcome, Hospital Head.':'Welcome back, team.'}</h1><p class="login-lead">${control?'Leadership access to hospital operations and oversight.':'Your dedicated space for hospital employees and staff.'}</p>
        <form id="login-form" autocomplete="on"><div class="login-fields">${control?'':`<div class="login-field"><label for="login-type">Login as</label><select id="login-type" name="loginType">${suggested.map(a=>`<option value="${a.key}" ${ui.loginType===a.key?'selected':''}>${escapeHTML(a.label)}</option>`).join('')}</select></div>`}
          <div class="login-field"><label for="login-email">${control?'Official email':'Work email'}</label><input id="login-email" name="email" type="email" autocomplete="username" placeholder="${control?'head@hospital.com':'name@hospital.com'}" required spellcheck="false"/></div>
          <div class="login-field"><label for="login-password">Password</label><div class="login-password-wrap"><input id="login-password" name="password" type="${ui.loginShowPassword?'text':'password'}" autocomplete="current-password" placeholder="Enter your password" required minlength="6"/><button type="button" data-action="toggle-password" class="login-password-eye" aria-label="${ui.loginShowPassword?'Hide':'Show'} password">${icon('eye')}</button></div></div></div>
          <div class="login-helper-row"><button type="button" class="login-text-link" data-action="forgot-password">Forgot password?</button></div>
          <button class="login-submit" type="submit">Sign in to ${portal}</button>
          ${ui.loginError?`<div class="login-error" role="alert">${icon('alert','sm')} ${escapeHTML(ui.loginError)}</div>`:''}
        </form>
        <div class="login-demo-area"><button type="button" data-action="toggle-demo" aria-expanded="${ui.loginShowDemo}" aria-controls="demo-options" class="login-demo-toggle">${icon('spark','sm')} ${ui.loginShowDemo?'Hide':'Try'} demo credentials</button>
          <div id="demo-options" class="login-demo-options ${ui.loginShowDemo?'':'hidden'}"><span>Use a sample ${portal.toLowerCase()} account. Password: <strong>Optivus123</strong></span>${suggested.map(a=>`<button type="button" data-action="demo-fill" data-role="${a.key}"><span>${escapeHTML(a.label)}</span><small>${escapeHTML(a.email)}</small></button>`).join('')}</div></div>
        <div class="login-bottom-note">${icon('lock','sm')} <span>Interactive prototype · Fictional accounts only</span></div>
        <button type="button" data-action="go-home" class="login-back">Back to OPTIVUS home</button>
        </div></section>
      <aside class="login-visual" aria-label="${control?'Photograph of a modern hospital exterior':'Photograph of a modern hospital supply corridor'}">
        <div class="login-visual-content"><span class="login-visual-kicker">${control?'HOSPITAL LEADERSHIP':'HOSPITAL WORKSPACE'}</span>
          <h2>${control?'Clarity across<br>every department.':'Every shift.<br>Fully supplied.'}</h2>
          <p>${control?'See the bigger picture. Keep your people, supplies and decisions connected.':'The essentials your teams need, right where patient care happens.'}</p>
          <span class="login-visual-accent" aria-hidden="true"></span>
        </div>
        <div class="login-visual-footer"><span>${icon('cross','sm')} OPTIVUS</span><span>Supply intelligence for better care</span></div>
      </aside>
    </div></div>`;
  }
  function previewContent(view){
    const sample=seedDB();
    const sampleItem=id=>sample.items.find(i=>i.id===id);
    const locations=id=>id==='store'?'Central Store':sample.departments.find(d=>d.id===id)?.name;
    function table(headers,rows){
      return `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
    }
    function cellItem(id){return `<span class="pictured-item">${subjectPhoto(id,'inline-item-photo')}${escapeHTML(sampleItem(id).name)}</span>`}
    if(view==='expiry'){
      const lots=sample.batches.filter(b=>b.qty>0&&daysUntil(b.expiry)>=0&&daysUntil(b.expiry)<=sample.preferences.expiryDays).sort((a,b)=>a.expiry.localeCompare(b.expiry));
      return '<h3>Batch-level expiry exposure</h3><p>Available batches inside the demo’s 30-day review window.</p>'+table(['Item / location','Batch','Expiry date','On hand'],lots.slice(0,4).map(b=>`<tr><td>${cellItem(b.itemId)}<small class="preview-sub">${locations(b.location)}</small></td><td>${b.lot}</td><td>${dateLabel(b.expiry)}</td><td>${fmt(b.qty)} ${sampleItem(b.itemId).unit}</td></tr>`));
    }
    if(view==='conflicts'){
      const req=sample.requests[0],lot=sample.batches.find(b=>b.itemId===req.itemId&&b.location==='store');
      return `<h3>Review existing stock before reordering</h3><p>Illustrative audit recommendation · ${req.id}</p><dl class="evidence"><div><dt>Demand</dt><dd>${locations(req.to)} requested ${req.qty} ${sampleItem(req.itemId).name} units.</dd></div><div><dt>Stock evidence</dt><dd>Central Store holds ${lot.qty} units in batch ${lot.lot}, expiring ${dateLabel(lot.expiry)}.</dd></div><div><dt>Purchase review</dt><dd>Check reservations, open purchase orders and expected usage before issuing this batch or changing an order.</dd></div></dl><p>A department request alone does not establish a duplicate purchase.</p>`;
    }
    if(view==='audit'){
      return '<h3>Verified savings and audit trail</h3><p>No hospital savings have been verified in this preview. The pilot links each claim to a purchase baseline, a completed action and Finance/Purchase approval.</p>'+table(['Sample movement','Reference','Evidence'],sample.transactions.slice(0,3).map(t=>`<tr><td>${escapeHTML(t.type)}</td><td>${t.id}</td><td>${fmt(t.qty)} ${sampleItem(t.itemId).unit} · ${escapeHTML(sampleItem(t.itemId).name)} · ${dateLabel(t.date)}</td></tr>`));
    }
    return '<h3>Inventory overview</h3><p>Central Store balances from the OPTIVUS demo catalogue. Open Workspace to inspect individual batches and department stock.</p>'+table(['Consumable','On hand','Reorder point'],sample.items.slice(0,4).map(i=>`<tr><td>${cellItem(i.id)}</td><td>${fmt(sample.batches.filter(b=>b.location==='store'&&b.itemId===i.id).reduce((sum,b)=>sum+b.qty,0))} ${i.unit}</td><td>${fmt(i.minimum)} ${i.unit}</td></tr>`));
  }
  function landing(){
    const links='<a href="#top">Home</a><a href="#platform">Product preview</a><a href="#pilot">Audit &amp; pilot</a><a href="#trust">Trust</a><a href="#demo">Contact</a>';
    return `<div class="landing enterprise"><a class="skip-content" href="#main">Skip to content</a>
    <header class="site-topbar"><div class="inside"><div class="site-brand-lockup"><a href="/" aria-label="OPTIVUS home">${logo(true)}</a></div><nav class="site-links" aria-label="Main navigation">${links}</nav><div class="site-actions"><a class="btn btn-outline" href="/workspace">Workspace</a><a class="btn btn-outline" href="/control">Control</a><a class="btn btn-primary" href="#demo">Request a Demo</a></div>
    <details class="mobile-links"><summary>Menu</summary><nav aria-label="Mobile navigation">${links}<a href="/workspace">Workspace</a><a href="/control">Control</a><a href="#demo">Request a Demo</a></nav></details></div></header>
    <main id="main"><section class="hero" id="top"><div class="hero-bg"></div><div class="hero-overlay"></div><div class="hero-inner"><div class="hero-copy"><span class="hero-pill">Hospital Consumables &amp; Procurement Intelligence</span><h1>Stop Preventable Inventory Waste. <em>Make Procurement Decisions with Confidence.</em></h1><p>OPTIVUS helps hospital teams identify excess consumables, procurement conflicts and expiry exposure. Each recommendation explains the stock and purchasing evidence behind it. Finance and Purchase verify the outcome.</p><div class="hero-buttons"><a class="btn btn-primary" href="#demo">Request a Demo</a><a class="btn btn-outline" href="#platform">Explore the Platform</a></div></div></div></section>
    <section class="landing-section feature-section" id="platform"><div class="section-inner"><span class="section-kicker">Product preview</span><h2 class="section-heading">Inspect the evidence behind a decision.</h2><div class="product-console"><div class="preview-nav" role="group" aria-label="Choose preview">${[['inventory','Inventory overview'],['conflicts','Procurement conflicts'],['expiry','Expiry exposure'],['audit','Savings & audit trail']].map(([id,label],i)=>`<button type="button" data-view="${id}" aria-pressed="${i===0}" aria-controls="product-panel">${label}</button>`).join('')}</div><div class="preview-body"><div class="sample-label">Illustrative sample data</div><div id="product-panel" aria-live="polite">${previewContent('inventory')}</div></div></div><div class="portal-links"><a class="btn btn-primary" href="/workspace">Enter Workspace</a><a class="btn btn-dark" href="/control">Open Control</a></div></div></section>
    <section class="landing-section workflow-section" id="pilot"><div class="section-inner"><span class="section-kicker">Hospital audit &amp; pilot</span><h2 class="section-heading">Start with six months of purchasing history.</h2><ol class="workflow-grid" aria-label="Hospital audit and pilot steps">${[
      ['Export','The free historical audit covers six months of consumables data. Your hospital exports item, stock, batch, usage and purchasing reports from its ERP.','download'],
      ['Map the data','OPTIVUS cleans the exports, maps item codes and pack sizes, and flags missing or ambiguous records for review.','layers'],
      ['Review exposure','Purchase and store teams examine potential order conflicts, surplus and batches at risk of expiry against source records.','clipboard'],
      ['Decide on a pilot','Proceed to a three-month paid pilot in one central store only if the opportunity meets the agreed financial and data-quality thresholds.','building'],
      ['Verify outcomes','Match completed actions to orders, invoices and stock movements. Record savings after hospital Finance/Purchase reviews the evidence and approves the amount.','check']
    ].map(([t,d,ic],i)=>`<li class="step"><small>STEP 0${i+1}</small><div class="step-icon" aria-hidden="true">${icon(ic)}</div><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol></div></section>
    <section class="landing-section" id="trust"><div class="section-inner"><span class="section-kicker">Trust &amp; security</span><h2 class="section-heading">Hospital-controlled access and review.</h2><p class="section-lead">The initial workflow requires only operational reports. Exclude patient identifiers and clinical records. Before any transfer, the hospital and OPTIVUS agree and verify the following pilot controls.</p><div class="feature-grid">${[
      ['users','Named personnel','Document the authorized hospital and OPTIVUS personnel. Assign role-based access for store operations, purchasing, Finance review and administration.'],
      ['lock','Protection and access logs','Confirm encryption in transit and at rest, the approved transfer channel, and who can inspect access logs. Agree how access is revoked.'],
      ['shield','Retention and decision rights','Agree the retention period, export format, deletion process and confirmation. Hospital reviewers can accept, defer or reject each recommendation before action.']
    ].map(([ic,t,d])=>`<article class="feature-card"><span class="feature-icon">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div></div></section>
    <section class="about-section" id="demo"><div class="about-in"><div><div class="eyebrow">Talk to OPTIVUS</div><h2>Request a Demo</h2><p>Share your hospital’s contact details to request a walkthrough of the audit and central-store pilot.</p></div><form id="demo-request" class="demo-request" method="post" action="/api/demo-requests"><label>Full name<input name="name" autocomplete="name" required maxlength="90"></label><label>Official email<input type="email" name="email" autocomplete="email" required maxlength="254"></label><label>Hospital / Organization<input name="hospital" autocomplete="organization" required maxlength="140"></label><label>Designation<input name="designation" autocomplete="organization-title" required maxlength="120"></label><label>Phone number<input type="tel" name="phone" autocomplete="tel" required maxlength="32"></label><label>Message<textarea name="message" rows="4" required maxlength="2000"></textarea></label><button type="submit" class="btn btn-primary">Submit demo request</button><div role="status" aria-live="polite" class="request-status"></div></form></div></section></main>
    <footer class="site-footer"><div class="footer-in"><div>${logo(true)} © ${new Date().getFullYear()} Techlura</div><div>Hospital Consumables &amp; Procurement Intelligence</div></div></footer></div>`;
  }

  function allowedNav(){let nav=NAV[ui.mode];if(ui.role==='staff')return nav.filter(n=>!['receive','issue'].includes(n[0]));if(ui.role==='head'&&ui.mode==='workspace')return nav.filter(n=>['overview','inventory','reports','activity'].includes(n[0]));if(ui.role==='store'&&ui.mode==='control')return nav.filter(n=>['items','departments','reports'].includes(n[0]));return nav}
  function pageTitle(){return NAV[ui.mode].find(x=>x[0]===ui.page)?.[1]||'Overview'}
  function appShell(){
    const user=activeUser(),menu=allowedNav();
    if(!user)return loginPage();
    if(!menu.some(m=>m[0]===ui.page))ui.page=menu[0][0];
    const pendingCount=db.requests.filter(r=>['pending','approved'].includes(r.status)&&(ui.role!=='staff'||r.to===ui.dept)).length;
    const portal=ui.mode==='control'?'Control':'Workspace';
    const designation=user.title;
    return `<div class="app-shell ${ui.sidebarCollapsed?'sidebar-compact':''}"><aside class="sidebar ${ui.mobileMenu?'open':''} ${ui.sidebarCollapsed?'collapsed':''}">
      <div class="side-brand"><button type="button" class="side-brand-toggle" data-action="toggle-sidebar" aria-expanded="${!ui.sidebarCollapsed}" aria-label="${ui.sidebarCollapsed?'Expand':'Collapse'} sidebar" title="${ui.sidebarCollapsed?'Expand':'Collapse'} sidebar">${logo(true)}<span class="side-collapse-indicator" aria-hidden="true">${icon('menu','sm')}</span></button></div>
      <div class="side-label">SIGNED IN TO</div>
      <div class="side-portal-badge">${icon(ui.mode==='control'?'shield':'layers')} <strong>${portal}</strong></div>
      <div class="side-label">${ui.mode==='workspace'?'OPERATIONS':'ADMINISTRATION'}</div>
      <nav class="side-menu" aria-label="${ui.mode} navigation">
        ${menu.map(([path,label,ic])=>`<button type="button" class="side-link ${ui.page===path?'active':''}" data-action="navigate" data-page="${path}" aria-label="${escapeHTML(label)}" title="${escapeHTML(label)}">${icon(ic)}<span class="side-link-label">${label}</span>${path==='requests'&&pendingCount?`<span class="count">${pendingCount}</span>`:''}</button>`).join('')}
      </nav>
      <div class="side-bottom">
        <div class="side-person"><span class="avatar">${portrait(user.name)}</span><span><strong>${escapeHTML(user.name)}</strong><small>${escapeHTML(user.title)}</small></span></div>
        <button type="button" class="side-signout" data-action="sign-out" title="Sign out" aria-label="Sign out">${icon('log','sm')} <span class="side-signout-label">Sign out</span></button>
      </div></aside>
      <div class="sidebar-scrim ${ui.mobileMenu?'open':''}" data-action="close-menu"></div>
      <div class="app-main"><header class="app-header">
        <div class="app-header-left"><button type="button" class="icon-btn mobile-menu" data-action="toggle-menu" aria-label="Open menu">${icon('menu')}</button>
          <div><div class="app-header-title">${portal} <span class="muted" style="font-weight:500"> / ${escapeHTML(pageTitle())}</span></div>
          <div class="app-header-subtitle">${escapeHTML(db.hospital)}${ui.role==='staff'?' · '+escapeHTML(deptBy(ui.dept)):''}</div></div></div>
        <div class="header-utilities"><div class="header-account" aria-label="Signed-in employee details">
          <span class="header-account-avatar" aria-hidden="true">${portrait(user.name)}</span>
          <div class="header-account-person"><strong>${escapeHTML(user.name)}</strong><span><b>Login ID</b> ${escapeHTML(ui.loginId)}</span></div>
          <div class="header-account-designation"><strong>${escapeHTML(designation)}</strong></div>
        </div></div>
      </header><main class="main-content">${renderPage()}
        <div style="text-align:center;color:#99a7b6;font-size:12px;margin-top:36px">OPTIVUS by Techlura · Illustrative data stored in this browser · Not for live hospital operations</div>
      </main></div></div>`;
  }
  function renderPage(){return ui.mode==='workspace'?workspacePage():controlPage()}
  function workspacePage(){return ({overview:workspaceOverview,inventory:inventoryPage,receive:receivePage,issue:issuePage,usage:usagePage,requests:requestsPage,returns:returnsPage,verify:verificationPage,reports:reportsPage,activity:activityPage}[ui.page]||workspaceOverview)()}
  function controlPage(){return ({overview:controlOverview,departments:departmentsPage,items:cataloguePage,staff:staffPage,approvals:approvalsPage,reports:reportsPage,audit:activityPage,settings:settingsPage}[ui.page]||controlOverview)()}
  function recentTransactions(){return db.transactions.filter(t=>ui.role!=='staff'||t.from===ui.dept||t.to===ui.dept).slice(0,6)}
  function pendingRequests(){return db.requests.filter(r=>['pending','approved'].includes(r.status)&&(ui.role!=='staff'||r.to===ui.dept))}
  function txDescription(t){const itm=itemBy(t.itemId);const q=fmt(t.qty);switch(t.type){case'receive':return `${q} ${itm.unit} of ${itm.name} received at ${deptBy(t.to)}`;case'issue':return `${q} ${itm.unit} of ${itm.name} issued to ${deptBy(t.to)}`;case'usage':return `${q} ${itm.unit} of ${itm.name} recorded at ${deptBy(t.from)}`;case'return':return `${q} ${itm.unit} of ${itm.name} returned from ${deptBy(t.from)}`;case'adjustment':return `${itm.name} stock reconciled at ${deptBy(t.to)}`;default:return 'Inventory updated'}}
  function trendRangeControls(){return `<div class="trend-range" aria-label="Consumption chart period">${[['7d','7 days'],['30d','1 month'],['12m','1 year']].map(([key,label])=>`<button type="button" data-action="trend-range" data-range="${key}" aria-pressed="${ui.trendRange===key}" class="${ui.trendRange===key?'active':''}">${label}</button>`).join('')}</div>`}
  function trendChart(){
    const range=['7d','30d','12m'].includes(ui.trendRange)?ui.trendRange:'7d';
    const series=(ui.role==='staff'?db.departments.filter(d=>d.id===ui.dept):db.departments.filter(d=>d.active));
    const palette=['#8a214c','#d89b48','#387eab','#4c9479','#9067a8','#cf6c69','#587ea0'];
    const counts=new Map();
    for(const tx of db.transactions){
      if(tx.type!=='usage'||ui.role==='staff'&&tx.from!==ui.dept)continue;
      const key=(range==='12m'?tx.date.slice(0,7):tx.date)+':'+tx.from;
      counts.set(key,(counts.get(key)||0)+Number(tx.qty||0));
    }
    const points=[];
    if(range==='12m'){
      const today=new Date(TODAY+'T12:00:00');
      for(let i=11;i>=0;i--){
        const d=new Date(today.getFullYear(),today.getMonth()-i,1);
        const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
        points.push({key,label:d.toLocaleDateString('en-IN',{month:'short'}),title:d.toLocaleDateString('en-IN',{month:'long',year:'numeric'})});
      }
    }else{
      const count=range==='30d'?30:7;
      for(let i=count-1;i>=0;i--){
        const date=daysFromNow(-i),d=new Date(date+'T12:00:00');
        points.push({key:date,label:range==='7d'?d.toLocaleDateString('en-IN',{weekday:'short'}):i%3===0||i===count-1?String(d.getDate()):' ',title:dateLabel(date)});
      }
    }
    const values=points.flatMap(p=>series.map(s=>counts.get(p.key+':'+s.id)||0));
    const peak=Math.max(1,...values),rough=peak/4,power=Math.pow(10,Math.floor(Math.log10(rough)));
    const step=[1,2,5,10].find(n=>n*power>=rough)*power;
    const top=step*4,total=values.reduce((sum,n)=>sum+n,0);
    const rangeLabel=range==='7d'?'last 7 days':range==='30d'?'last 30 days':'last 12 months';
    return `${ui.mode==='control'?`<div class="trend-inline-controls">${trendRangeControls()}</div>`:''}
      <div class="trend-graph" role="img" aria-label="Department-wise recorded consumption for ${rangeLabel}: ${fmt(total)} units, with y-axis in units">
        <div class="trend-y-axis"><small>Units</small>${[4,3,2,1,0].map(t=>`<span>${fmt(step*t)}</span>`).join('')}</div>
        <div class="trend-plot-scroll"><div class="trend-chart trend-chart-${range}">
          ${points.map(p=>`<div class="trend-column"><div class="trend-bar-space"><div class="trend-bars">${series.map((s,i)=>{const qty=counts.get(p.key+':'+s.id)||0;return `<span class="trend-bar" style="--bar-h:${qty?Math.max(2,qty/top*100):0}%;--bar-color:${palette[i%palette.length]}" title="${escapeHTML(s.name)} · ${fmt(qty)} units · ${escapeHTML(p.title)}"></span>`}).join('')}</div></div><span class="trend-axis-label">${escapeHTML(p.label)}</span></div>`).join('')}
        </div></div>
      </div>
      <div class="trend-legend">${series.map((s,i)=>`<span><i style="background:${palette[i%palette.length]}"></i>${escapeHTML(s.name)}</span>`).join('')}</div>
      <div class="trend-foot"><span>Recorded consumption by department</span><strong>${fmt(total)} units · ${rangeLabel}</strong></div>`;
  }
  function riskList(limit=4){const risks=expiryRisks().slice(0,limit);return risks.length?risks.map(b=>{const d=daysUntil(b.expiry);return `<div class="list-row"><div class="list-detail"><span class="list-symbol ${d<=7?'red':''}">${subjectPhoto(b.itemId,'item-photo') || icon('calendar')}</span><div>${detailItemButton(itemBy(b.itemId))}<small>${escapeHTML(b.lot)} · ${escapeHTML(deptBy(b.location))}</small></div></div><div class="list-row-right"><strong style="color:${d<=7?'#c43b52':'#ac7823'}">${d<0?'Expired':d===0?'Today':d+' days'}</strong><small>${fmt(b.qty)} ${escapeHTML(itemBy(b.itemId).unit)}</small></div></div>`}).join(''):empty('No near-expiry batches')}
  function transactionList(){return recentTransactions().length?recentTransactions().map(t=>`<div class="list-row"><div class="list-detail"><span class="list-symbol ${t.type==='usage'?'red':t.type==='issue'?'blue':'green'}">${subjectPhoto(t.itemId,'item-photo') || icon(t.type==='receive'?'truck':t.type==='usage'?'clipboard':t.type==='issue'?'swap':'return')}</span><div><strong>${escapeHTML(txDescription(t))}</strong><small>${escapeHTML(t.actor)} · ${escapeHTML(t.time)} · ${dateLabel(t.date)}</small></div></div><span class="tag ${t.type==='usage'?'red':t.type==='issue'?'blue':'green'}">${escapeHTML(t.type)}</span></div>`).join(''):empty('No activity yet')}
  function quickActions(){let actions=ui.role==='staff'?[['Daily Consumption','usage','clipboard'],['Stock Requests','requests','file'],['Returns','returns','return'],['My Inventory','inventory','box']]:ui.role==='head'?[['Inventory','inventory','box'],['Daily Reports','reports','chart'],['Activity','activity','clock'],['Control Center','control','shield']]:[['Receive Stock','receive','truck'],['Issue to Department','issue','swap'],['Daily Consumption','usage','clipboard'],['Stock Requests','requests','file']];return `<div class="action-strip">${actions.map(([t,r,ic])=>`<button type="button" class="quick-action" data-action="quick-route" data-route="${r}"><span class="quick-icon">${operationPhoto(ic)}</span>${t}</button>`).join('')}</div>`}
  function workspaceOverview(){const scope=getScope(),batches=scopedBatches();const total=new Set(batches.map(b=>b.itemId)).size;const atRisk=expiryRisks().length;const low=scope?db.items.filter(i=>i.depts.includes(scope)&&qtyAt(scope,i.id)<Math.max(10,Math.round(i.minimum*.12))).length:lowStock().length;
    return header('DAILY OPERATIONS',`Good ${new Date().getHours()<12?'morning':new Date().getHours()<17?'afternoon':'evening'}, ${escapeHTML(currentName().split(' ')[0])}.`,scope?deptBy(scope):'Your hospital supply overview — organized for the work that matters.',`<span class="tag gold">${icon('calendar','sm')} ${dateLabel(TODAY)}</span>`)+
      photo('./assets/workspace-entrance.webp','workspace-room')+
      `<div class="kpi-grid">${kpi('Active inventory items',fmt(total),'box',scope?'Available in your department':'Across connected locations','blue')}${kpi('Needs replenishment',fmt(low),'alert','Below suggested stock limits','red')}${kpi('Expiry attention',fmt(atRisk),'calendar',`Within ${db.preferences.expiryDays} days`,'gold')}${kpi('Open requests',fmt(pendingRequests().length),'file','Awaiting processing','green')}</div>${quickActions()}
      <div class="grid-2">${panel('Consumption overview','Select a period to view recorded usage',trendChart(),trendRangeControls())}${panel('Expiry watch','Batches that may need action soon',riskList(),`<button type="button" class="panel-link" data-action="navigate" data-page="inventory">View inventory</button>`)}</div>
      <div style="height:20px"></div>${panel('Recent stock movement','Each transaction has a time, actor and source.',transactionList(),`<button type="button" class="panel-link" data-action="navigate" data-page="activity">See all activity</button>`)}`;
  }
  function controlOverview(){const totalQty=validBatches().reduce((s,b)=>s+b.qty,0),atRisk=expiryRisks().length;const val=validBatches().reduce((s,b)=>s+b.qty*b.cost,0);
    return header('HOSPITAL COMMAND CENTER','Every department. One clear picture.','Monitor supply health, manage access, and take action with confidence.',canAdmin()?button(`${icon('plus')} Add department`,'modal-department','btn-dark'):'')+
      `<div class="kpi-grid">${kpi('Hospital stock units',fmt(totalQty),'box','Across all active locations','blue')}${kpi('Inventory value',money(val),'chart','Illustrative purchase-cost value','gold')}${kpi('Low-stock items',fmt(lowStock().length),'alert','Central store reorder attention','red')}${kpi('Active departments',fmt(db.departments.filter(d=>d.active).length),'building','Configured for this hospital','green')}</div><div class="grid-2">${panel('Hospital inventory pulse','Recorded consumption by selected period',trendChart())}${panel('Attention required','Review stock risk and outstanding requests',`<div class="list-row"><div class="list-detail"><span class="list-symbol red">${operationPhoto('alert')}</span><div><strong>${lowStock().length} central store items below threshold</strong><small>Review replenishment needs</small></div></div><button type="button" class="panel-link" data-action="switch-workspace-inventory">Review</button></div><div class="list-row"><div class="list-detail"><span class="list-symbol">${operationPhoto('calendar')}</span><div><strong>${atRisk} batches nearing expiry</strong><small>${db.preferences.expiryDays}-day expiry window</small></div></div><button type="button" class="panel-link" data-action="switch-workspace-inventory">Review</button></div><div class="list-row"><div class="list-detail"><span class="list-symbol blue">${operationPhoto('file')}</span><div><strong>${pendingRequests().length} open stock requests</strong><small>Awaiting store action</small></div></div><button type="button" class="panel-link" data-action="switch-workspace-requests">Review</button></div>` )}</div><div style="height:20px"></div>${panel('Hospital departments','Select a department to inspect its stock and team.',`<div class="dept-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">${db.departments.filter(d=>d.active).slice(0,5).map(d=>`<button type="button" class="overview-dept-tile" data-action="view-department" data-id="${escapeHTML(d.id)}">${subjectPhoto(d.id,'department-photo') || `<span class="dept-letter">${escapeHTML(d.code.slice(0,2))}</span>`}<strong>${escapeHTML(d.name)}</strong><small>${fmt(validBatches(d.id).reduce((s,b)=>s+b.qty,0))} units on hand</small><span class="overview-dept-open">View details ${icon('arrow','sm')}</span></button>`).join('')}</div>`,`<button type="button" class="panel-link" data-action="navigate" data-page="departments">Manage departments</button>`)}`;
  }
  function inventoryPage(){let rows=validBatches(getScope());if(ui.filter==='low')rows=rows.filter(b=>b.location==='store'&&qtyAt('store',b.itemId)<itemBy(b.itemId).minimum||ui.role==='staff'&&b.qty<20);if(ui.filter==='expiring')rows=rows.filter(b=>daysUntil(b.expiry)<=db.preferences.expiryDays);if(ui.filter==='store')rows=rows.filter(b=>b.location==='store');const displayRows=rows.sort((a,b)=>a.itemId.localeCompare(b.itemId)||a.expiry.localeCompare(b.expiry));
    return header('STOCK VISIBILITY','Inventory & batches','Track stock by location, item, batch and expiry date.',canManage()?button(`${icon('plus')} Receive Stock`,'go-receive','btn-dark'):'')+`<div class="panel panel-pad"><div class="table-toolbar"><div class="filter-pills">${[['all','All stock'],['store','Central store'],['low','Low stock'],['expiring','Expiry watch']].filter(x=>x[0]!=='store'||ui.role!=='staff').map(([k,l])=>`<button type="button" class="filter-pill ${ui.filter===k?'active':''}" data-action="filter" data-filter="${k}">${l}</button>`).join('')}</div><label class="search-input">${icon('search')}<input type="search" placeholder="Search items or batches" data-search aria-label="Search inventory" value="${escapeHTML(ui.search)}"/></label></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Item / SKU</th><th>Location</th><th>Batch</th><th>Available</th><th>Expiry</th><th>Status</th></tr></thead><tbody>${displayRows.map(b=>{const itm=itemBy(b.itemId),d=daysUntil(b.expiry);return `<tr data-search-row="${escapeHTML((itm.name+' '+itm.sku+' '+b.lot+' '+deptBy(b.location)).toLowerCase())}"><td><div class="table-item"><span class="mini-item-icon">${subjectPhoto(itm.id,'item-photo') || icon('box','sm')}</span><span>${detailItemButton(itm)}<small>${escapeHTML(itm.sku)}</small></span></div></td><td>${escapeHTML(deptBy(b.location))}</td><td>${escapeHTML(b.lot)}</td><td><strong class="num">${fmt(b.qty)}</strong> <span class="muted">${escapeHTML(itm.unit)}</span></td><td>${dateLabel(b.expiry)}</td><td>${d<0?'<span class="tag red">Expired</span>':d<=db.preferences.expiryDays?'<span class="tag gold">Expiring soon</span>':'<span class="tag green">Available</span>'}</td></tr>`}).join('')}</tbody></table>${displayRows.length?'':empty('No batches match this filter')}</div></div>`;
  }
  function formVal(name,fallback=''){return ui.form[name]===undefined?fallback:ui.form[name]}
  function selectItem(name,location=null,selected=null,stockOnly=false){const eligible=db.items.filter(i=>(!location||location==='store'||i.depts.includes(location))&&(!stockOnly||availableQty(location,i.id)>0));return `<select name="${name}" data-refresh="true" required><option value="">Choose an item</option>${eligible.map(i=>`<option value="${i.id}" ${i.id===(selected||'')?'selected':''}>${escapeHTML(i.name)}</option>`).join('')}</select>`}
  function batchSelect(location,itemId,selected=''){const batches=usableBatches(location,itemId);return `<select name="batchId" required><option value="">Choose a batch (FEFO first)</option>${batches.map(b=>`<option value="${b.id}" ${b.id===selected?'selected':''}>${escapeHTML(b.lot)} · ${fmt(b.qty)} available · Exp ${dateLabel(b.expiry)}</option>`).join('')}</select>`}
  function receivePage(){if(!canManage())return restricted();const selected=formVal('itemId','gloves');return header('SUPPLIER TO CENTRAL STORE','Receive new stock','Record every incoming batch once. OPTIVUS updates your stock instantly.')+`<div class="grid-2"><section class="panel form-card"><form id="receive-form"><div class="form-grid"><div class="field wide"><label>Item *</label><select name="itemId" required>${itemOptions(selected)}</select></div><div class="field"><label>Supplier *</label><input name="supplier" maxlength="80" required placeholder="Supplier name" value="${escapeHTML(formVal('supplier','Medline Distributors'))}" /></div><div class="field"><label>Batch / lot number *</label><input name="lot" maxlength="50" required placeholder="e.g. GL-2026-018" value="${escapeHTML(formVal('lot'))}" /></div><div class="field"><label>Quantity received *</label><input type="number" min="1" max="1000000" step="1" name="qty" required placeholder="0" value="${escapeHTML(formVal('qty'))}" /></div><div class="field"><label>Unit cost (₹) *</label><input type="number" min="0" max="1000000" step="0.01" name="cost" required placeholder="0.00" value="${escapeHTML(formVal('cost'))}" /></div><div class="field"><label>Expiry date *</label><input type="date" name="expiry" required min="${TODAY}" value="${escapeHTML(formVal('expiry'))}" /></div><div class="field"><label>Receive into</label><input value="Central Store" disabled /></div><div class="field wide"><label>Reference / note</label><textarea name="note" maxlength="250" placeholder="Invoice, purchase order or delivery note">${escapeHTML(formVal('note'))}</textarea></div></div><div class="form-actions"><button type="reset" class="btn btn-outline">Clear</button><button type="submit" class="btn btn-dark">${icon('check')} Confirm Stock Inward</button></div></form></section><aside><div class="form-aside"><h3>${icon('shield')} Receiving checklist</h3><p>For accurate stock, capture the physical batch and quantity printed on the supply packaging.</p><div class="line"><span>Receiving location</span><strong>Central Store</strong></div><div class="line"><span>Stock effect</span><strong>+ Received quantity</strong></div><div class="line"><span>Movement history</span><strong>Recorded automatically</strong></div></div><div style="height:18px"></div></aside></div>`}
  function issuePage(){if(!canManage())return restricted();const dept=formVal('to','icu'),itm=formVal('itemId','gloves');const eligible=usableBatches('store',itm);return header('CENTRAL STORE TO DEPARTMENT','Issue stock','Dispatch available supplies from Central Store and update both locations.')+`<div class="grid-2"><section class="panel form-card"><form id="issue-form"><div class="form-grid"><div class="field wide"><label>Destination department *</label><select name="to" required data-refresh="true">${locationOptions(dept)}</select></div><div class="field wide"><label>Item *</label>${selectItem('itemId',dept,itm,false)}</div><div class="field wide"><label>Available batch * <span class="muted" style="font-weight:500">(earliest expiry first)</span></label>${batchSelect('store',itm,formVal('batchId'))}<div class="hint">${eligible.length?`${fmt(availableQty('store',itm))} units available across eligible batches`:'No eligible batches for this item'}</div></div><div class="field"><label>Issue quantity *</label><input type="number" name="qty" min="1" step="1" required value="${escapeHTML(formVal('qty'))}" placeholder="0"/></div><div class="field"><label>Reference / purpose</label><input name="note" maxlength="150" placeholder="Ward replenishment" value="${escapeHTML(formVal('note'))}" /></div></div><div class="form-actions"><button type="submit" class="btn btn-dark">${icon('swap')} Confirm Stock Issue</button></div></form></section><aside><div class="form-aside"><h3>${icon('swap')} Two-sided stock movement</h3><p>One transaction reduces central store quantity and increases the selected department's stock for the same batch.</p><div class="line"><span>From</span><strong>Central Store</strong></div><div class="line"><span>To</span><strong>${escapeHTML(deptBy(dept))}</strong></div><div class="line"><span>Tracking</span><strong>Batch preserved</strong></div></div><div style="height:18px"></div></aside></div>`}
  function usagePage(){const loc=ui.role==='staff'?ui.dept:formVal('location','icu');const itm=formVal('itemId',db.items.find(i=>i.depts.includes(loc)&&availableQty(loc,i.id)>0)?.id||'gloves');const total=Number(formVal('used',0))+Number(formVal('wasted',0));return header('FAST DAILY ENTRY','Record daily consumption','A few taps to record used and wasted supplies, with automatic balance updates.')+`<div class="grid-2"><section class="panel form-card"><form id="usage-form"><div class="form-grid">${ui.role==='staff'?`<div class="field wide"><label>My department</label><input value="${escapeHTML(deptBy(loc))}" disabled/><input type="hidden" name="location" value="${escapeHTML(loc)}"/></div>`:`<div class="field wide"><label>Department *</label><select name="location" data-refresh="true" required>${locationOptions(loc)}</select></div>`}<div class="field wide"><label>Item *</label>${selectItem('itemId',loc,itm,true)}</div><div class="field wide"><label>Batch *</label>${batchSelect(loc,itm,formVal('batchId'))}<div class="hint">${fmt(availableQty(loc,itm))} ${escapeHTML(itemBy(itm).unit)} available in ${escapeHTML(deptBy(loc))}</div></div><div class="field"><label>Quantity used</label><div class="usage-counter"><button type="button" data-action="counter" data-key="used" data-delta="-1" aria-label="Decrease used">−</button><input name="used" type="number" min="0" step="1" value="${escapeHTML(formVal('used',0))}" required/><button type="button" data-action="counter" data-key="used" data-delta="1" aria-label="Increase used">+</button></div></div><div class="field"><label>Quantity wasted</label><div class="usage-counter"><button type="button" data-action="counter" data-key="wasted" data-delta="-1" aria-label="Decrease wasted">−</button><input name="wasted" type="number" min="0" step="1" value="${escapeHTML(formVal('wasted',0))}" required/><button type="button" data-action="counter" data-key="wasted" data-delta="1" aria-label="Increase wasted">+</button></div></div><div class="field wide"><label>Note (optional)</label><input name="note" maxlength="150" value="${escapeHTML(formVal('note'))}" placeholder="Morning shift, ward round, dressing change..." /></div></div><div class="summary-strip"><span>Stock reduction for this entry</span><strong class="num" data-usage-total>${fmt(total)} units</strong></div><div class="form-actions"><button type="submit" class="btn btn-dark">${icon('check')} Save Daily Usage</button></div></form></section><aside><div class="form-aside"><h3>${icon('activity')} Simple. Accurate. Traceable.</h3><p>Choose the item and batch, enter used and wasted quantities, and save. The correct department's stock is reduced once.</p><div class="line"><span>Department</span><strong>${escapeHTML(deptBy(loc))}</strong></div><div class="line"><span>Available</span><strong>${fmt(availableQty(loc,itm))} ${escapeHTML(itemBy(itm).unit)}</strong></div><div class="line"><span>Logged by</span><strong>${escapeHTML(currentName())}</strong></div></div><div style="height:18px"></div></aside></div>`}
  function requestsPage(){const relevant=db.requests.filter(r=>ui.role!=='staff'||r.to===ui.dept);const page=listPage(relevant);const outstanding=relevant.filter(r=>['pending','approved'].includes(r.status));return header('SUPPLY REQUESTS','Request & fulfil stock','Departments request what they need; authorized store staff process the handoff.',button(`${icon('plus')} New Request`,'modal-request','btn-dark'))+`<div class="kpi-grid">${kpi('All requests',relevant.length,'file','In your accessible scope','blue')}${kpi('Awaiting review',outstanding.filter(r=>r.status==='pending').length,'clock','Pending approval','gold')}${kpi('Ready to fulfil',outstanding.filter(r=>r.status==='approved').length,'truck','Approved requests','green')}${kpi('Completed',relevant.filter(r=>r.status==='fulfilled').length,'check','Successfully issued','blue')}</div><section class="panel panel-pad"><div class="panel-top"><div><h2>Request queue</h2><p class="panel-sub">Approvals do not change inventory. Stock moves only when a request is fulfilled.</p></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Request</th><th>Department</th><th>Item / qty</th><th>Requested by</th><th>Status</th><th>Actions</th></tr></thead><tbody>${page.rows.map(r=>`<tr><td><strong>${escapeHTML(r.id)}</strong><br/><small class="muted">${dateLabel(r.created)}</small></td><td>${escapeHTML(deptBy(r.to))}</td><td>${picturedItem(itemBy(r.itemId))}<br/><small class="muted">${fmt(r.qty)} ${escapeHTML(itemBy(r.itemId).unit)}</small></td><td>${picturedStaff(r.actor)}</td><td>${badge(r.status)}</td><td><div style="display:flex;gap:5px;flex-wrap:wrap">${canManage()&&r.status==='pending'?`${button('Approve','approve-request','btn-outline btn-sm',`data-id="${r.id}"`)}${button('Decline','decline-request','btn-danger btn-sm',`data-id="${r.id}"`)}`:''}${canManage()&&r.status==='approved'?button('Fulfil','fulfil-request','btn-dark btn-sm',`data-id="${r.id}"`):''}${!['pending','approved'].includes(r.status)?'<span class="muted">—</span>':''}</div></td></tr>`).join('')}</tbody></table>${relevant.length?'':empty('No stock requests')}</div>${page.controls}</section>`}
  function returnsPage(){const relevant=db.returns.filter(r=>ui.role!=='staff'||r.from===ui.dept);return header('REVERSE LOGISTICS','Department returns','Return unused stock to the store or flag damaged material for quarantine.',button(`${icon('plus')} Create Return`,'modal-return','btn-dark'))+`<section class="panel panel-pad"><div class="panel-top"><div><h2>Return register</h2><p class="panel-sub">Every returned batch is recorded and reviewed.</p></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Return</th><th>From</th><th>Item / batch</th><th>Quantity</th><th>Condition</th><th>Status</th><th>Actions</th></tr></thead><tbody>${relevant.map(r=>`<tr><td><strong>${escapeHTML(r.id)}</strong><br/><small class="muted">${dateLabel(r.created)}</small></td><td>${escapeHTML(deptBy(r.from))}</td><td>${picturedItem(itemBy(r.itemId))}<br/><small class="muted">${escapeHTML(r.lot)}</small></td><td>${fmt(r.qty)}</td><td><span class="tag ${r.condition==='good'?'green':'red'}">${r.condition==='good'?'Reusable':'Damaged'}</span></td><td>${badge(r.status)}</td><td>${canManage()&&r.status==='pending'?`${button('Accept','accept-return','btn-dark btn-sm',`data-id="${r.id}"`)} ${button('Reject','reject-return','btn-danger btn-sm',`data-id="${r.id}"`)}`:'—'}</td></tr>`).join('')}</tbody></table>${relevant.length?'':empty('No returns recorded')}</div></section>`}
  function verificationPage(){if(ui.role==='head')return restricted();const relevant=db.checks.filter(c=>ui.role!=='staff'||c.location===ui.dept);return header('PHYSICAL INVENTORY','Stock verification','Record a physical count and submit differences for review.',button(`${icon('plus')} Start Stock Check`,'modal-check','btn-dark'))+`<section class="panel panel-pad"><div class="panel-top"><div><h2>Discrepancy register</h2><p class="panel-sub">Physical counts compared with expected stock.</p></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Check ID</th><th>Location</th><th>Item</th><th>System</th><th>Physical</th><th>Difference</th><th>Status</th></tr></thead><tbody>${relevant.map(c=>`<tr><td>${escapeHTML(c.id)}</td><td>${escapeHTML(deptBy(c.location))}</td><td>${picturedItem(itemBy(c.itemId))}</td><td>${fmt(c.expected)}</td><td>${fmt(c.counted)}</td><td style="color:${c.counted-c.expected<0?'#c33c51':'#168164'}">${c.counted-c.expected>0?'+':''}${c.counted-c.expected}</td><td>${badge(c.status)}</td></tr>`).join('')}</tbody></table>${relevant.length?'':empty('No checks submitted')}</div></section>`}
  function departmentsPage(){return header('HOSPITAL STRUCTURE','Departments','Create departments as your hospital grows. Every department gets its own inventory scope.',canAdmin()?button(`${icon('plus')} Add Department`,'modal-department','btn-dark'):'')+`<div class="dept-grid">${db.departments.map((d,i)=>{const units=validBatches(d.id).reduce((sum,b)=>sum+b.qty,0);const mapped=db.items.filter(x=>x.depts.includes(d.id)).length;return `<article class="dept-card"><button type="button" class="dept-card-open" data-action="view-department" data-id="${escapeHTML(d.id)}"><div class="dept-head">${subjectPhoto(d.id,'department-photo') || `<span class="dept-letter">${escapeHTML(d.code.slice(0,3))}</span>`}${badge(d.active?'active':'inactive')}</div><h3>${escapeHTML(d.name)}</h3><p>${escapeHTML(d.description||'Hospital department')}</p><div class="dept-meta"><span>Stock units<strong class="num">${fmt(units)}</strong></span><span>Mapped items<strong>${fmt(mapped)}</strong></span><span>Team members<strong>${db.staff.filter(x=>x.department===d.id&&x.active).length}</strong></span></div><span class="dept-view-prompt">View department details ${icon('arrow','sm')}</span></button>${canAdmin()?`<div style="display:flex;gap:8px">${button(`${icon('edit')} Edit`,'edit-department','btn-outline btn-sm',`data-id="${d.id}"`)}${button(d.active?'Deactivate':'Activate','toggle-department','btn-ghost btn-sm',`data-id="${d.id}"`)}</div>`:''}</article>`}).join('')}</div><div style="height:20px"></div>`}
  function cataloguePage(){return header('ITEM MASTER','Item catalogue','Set standard names, units, reorder points and permitted departments.',canAdmin()||ui.role==='store'?button(`${icon('plus')} Add Item`,'modal-item','btn-dark'):'')+`<section class="panel panel-pad"><div class="table-toolbar"><span class="muted" style="font-size:13px">${db.items.length} standardized consumables & disposables</span><label class="search-input">${icon('search')}<input type="search" data-search placeholder="Search item or SKU" value="${escapeHTML(ui.search)}"/></label></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Item</th><th>Category</th><th>Unit</th><th>Reorder point</th><th>Departments</th><th>Action</th></tr></thead><tbody>${db.items.map(i=>`<tr data-search-row="${escapeHTML((i.name+' '+i.sku+' '+i.category).toLowerCase())}"><td><div class="table-item"><span class="mini-item-icon">${subjectPhoto(i.id,'item-photo') || icon('layers','sm')}</span><span>${detailItemButton(i)}<small>${escapeHTML(i.sku)}</small></span></div></td><td>${escapeHTML(i.category)}</td><td>${escapeHTML(i.unit)}</td><td>${fmt(i.minimum)}</td><td>${i.depts.length} mapped</td><td>${canAdmin()||ui.role==='store'?button('Edit','edit-item','btn-outline btn-sm',`data-id="${i.id}"`):'—'}</td></tr>`).join('')}</tbody></table></div></section>`}
  function staffPage(){const page=listPage(db.staff);return header('IDENTITY & RESPONSIBILITY','Staff & access','Create preview team records and assign hospital-wide or department-specific roles.',canAdmin()?button(`${icon('plus')} Add Staff Member`,'modal-staff','btn-dark'):'')+`<section class="panel panel-pad"><div class="table-wrap"><table class="data-table"><thead><tr><th>Team member</th><th>Role</th><th>Department / scope</th><th>Status</th><th>Action</th></tr></thead><tbody>${page.rows.map(s=>`<tr><td><div class="table-item"><span class="avatar" style="width:35px;height:35px">${portrait(s.name,s)}</span><span><button type="button" class="detail-entity-link" data-action="view-staff" data-id="${escapeHTML(s.id)}">${escapeHTML(s.name)}${icon('search','sm')}</button><small>${escapeHTML(s.id)}</small></span></div></td><td>${escapeHTML(ROLE_INFO[s.role]?.label||s.role)}</td><td>${s.role==='staff'?escapeHTML(deptBy(s.department)):'Hospital-wide'}</td><td>${badge(s.active?'active':'inactive')}</td><td>${canAdmin()?button(s.active?'Deactivate':'Activate','toggle-staff','btn-outline btn-sm',`data-id="${s.id}"`):'—'}</td></tr>`).join('')}</tbody></table></div>${page.controls}</section>`}
  function approvalsPage(){
    const pending=db.checks.filter(c=>c.status==='pending'),requests=db.requests.filter(r=>r.status==='pending');
    return header('GOVERNANCE','Approval center','Review stock checks and department requests before supplies move.')+
      `<div class="kpi-grid">${kpi('Pending stock requests',requests.length,'file','Approval required','gold')}
        ${kpi('Physical count reviews',pending.length,'clipboard','Awaiting approval','red')}
        ${kpi('Completed stock checks',db.checks.filter(c=>c.status==='approved').length,'shield','Reconciled records','green')}
        ${kpi('Approval policy',db.preferences.requestApproval?'On':'Off','settings','Request approval setting','blue')}</div>
      <section class="panel panel-pad"><div class="panel-top"><div><h2>Stock verification approvals</h2><p class="panel-sub">Review discrepancies before any stock adjustment.</p></div></div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Reference</th><th>Location</th><th>Item</th><th>Difference</th><th>Reason</th><th>Action</th></tr></thead><tbody>
        ${pending.map(c=>`<tr><td>${escapeHTML(c.id)}</td><td>${escapeHTML(deptBy(c.location))}</td><td>${picturedItem(itemBy(c.itemId))}</td><td>${c.counted-c.expected>0?'+':''}${c.counted-c.expected}</td><td>${escapeHTML(c.note||'Physical count')}<br>${picturedStaff(c.actor)}</td><td>${canAdmin()?`${button('Approve','approve-check','btn-dark btn-sm',`data-id="${c.id}"`)} ${button('Reject','reject-check','btn-danger btn-sm',`data-id="${c.id}"`)}`:'View only'}</td></tr>`).join('')}</tbody></table>
        ${pending.length?'':empty('All stock checks reviewed')}</div></section>
      <div style="height:20px"></div>
      <section class="panel panel-pad"><div class="panel-top"><div><h2>Department supply requests</h2><p class="panel-sub">Admin approves or declines here. Store Manager fulfils approved requests in Workspace.</p></div></div>
        ${requests.length?requests.map(r=>`<div class="list-row"><div class="list-detail"><span class="list-symbol blue">${subjectPhoto(r.itemId,'item-photo') || icon('file')}</span><div><strong>${escapeHTML(itemBy(r.itemId).name)} · ${fmt(r.qty)} ${escapeHTML(itemBy(r.itemId).unit)}</strong><small>${escapeHTML(deptBy(r.to))} · ${picturedStaff(r.actor)}</small></div></div><div style="display:flex;gap:8px;align-items:center">${canAdmin()?`${button('Approve','approve-request','btn-dark btn-sm',`data-id="${r.id}"`)} ${button('Decline','decline-request','btn-danger btn-sm',`data-id="${r.id}"`)}`:badge(r.status)}</div></div>`).join(''):empty('No requests pending')}</section>`;
  }
  function deltaFor(t,location,itemId){if(t.itemId!==itemId)return 0;const q=Number(t.qty||0);if(t.type==='receive')return t.to===location?q:0;if(t.type==='issue')return (t.to===location?q:0)-(t.from===location?q:0);if(t.type==='usage')return t.from===location?-q:0;if(t.type==='return')return (t.condition==='good'&&t.to===location?q:0)-(t.from===location?q:0);if(t.type==='adjustment')return t.to===location?Number(t.delta||0):0;return 0}
  function reportRows(date,location){const locations=location==='all'?(ui.role==='staff'?[ui.dept]:allLocations()):[location];let out=[];for(const loc of locations){for(const item of db.items){const closing=qtyAt(loc,item.id)-db.transactions.filter(t=>t.date>date).reduce((s,t)=>s+deltaFor(t,loc,item.id),0);const day=db.transactions.filter(t=>t.date===date&&t.itemId===item.id);const inward=day.filter(t=>(t.type==='receive'||t.type==='issue'||t.type==='return'&&t.condition==='good')&&t.to===loc).reduce((s,t)=>s+t.qty,0);const outward=day.filter(t=>(t.type==='issue'||t.type==='return')&&t.from===loc).reduce((s,t)=>s+t.qty,0);const used=day.filter(t=>t.type==='usage'&&t.from===loc).reduce((s,t)=>s+Number(t.used||0),0);const wasted=day.filter(t=>t.type==='usage'&&t.from===loc).reduce((s,t)=>s+Number(t.wasted||0),0);const adjustment=day.filter(t=>t.type==='adjustment'&&t.to===loc).reduce((s,t)=>s+Number(t.delta||0),0);const opening=closing-(inward-outward-used-wasted+adjustment);if(opening||closing||inward||outward||used||wasted||adjustment)out.push({item,location:loc,opening,inward,outward,used,wasted,adjustment,closing})}}
    return out}
  function reportsPage(){const location=ui.role==='staff'?ui.dept:formVal('location','all');const rows=reportRows(ui.reportDate,location);const total=rows.reduce((s,r)=>s+r.used+r.wasted,0);const received=rows.reduce((s,r)=>s+r.inward,0);const moved=rows.reduce((s,r)=>s+r.outward,0);return header('STOCK ACCOUNTABILITY',ui.mode==='control'?'Inventory analytics':'Daily inventory report','Understand opening, received, issued, consumed, wasted and closing stock.',button(`${icon('download')} Export CSV`,'export-report','btn-dark'))+`<div class="panel panel-pad"><div class="report-toolbar"><div class="field"><label>Report date</label><input type="date" id="report-date" value="${ui.reportDate}" max="${TODAY}" /></div>${ui.role==='staff'?'':`<div class="field"><label>Location</label><select id="report-location"><option value="all" ${location==='all'?'selected':''}>All locations</option>${locationOptions(location,true)}</select></div>`}<span class="tag gold" style="margin:0 0 7px">${rows.length} item-location records</span></div><div class="report-totals"><div class="report-box"><span>Stock received / transferred in</span><strong class="num">${fmt(received)}</strong></div><div class="report-box"><span>Stock issued / transferred out</span><strong class="num">${fmt(moved)}</strong></div><div class="report-box"><span>Used + wasted</span><strong class="num">${fmt(total)}</strong></div></div><div class="table-wrap" style="margin-top:23px"><table class="data-table"><thead><tr><th>Item / location</th><th>Opening</th><th>In</th><th>Out</th><th>Used</th><th>Waste</th><th>Adjustment</th><th>Closing</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${picturedItem(r.item)}<br/><small class="muted">${escapeHTML(deptBy(r.location))} · ${escapeHTML(r.item.unit)}</small></td><td>${fmt(r.opening)}</td><td>${fmt(r.inward)}</td><td>${fmt(r.outward)}</td><td>${fmt(r.used)}</td><td>${fmt(r.wasted)}</td><td>${r.adjustment>0?'+':''}${fmt(r.adjustment)}</td><td><strong>${fmt(r.closing)}</strong></td></tr>`).join('')}</tbody></table>${rows.length?'':empty('No reportable stock at this date')}</div></div>`}
  function activityPage(){const txs=db.transactions.filter(t=>ui.role!=='staff'||t.from===ui.dept||t.to===ui.dept);const custom=ui.mode==='control'?db.audit||[]:[];const events=[...txs.map(t=>({date:t.date,time:t.time,title:txDescription(t),itemId:t.itemId,meta:`${t.actor} · ${t.id}`,type:t.type})),...custom.map(a=>({date:a.date,time:a.time,title:a.message,meta:a.actor,type:'audit'}))].sort((a,b)=>(b.date+' '+b.time).localeCompare(a.date+' '+a.time));const page=listPage(events);return header('ACCOUNTABILITY',ui.mode==='control'?'Audit trail':'Activity history','Trace every stock change to a user, date and action.',button(`${icon('download')} Export Activity`,'export-activity','btn-outline'))+`<div class="grid-2"><section class="panel panel-pad"><div class="panel-top"><div><h2>Recorded activity</h2><p class="panel-sub">Recent events in this demo environment.</p></div></div><div class="timeline">${page.rows.map(ev=>`<div class="timeline-item"><span class="list-symbol ${ev.type==='usage'?'red':ev.type==='receive'?'green':'blue'}">${subjectPhoto(ev.itemId,'item-photo') || icon(ev.type==='usage'?'clipboard':ev.type==='receive'?'truck':ev.type==='audit'?'shield':'swap','sm')}</span><div class="timeline-copy"><strong>${escapeHTML(ev.title)}</strong><p>${escapeHTML(ev.meta)}</p><small>${dateLabel(ev.date)} · ${escapeHTML(ev.time)}</small></div></div>`).join('')||empty('No activity yet')}</div>${page.controls}</section><aside class="info-card" style="align-self:start"><h3>${icon('shield')} A traceable movement trail</h3><p>Receipts, inter-location transfers, usage, approved returns and reconciliation actions generate event records. In a production system these logs must be stored in a tamper-resistant backend.</p></aside></div>`}
  function settingsPage(){return header('PLATFORM CONFIGURATION','Hospital settings','Manage your hospital identity, stock rules and notification preferences.')+`<div class="grid-2"><section class="panel panel-pad"><div class="panel-top"><div><h2>Hospital profile</h2><p class="panel-sub">Shown to your hospital teams throughout OPTIVUS.</p></div></div><form id="settings-form"><div class="form-grid"><div class="field wide"><label>Hospital name</label><input name="hospital" maxlength="80" required ${canAdmin()?'':'disabled'} value="${escapeHTML(db.hospital)}" /></div><div class="field"><label>Deployment focus</label><input value="Consumables & disposables (V1)" disabled /></div><div class="field"><label>Recommended hospital size</label><input value="20–100 beds" disabled /></div><div class="field"><label>Expiry alert window (days)</label><input name="expiryDays" type="number" min="1" max="365" required ${canAdmin()?'':'disabled'} value="${db.preferences.expiryDays}" /></div></div>${canAdmin()?`<div class="form-actions"><button class="btn btn-dark" type="submit">Save settings</button></div>`:''}</form></section><section class="panel panel-pad"><div class="panel-top"><div><h2>Inventory policies</h2><p class="panel-sub">Control how actions are reviewed in the demo.</p></div></div>${[
      ['requestApproval','Stock request approval','Store approval before a request is fulfilled.'],['adjustmentApproval','Reconciliation approval','Review physical-count differences before stock changes.'],['notifications','Operational notifications','Show in-app low-stock and expiry reminders.']
    ].map(([key,label,desc])=>`<label class="settings-row"><span><strong>${label}</strong><p>${desc}</p></span><input class="switch" type="checkbox" data-pref="${key}" ${db.preferences[key]?'checked':''} ${canAdmin()&&key!=='adjustmentApproval'?'':'disabled'} aria-label="${label}" /></label>`).join('')}</section></div>${canAdmin()?`<div style="margin-top:25px;display:flex;justify-content:flex-end">${button('Reset fictional demo data','modal-reset','btn-danger')}</div>`:''}`}
  function restricted(){return header('ACCESS CONTROL','Restricted view','This preview role is not permitted to access this operation.')+`<div class="panel panel-pad">${empty('Permission required')}</div>`}
  function formField(label,control,wide=false){return `<div class="field ${wide?'wide':''}"><label>${label}</label>${control}</div>`}
  function modalForm(name,fields,submit='Save'){return `<form id="${name}-form"><div class="form-grid">${fields}</div><div class="form-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Cancel</button><button type="submit" class="btn btn-dark">${icon('check')} ${submit}</button></div></form>`}
  function detailMetric(label,value,caption=''){return `<div class="detail-metric"><span>${escapeHTML(label)}</span><strong>${value}</strong>${caption?`<small>${escapeHTML(caption)}</small>`:''}</div>`}
  function picturedItem(item){
    return `<span class="pictured-item">${subjectPhoto(item.id,'inline-item-photo')}${detailItemButton(item)}</span>`;
  }
  function detailItemButton(item){return `<button type="button" class="detail-entity-link" data-action="view-item" data-id="${escapeHTML(item.id)}">${escapeHTML(item.name)}${icon('search','sm')}</button>`}
  function itemDetailBody(item){
    const locations=accessibleLocations();
    const batches=db.batches.filter(b=>b.itemId===item.id&&locations.includes(b.location)&&b.qty>0).sort((a,b)=>a.expiry.localeCompare(b.expiry));
    const available=batches.filter(b=>b.status==='available');
    const total=available.reduce((sum,b)=>sum+b.qty,0);
    const usage30=db.transactions.filter(t=>t.itemId===item.id&&t.type==='usage'&&locations.includes(t.from)&&t.date>=daysFromNow(-29)).reduce((sum,t)=>sum+Number(t.qty||0),0);
    const locationRows=locations.filter(loc=>loc==='store'||item.depts.includes(loc)||batches.some(b=>b.location===loc)).map(loc=>({loc,qty:available.filter(b=>b.location===loc).reduce((sum,b)=>sum+b.qty,0)}));
    const recent=db.transactions.filter(t=>t.itemId===item.id&&(locations.includes(t.from)||locations.includes(t.to))).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).slice(0,5);
    return `<div class="detail-stats">${detailMetric('Available units',fmt(total),item.unit)}${detailMetric('Recorded use · 30 days',fmt(usage30),item.unit)}${detailMetric('Stock batches',fmt(batches.length))}${detailMetric('Reorder point',fmt(item.minimum),'Central store')}</div>
      <div class="detail-section"><h3>Stock by location</h3><div class="detail-location-grid">${locationRows.map(r=>`<div><span>${escapeHTML(deptBy(r.loc))}</span><strong>${fmt(r.qty)} ${escapeHTML(item.unit)}</strong></div>`).join('')||'<p class="muted">No mapped locations</p>'}</div></div>
      <div class="detail-section"><h3>Batch and expiry details</h3><div class="table-wrap"><table class="data-table detail-table"><thead><tr><th>Batch / lot</th><th>Location</th><th>Quantity</th><th>Expiry</th><th>Status</th></tr></thead><tbody>${batches.map(b=>`<tr><td><strong>${escapeHTML(b.lot)}</strong>${ui.role==='staff'?'':`<small class="detail-table-sub">${escapeHTML(b.supplier||'Supplier not recorded')}</small>`}</td><td>${escapeHTML(deptBy(b.location))}</td><td>${fmt(b.qty)} ${escapeHTML(item.unit)}</td><td>${dateLabel(b.expiry)}</td><td>${b.status!=='available'?badge('quarantine'):daysUntil(b.expiry)<0?'<span class="tag red">Expired</span>':daysUntil(b.expiry)<=db.preferences.expiryDays?'<span class="tag gold">Expiring soon</span>':'<span class="tag green">Available</span>'}</td></tr>`).join('')}</tbody></table>${batches.length?'':empty('No on-hand batches in your scope')}</div></div>
      <div class="detail-section"><h3>Recent item activity</h3>${recent.length?recent.map(t=>`<div class="detail-activity"><span class="tag ${t.type==='usage'?'red':'blue'}">${escapeHTML(t.type)}</span><div><strong>${escapeHTML(txDescription(t))}</strong><small>${dateLabel(t.date)} · ${escapeHTML(t.actor)}</small></div></div>`).join(''):empty('No recorded movements for this item')}</div>`;
  }
  function departmentDetailBody(dept){
    const batches=validBatches(dept.id),items=db.items.filter(i=>i.depts.includes(dept.id));
    const units=batches.reduce((sum,b)=>sum+b.qty,0),staff=db.staff.filter(s=>s.department===dept.id&&s.active);
    const usage30=db.transactions.filter(t=>t.type==='usage'&&t.from===dept.id&&t.date>=daysFromNow(-29)).reduce((sum,t)=>sum+Number(t.qty||0),0);
    const requests=db.requests.filter(r=>r.to===dept.id&&['pending','approved'].includes(r.status)).length;
    return `<div class="detail-stats">${detailMetric('On-hand stock',fmt(units),'units')}${detailMetric('Mapped items',fmt(items.length))}${detailMetric('Used · 30 days',fmt(usage30),'units')}${detailMetric('Open requests',fmt(requests))}</div>
      <div class="detail-section"><h3>Department stock</h3><div class="detail-item-list">${items.map(i=>`<div><div>${picturedItem(i)}<small>${escapeHTML(i.sku)} · ${escapeHTML(i.category)}</small></div><strong>${fmt(qtyAt(dept.id,i.id))} ${escapeHTML(i.unit)}</strong></div>`).join('')||'<p class="muted">No catalogue items mapped yet</p>'}</div></div>
      <div class="detail-section"><h3>Assigned team members</h3>${staff.length?staff.map(s=>`<div class="detail-staff-row"><span class="avatar">${portrait(s.name,s)}</span><div><button type="button" class="detail-entity-link" data-action="view-staff" data-id="${escapeHTML(s.id)}">${escapeHTML(s.name)}${icon('search','sm')}</button><small>${escapeHTML(ROLE_INFO[s.role]?.label||s.role)}</small></div></div>`).join(''):empty('No active team profiles')}</div>`;
  }
  function staffDetailBody(person){
    const assignment=person.role==='staff'?deptBy(person.department):person.role==='store'?'Central Store':'Hospital-wide';
    const events=db.transactions.filter(t=>t.actor===person.name).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).slice(0,5);
    return `<div class="detail-person"><span class="detail-person-avatar">${portrait(person.name,person)}</span><div><strong>${escapeHTML(person.name)}</strong><span>${escapeHTML(ROLE_INFO[person.role]?.label||person.role)}</span></div>${badge(person.active?'active':'inactive')}</div>
      <div class="detail-stats">${detailMetric('Staff ID',escapeHTML(person.id))}${detailMetric('Access scope',escapeHTML(assignment))}${detailMetric('Status',person.active?'Active':'Inactive')}</div>
      <div class="detail-section"><h3>Recorded activity</h3>${events.length?events.map(t=>`<div class="detail-activity"><span class="tag blue">${escapeHTML(t.type)}</span><div><strong>${escapeHTML(txDescription(t))}</strong><small>${dateLabel(t.date)} · ${escapeHTML(t.time)}</small></div></div>`).join(''):empty('No activity recorded under this staff name')}</div>`;
  }
  function modal(){const cfg=ui.modal||{};let title='',subtitle='',body='',foot='',headerPhoto='';
    if(cfg.type==='view-item'){
      const item=db.items.find(i=>i.id===cfg.id);if(!item)return '';
      headerPhoto=subjectPhoto(item.id,'equipment-detail');title=item.name;subtitle=`${item.sku} · ${item.category} · ${item.unit}`;body=itemDetailBody(item);
    } else if(cfg.type==='view-department'){
      const dept=db.departments.find(d=>d.id===cfg.id);if(!dept)return '';
      headerPhoto=subjectPhoto(dept.id,'department-detail');title=dept.name;subtitle=`${dept.code} · ${dept.description||'Hospital department'}`;body=departmentDetailBody(dept);
    } else if(cfg.type==='view-staff'){
      const person=db.staff.find(s=>s.id===cfg.id);if(!person)return '';
      title='Staff profile';subtitle='Employee responsibility and recorded access';body=staffDetailBody(person);
    } else if(cfg.type==='department'){
      const old=db.departments.find(d=>d.id===cfg.id);title=old?'Edit Department':'Create Department';subtitle='Departments can be created when your hospital expands.';
      body=modalForm('department',formField('Department name *',`<input name="name" required maxlength="70" placeholder="e.g. Paediatrics" value="${escapeHTML(formVal('name',old?.name||''))}" />`,true)+formField('Short code *',`<input name="code" required maxlength="8" placeholder="e.g. PEDS" value="${escapeHTML(formVal('code',old?.code||''))}" />`)+formField('Description',`<input name="description" maxlength="140" placeholder="Purpose of the department" value="${escapeHTML(formVal('description',old?.description||''))}" />`,true),old?'Save Department':'Create Department');
    } else if(cfg.type==='item'){
      const old=db.items.find(i=>i.id===cfg.id);title=old?'Edit Catalogue Item':'Add Catalogue Item';subtitle='Standardize the item once, then map it to departments.';
      body=modalForm('item',formField('Item name *',`<input name="name" required maxlength="90" placeholder="Item name" value="${escapeHTML(formVal('name',old?.name||''))}" />`,true)+formField('SKU / stock code *',`<input name="sku" required maxlength="25" placeholder="CON-1011" value="${escapeHTML(formVal('sku',old?.sku||''))}" />`)+formField('Category *',`<input name="category" required maxlength="50" placeholder="Surgical, Dressings..." value="${escapeHTML(formVal('category',old?.category||''))}" />`)+formField('Unit *',`<select name="unit">${['pcs','boxes','packs','rolls','bottles','pairs','kits','sets','tubes'].map(x=>`<option value="${x}" ${formVal('unit',old?.unit||'pcs')===x?'selected':''}>${x}</option>`).join('')}</select>`)+formField('Central store reorder point *',`<input type="number" min="0" max="1000000" step="1" required name="minimum" value="${escapeHTML(formVal('minimum',old?.minimum??50))}" />`)+formField('Available to departments',`<div style="display:grid;gap:10px;margin-top:10px">${db.departments.filter(d=>d.active).map(d=>`<label style="font-size:13px;display:flex;align-items:center;gap:10px"><input type="checkbox" name="depts" value="${d.id}" style="width:17px;height:17px;min-height:17px" ${(ui.form.depts?ui.form.depts.includes(d.id):old?old.depts.includes(d.id):true)?'checked':''}/>${escapeHTML(d.name)}</label>`).join('')}</div>`,true),old?'Update Item':'Add Item');
    } else if(cfg.type==='staff'){
      title='Add Staff Member';subtitle='Create an illustrative team record and assign access scope.';body=modalForm('staff',formField('Full name *',`<input name="name" maxlength="70" required placeholder="Full name" value="${escapeHTML(formVal('name',''))}"/>`,true)+formField('Role',`<select name="role" data-refresh="true">${Object.entries(ROLE_INFO).map(([k,r])=>`<option value="${k}" ${formVal('role','staff')===k?'selected':''}>${escapeHTML(r.label)}</option>`).join('')}</select>`)+formField('Department',`<select name="department" ${formVal('role','staff')==='staff'?'required':'disabled'}>${locationOptions(formVal('department','icu'))}</select>`)+formField('Profile photo (optional)',`<input id="staff-photo" aria-label="Profile photo" type="file" accept="image/jpeg,image/png,image/webp"/><small>JPG, PNG or WebP · up to 5 MB</small><img id="staff-preview" alt="Selected staff photo" width="72" height="72" style="border-radius:50%;object-fit:cover" ${cfg.photo?'src="'+cfg.photo+'"':'hidden'} />`,true), 'Add Staff');
    } else if(cfg.type==='request'){
      const loc=ui.role==='staff'?ui.dept:formVal('to','icu');title='New Stock Request';subtitle='Ask Central Store for supplies your department needs.';
      body=modalForm('request',formField('Requesting department',ui.role==='staff'?`<input value="${escapeHTML(deptBy(loc))}" disabled/><input type="hidden" name="to" value="${escapeHTML(loc)}"/>`:`<select name="to" data-refresh="true">${locationOptions(loc)}</select>`,true)+formField('Requested item *',`<select name="itemId" required><option value="">Choose item</option>${itemOptions(formVal('itemId'),loc)}</select>`,true)+formField('Quantity *',`<input name="qty" type="number" min="1" max="1000000" step="1" required placeholder="0" value="${escapeHTML(formVal('qty'))}" />`)+formField('Reason',`<input name="note" maxlength="160" placeholder="e.g. ICU emergency trolley" value="${escapeHTML(formVal('note'))}"/>`,true),'Submit Request');
    } else if(cfg.type==='return'){
      const loc=ui.role==='staff'?ui.dept:formVal('from','icu');const itm=formVal('itemId',db.items.find(i=>availableQty(loc,i.id)>0)?.id||'gloves');title='Create Department Return';subtitle='Choose the exact batch and return condition.';
      body=modalForm('return',formField('Returning department',ui.role==='staff'?`<input value="${escapeHTML(deptBy(loc))}" disabled/><input type="hidden" name="from" value="${escapeHTML(loc)}"/>`:`<select name="from" data-refresh="true">${locationOptions(loc)}</select>`,true)+formField('Item *',selectItem('itemId',loc,itm,true),true)+formField('Batch *',batchSelect(loc,itm,formVal('batchId')),true)+formField('Quantity *',`<input type="number" name="qty" step="1" min="1" required placeholder="0" value="${escapeHTML(formVal('qty'))}"/>`)+formField('Condition',`<select name="condition"><option value="good">Unused / return to stock</option><option value="damaged">Damaged / quarantine</option></select>`)+formField('Reason / note',`<input name="note" maxlength="160" value="${escapeHTML(formVal('note'))}" placeholder="Return details"/>`,true),'Submit Return');
    } else if(cfg.type==='check'){
      const loc=ui.role==='staff'?ui.dept:formVal('location','icu'),itm=formVal('itemId','gloves');title='Physical Stock Check';subtitle='Compare counted items to the system balance.';
      body=modalForm('check',formField('Location',ui.role==='staff'?`<input value="${escapeHTML(deptBy(loc))}" disabled/><input type="hidden" name="location" value="${loc}"/>`:`<select name="location" data-refresh="true">${locationOptions(loc,true)}</select>`,true)+formField('Item *',`<select name="itemId" data-refresh="true">${itemOptions(itm,loc)}</select>`,true)+formField('Current system quantity',`<input value="${fmt(qtyAt(loc,itm))} ${escapeHTML(itemBy(itm).unit)}" disabled/>`,true)+formField('Physically counted quantity *',`<input type="number" name="counted" step="1" min="0" required placeholder="0" value="${escapeHTML(formVal('counted'))}" />`)+formField('Difference reason *',`<input name="note" maxlength="180" required placeholder="Count explanation" value="${escapeHTML(formVal('note'))}"/>`,true),'Submit for Review');
    } else if(cfg.type==='reset'){
      title='Reset demo data?';subtitle='This affects only the fictional data saved in your browser.';body=`<p class="reset-confirmation-note">This will replace your demo inventory records and cannot be undone.</p><div class="form-actions">${button('Cancel','close-modal','btn-outline')}${button('Reset Demo','confirm-reset','btn-danger')}</div>`;
    }
    return `<div class="modal-backdrop" data-action="close-backdrop"><div class="modal ${cfg.type.startsWith('view-')?'detail-modal':''}" role="dialog" aria-modal="true" aria-label="${escapeHTML(title)}"><div class="modal-head">${headerPhoto}<div><h2>${escapeHTML(title)}</h2><p>${escapeHTML(subtitle)}</p></div><button type="button" class="icon-btn" data-action="close-modal" aria-label="Close dialog">${icon('close')}</button></div><div class="modal-body">${body}</div>${foot?`<div class="modal-foot">${foot}</div>`:''}</div></div>`;
  }
  function nowTime(){return new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}
  function addAudit(message){db.audit??=[];db.audit.unshift({date:localDate(),time:nowTime(),actor:currentName(),message})}
  function addTx(type,props){db.transactions.unshift({id:id('TX'),type,date:localDate(),time:nowTime(),actor:currentName(),...props})}
  function confirmInt(raw,min=0){const n=Number(raw);if(!Number.isSafeInteger(n)||n<min||n>1000000)throw Error(`Enter a whole-number quantity between ${min} and 1,000,000.`);return n}
  function assert(condition,message){if(!condition)throw Error(message)}
  function transferBatch(batch,to,qty,requestId=null){assert(batch&&batch.location==='store'&&batch.status==='available'&&daysUntil(batch.expiry)>=0,'Source batch is not eligible for issue.');assert(batch.qty>=qty,'Not enough stock in this batch.');assert(itemBy(batch.itemId).depts.includes(to),'This item is not mapped to the destination department.');batch.qty-=qty;let dest=db.batches.find(b=>b.location===to&&b.itemId===batch.itemId&&b.lot===batch.lot&&b.expiry===batch.expiry&&b.status==='available');if(!dest){dest={...batch,id:id('batch'),location:to,qty:0};db.batches.push(dest)}dest.qty+=qty;addTx('issue',{itemId:batch.itemId,from:'store',to,qty,batchId:batch.id,note:requestId?'Request '+requestId:'Department issue'});}
  function fulfilRequest(r){assert(canManage(),'Permission required.');assert(r&&r.status==='approved','Approve this request first.');assert(db.departments.some(d=>d.id===r.to&&d.active),'Destination is inactive.');const batches=usableBatches('store',r.itemId);assert(batches.reduce((s,b)=>s+b.qty,0)>=r.qty,'Not enough unexpired stock. Receive stock before fulfilling.');let left=r.qty;for(const b of batches){if(!left)break;const q=Math.min(left,b.qty);transferBatch(b,r.to,q,r.id);left-=q}r.status='fulfilled';r.fulfilled=TODAY;addAudit(`Fulfilled ${r.id} for ${deptBy(r.to)}`);save();toast(`${r.id} fulfilled. Stock moved to ${deptBy(r.to)}.`);render()}
  function acceptReturn(r){assert(canManage()&&r&&r.status==='pending','Return cannot be accepted.');const batch=db.batches.find(b=>b.id===r.batchId);assert(batch&&batch.location===r.from&&batch.qty>=r.qty,'Batch quantity changed; review or reject this return.');batch.qty-=r.qty;let target=db.batches.find(b=>b.location==='store'&&b.itemId===r.itemId&&b.lot===batch.lot&&b.expiry===batch.expiry&&b.status===(r.condition==='good'?'available':'quarantine'));if(!target){target={...batch,id:id('batch'),location:'store',qty:0,status:r.condition==='good'?'available':'quarantine'};db.batches.push(target)}target.qty+=r.qty;r.status='accepted';addTx('return',{itemId:r.itemId,qty:r.qty,from:r.from,to:'store',batchId:r.batchId,condition:r.condition,note:r.note});addAudit(`Accepted ${r.id}: ${r.condition==='good'?'returned to store':'quarantined'}`);save();render();toast(`Return ${r.id} accepted.`)}
  function approveCheck(c){assert(canAdmin()&&c&&c.status==='pending','Admin approval required.');const available=qtyAt(c.location,c.itemId);assert(available===c.expected,'Current stock changed since the count. Please re-check before approving.');const delta=c.counted-c.expected;if(delta<0){let left=-delta;for(const b of validBatches(c.location,c.itemId).sort((a,b)=>a.expiry.localeCompare(b.expiry))){const used=Math.min(left,b.qty);b.qty-=used;left-=used;if(!left)break}assert(!left,'Insufficient stock for adjustment.')}else if(delta>0){const source=validBatches(c.location,c.itemId)[0];db.batches.push({id:id('batch'),itemId:c.itemId,location:c.location,lot:'RECON-'+Date.now().toString().slice(-5),expiry:source?.expiry||daysFromNow(365),qty:delta,cost:source?.cost||0,supplier:'Physical count reconciliation',status:'available'})}c.status='approved';addTx('adjustment',{itemId:c.itemId,to:c.location,qty:Math.abs(delta),delta,note:'Approved count '+c.id});addAudit(`Approved stock verification ${c.id} (${delta>0?'+':''}${delta})`);save();render();toast('Stock verification approved and reconciled.')}
  function collectForm(form){const data=new FormData(form),values=Object.fromEntries(data.entries());return values}
  function captureForm(form){if(!form)return;ui.form=collectForm(form);if(form.id==='item-form')ui.form.depts=[...form.querySelectorAll('[name="depts"]:checked')].map(x=>x.value)}
  function doSubmit(form){const data=collectForm(form);const type=form.id.replace('-form','');
    if(type==='login'){
      const account=DEMO_ACCOUNTS.find(a=>a.email===String(data.email||'').trim().toLowerCase());
      assert(account&&account.portal===ui.mode&&data.password==='Optivus123'&&(ui.mode==='control'||account.key===data.loginType),'Invalid demo credentials for this portal. Choose the correct demo account below.');
      ui.loginError='';ui.loginId=account.email;ui.identity=account;enter(account.role,ui.mode);return;
    }else if(type==='receive'){
      assert(canManage(),'Only store staff or admins can receive stock.');const item=itemBy(data.itemId);assert(db.items.some(i=>i.id===data.itemId),'Select a valid item.');const qty=confirmInt(data.qty,1),cost=Number(data.cost);assert(Number.isFinite(cost)&&cost>=0&&cost<=1000000,'Enter a valid unit cost.');assert(data.lot.trim()&&data.supplier.trim(),'Supplier and batch number are required.');assert(data.expiry>=TODAY,'Expired goods cannot be received as available stock.');let batch=db.batches.find(b=>b.location==='store'&&b.itemId===data.itemId&&b.lot.toLowerCase()===data.lot.trim().toLowerCase()&&b.status==='available');if(batch){assert(batch.expiry===data.expiry,'This batch number already exists with a different expiry date.');batch.qty+=qty}else{batch={id:id('batch'),itemId:data.itemId,location:'store',lot:data.lot.trim(),expiry:data.expiry,qty,cost,supplier:data.supplier.trim(),status:'available'};db.batches.push(batch)}addTx('receive',{itemId:data.itemId,to:'store',qty,batchId:batch.id,note:data.note.trim()||'Goods received'});addAudit(`Received ${qty} ${item.unit} of ${item.name} at Central Store`);save();setPage('workspace','inventory');toast(`${fmt(qty)} ${item.unit} received and recorded.`);
    }else if(type==='issue'){
      assert(canManage(),'Only authorized store staff can issue stock.');const b=db.batches.find(x=>x.id===data.batchId);assert(b&&b.itemId===data.itemId,'Select a valid item and batch.');const qty=confirmInt(data.qty,1);assert(db.departments.some(d=>d.id===data.to&&d.active),'Choose an active department.');transferBatch(b,data.to,qty);addAudit(`Issued ${qty} ${itemBy(data.itemId).unit} of ${itemBy(data.itemId).name} to ${deptBy(data.to)}`);save();setPage('workspace','inventory');toast('Stock issued. Both locations updated.');
    }else if(type==='usage'){
      const loc=ui.role==='staff'?ui.dept:data.location;assert(ui.role!=='head'&&accessibleLocations().includes(loc)&&loc!=='store','Select an accessible department.');const b=db.batches.find(x=>x.id===data.batchId);assert(b&&b.location===loc&&b.itemId===data.itemId&&b.status==='available'&&daysUntil(b.expiry)>=0,'Select a valid unexpired batch.');const used=confirmInt(data.used,0),wasted=confirmInt(data.wasted,0),total=used+wasted;assert(total>0,'Enter at least one unit used or wasted.');assert(total<=b.qty,'Quantity exceeds selected batch stock.');b.qty-=total;addTx('usage',{itemId:data.itemId,from:loc,qty:total,used,wasted,batchId:b.id,note:data.note.trim()||'Daily usage'});addAudit(`Recorded ${used} used and ${wasted} wasted for ${itemBy(data.itemId).name} at ${deptBy(loc)}`);save();ui.form={};render();toast(`${fmt(total)} units recorded. Balance updated.`);
    }else if(type==='department'){
      assert(canAdmin(),'Only an admin can manage departments.');const name=data.name.trim(),code=data.code.trim().toUpperCase();assert(name.length>=2&&code.length>=2,'Enter a department name and code.');const old=db.departments.find(d=>d.id===ui.modal?.id);assert(!db.departments.some(d=>d.code.toUpperCase()===code&&d.id!==old?.id),'Department code already exists.');if(old){Object.assign(old,{name,code,description:data.description.trim()})}else{db.departments.push({id:id('dept'),name,code,description:data.description.trim(),active:true})}addAudit(`${old?'Updated':'Created'} department ${name}`);save();ui.modal=null;ui.form={};render();toast(old?'Department updated.':'Department created successfully.');
    }else if(type==='item'){
      assert(canAdmin()||ui.role==='store','Permission required.');const name=data.name.trim(),sku=data.sku.trim().toUpperCase(),minimum=confirmInt(data.minimum,0);assert(name.length>=3&&sku.length>=2&&data.category.trim(),'Complete the item details.');const old=db.items.find(i=>i.id===ui.modal?.id);assert(!db.items.some(i=>i.sku.toUpperCase()===sku&&i.id!==old?.id),'SKU already exists.');const depts=[...form.querySelectorAll('[name="depts"]:checked')].map(x=>x.value);assert(depts.length,'Map the item to at least one department.');const props={name,sku,category:data.category.trim(),unit:data.unit,minimum,depts};if(old)Object.assign(old,props);else db.items.push({id:id('item'),...props});addAudit(`${old?'Updated':'Created'} catalogue item ${name}`);save();ui.modal=null;ui.form={};render();toast(old?'Catalogue item updated.':'New item added.');
    }else if(type==='staff'){
      assert(canAdmin(),'Only an admin can manage staff.');const name=data.name.trim();assert(name.length>=2,'Enter a full name.');assert(ROLE_INFO[data.role],'Invalid role.');const department=data.role==='staff'?data.department:null;assert(data.role!=='staff'||db.departments.some(d=>d.id===department&&d.active),'Choose a valid department.');assert(!ui.modal?.loadingPhoto,'Please wait for the photo preview.');const staff={id:id('staff'),name,role:data.role,department,active:true};if(ui.modal?.photo)staff.photo=ui.modal.photo;db.staff.push(staff);addAudit(`Added preview staff member ${name}`);try{save()}catch{db.staff.pop();db.audit.shift();throw Error('Browser storage is full. Staff record could not be saved.')}ui.modal=null;ui.form={};render();toast('Preview staff profile added.');
    }else if(type==='request'){
      assert(ui.role!=='head','This role is read-only.');const to=ui.role==='staff'?ui.dept:data.to;assert(db.departments.some(d=>d.id===to&&d.active),'Choose an active department.');assert(db.items.some(i=>i.id===data.itemId&&i.depts.includes(to)),'Item is not mapped to this department.');const qty=confirmInt(data.qty,1);const req={id:id('REQ').toUpperCase(),itemId:data.itemId,qty,from:'store',to,status:db.preferences.requestApproval?'pending':'approved',created:TODAY,actor:currentName(),note:data.note.trim()};db.requests.unshift(req);addAudit(`Created supply request ${req.id} for ${deptBy(to)}`);save();ui.modal=null;ui.form={};render();toast('Stock request submitted.');
    }else if(type==='return'){
      assert(ui.role!=='head','This role is read-only.');const from=ui.role==='staff'?ui.dept:data.from;const b=db.batches.find(x=>x.id===data.batchId);const qty=confirmInt(data.qty,1);assert(b&&b.itemId===data.itemId&&b.location===from&&b.qty>=qty&&b.status==='available','Batch does not have sufficient stock.');db.returns.unshift({id:id('RET').toUpperCase(),from,to:'store',itemId:data.itemId,batchId:b.id,lot:b.lot,qty,condition:data.condition==='damaged'?'damaged':'good',note:data.note.trim(),status:'pending',created:TODAY,actor:currentName()});addAudit(`Submitted return of ${qty} ${itemBy(data.itemId).unit} from ${deptBy(from)}`);save();ui.modal=null;ui.form={};render();toast('Return submitted for store review.');
    }else if(type==='check'){
      assert(ui.role!=='head','This role is read-only.');const loc=ui.role==='staff'?ui.dept:data.location;assert(accessibleLocations().includes(loc),'Invalid location.');const counted=confirmInt(data.counted,0),expected=qtyAt(loc,data.itemId);assert(db.items.some(i=>i.id===data.itemId),'Choose a valid item.');assert(data.note.trim(),'Reason is required.');if(counted===expected){ui.modal=null;ui.form={};render();toast('Physical count matches the system balance.');return}db.checks.unshift({id:id('CHK').toUpperCase(),location:loc,itemId:data.itemId,counted,expected,note:data.note.trim(),status:'pending',date:TODAY,actor:currentName()});addAudit(`Submitted stock verification for ${itemBy(data.itemId).name} at ${deptBy(loc)}`);save();ui.modal=null;ui.form={};render();toast('Difference submitted for approval.');
    }else if(type==='settings'){
      assert(canAdmin(),'Only an admin can change hospital settings.');assert(data.hospital.trim().length>=3,'Enter a hospital name.');db.hospital=data.hospital.trim();const expiry=confirmInt(data.expiryDays,1);assert(expiry<=365,'Expiry window must be 365 days or less.');db.preferences.expiryDays=expiry;addAudit('Updated hospital profile and expiry alert window');save();render();toast('Hospital settings saved.');
    }
  }
  function exportCSV(filename,rows){const content=rows.map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');const blob=new Blob(['\ufeff',content],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500)}
  function listPage(records){
    const size=25,total=Math.max(1,Math.ceil(records.length/size));
    const page=Math.max(1,Math.min(ui.listIndex||1,total));
    const start=(page-1)*size;
    const control=(label,target)=>button(label,'list-page','btn-outline btn-sm',`data-id="${target}"`);
    const controls=total===1?'':`<nav class="list-pagination" aria-label="Record pages">${page>1?control('Previous',page-1):''}<span>${start+1}–${Math.min(start+size,records.length)} of ${fmt(records.length)}</span>${page<total?control('Next',page+1):''}</nav>`;
    return {rows:records.slice(start,start+size),controls};
  }
  function actionClick(el){const action=el.dataset.action,idv=el.dataset.id;try{
    if(action==='list-page'){ui.listIndex=Number(idv);render();window.scrollTo(0,0);return}
    if(['navigate','sign-out'].includes(action))ui.listIndex=1;
    if(action==='open-workspace'||action==='open-control'){ui.screen='login';ui.role=null;ui.loginId='';ui.identity=null;ui.mode=action==='open-control'?'control':'workspace';ui.loginType='staff';ui.loginError='';ui.loginShowPassword=false;ui.loginShowDemo=false;ui.modal=null;ui.form={};render();window.scrollTo(0,0);return}
    if(action==='go-home'&&window.location?.pathname!=='/'&&window.location){window.location.assign('/');return}
    if(action==='go-home'){ui.screen='landing';ui.modal=null;render();window.scrollTo(0,0);return}
    if(action==='sign-out'){ui.role=null;ui.loginId='';ui.identity=null;ui.screen='login';ui.page='overview';ui.loginType='staff';ui.loginShowPassword=false;ui.loginShowDemo=false;ui.loginError='';ui.modal=null;ui.mobileMenu=false;ui.sidebarCollapsed=false;render();window.scrollTo(0,0);return}
    if(action==='toggle-password'){const field=document.getElementById('login-password');if(!field)return;ui.loginShowPassword=!ui.loginShowPassword;field.type=ui.loginShowPassword?'text':'password';el.setAttribute('aria-label',ui.loginShowPassword?'Hide password':'Show password');return}
    if(action==='toggle-demo'){ui.loginShowDemo=!ui.loginShowDemo;document.querySelector('.login-demo-options')?.classList.toggle('hidden',!ui.loginShowDemo);el.setAttribute('aria-expanded',String(ui.loginShowDemo));el.innerHTML=`${icon('spark','sm')} ${ui.loginShowDemo?'Hide':'Try'} demo credentials`;return}
    if(action==='trend-range'){if(['7d','30d','12m'].includes(el.dataset.range)){ui.trendRange=el.dataset.range;render()}return}
    if(action==='demo-fill'){const account=DEMO_ACCOUNTS.find(a=>a.key===el.dataset.role&&a.portal===ui.mode);if(!account)return;const email=document.getElementById('login-email'),password=document.getElementById('login-password');if(email)email.value=account.email;if(password)password.value='Optivus123';if(ui.mode==='workspace'){ui.loginType=account.key;const selector=document.getElementById('login-type');if(selector)selector.value=ui.loginType}if(ui.loginShowDemo)document.querySelector('[data-action="toggle-demo"]')?.click();email?.focus({preventScroll:true});return}
    if(action==='forgot-password'){toast('Demo only: password reset is not connected. Open demo credentials below.');return}
    if(action==='close-menu'){ui.mobileMenu=false;render();return}
    if(action==='toggle-menu'){ui.mobileMenu=!ui.mobileMenu;render();return}
    if(action==='toggle-sidebar'){ui.sidebarCollapsed=!ui.sidebarCollapsed;ui.mobileMenu=!ui.sidebarCollapsed;render();return}
    if(action==='close-modal'||action==='close-backdrop'){ui.modal=null;ui.form={};render();return}
    if(action==='view-item'){
      const item=db.items.find(i=>i.id===idv);
      assert(ui.screen==='app'&&item,'Item unavailable.');
      assert(ui.role!=='staff'||item.depts.includes(ui.dept)||qtyAt(ui.dept,item.id)>0,'This item is outside your department.');
      ui.modal={type:'view-item',id:idv};render();return;
    }
    if(action==='view-department'){
      assert(ui.screen==='app'&&canControl(),'Management access required.');
      assert(db.departments.some(d=>d.id===idv),'Department not found.');
      ui.modal={type:'view-department',id:idv};render();return;
    }
    if(action==='view-staff'){
      assert(ui.screen==='app'&&canControl(),'Management access required.');
      assert(db.staff.some(s=>s.id===idv),'Staff record not found.');
      ui.modal={type:'view-staff',id:idv};render();return;
    }
    if(action==='navigate'){setPage(ui.mode,el.dataset.page);return}
    if(action==='quick-route'){setPage(ui.mode,el.dataset.route==='control'?'overview':el.dataset.route);return}
    if(action==='switch-workspace-requests'){setPage(ui.mode,ui.mode==='control'?'approvals':'requests');return}
    if(action==='switch-workspace-inventory'){setPage(ui.mode,ui.mode==='control'?'reports':'inventory');return}
    if(action==='go-receive'){setPage('workspace','receive');return}
    if(action==='filter'){ui.filter=el.dataset.filter;render();return}
    if(action.startsWith('modal-')){if(action==='modal-department'||action==='modal-staff')assert(canAdmin(),'Hospital Admin access required.');ui.modal={type:action.slice(6)};ui.form={};render();return}
    if(action==='edit-department'){ui.modal={type:'department',id:idv};ui.form={};render();return}
    if(action==='edit-item'){ui.modal={type:'item',id:idv};ui.form={};render();return}
    if(action==='toggle-department'){assert(canAdmin(),'Admin only.');const d=db.departments.find(x=>x.id===idv);assert(d,'Department not found.');if(d.active)assert(!validBatches(d.id).length,'Move or reconcile department stock before deactivating.');d.active=!d.active;addAudit(`${d.active?'Activated':'Deactivated'} department ${d.name}`);save();render();toast('Department status updated.');return}
    if(action==='toggle-staff'){assert(canAdmin(),'Admin only.');const s=db.staff.find(x=>x.id===idv);assert(s,'Staff record not found.');s.active=!s.active;addAudit(`${s.active?'Activated':'Deactivated'} preview staff member ${s.name}`);save();render();toast('Staff status updated.');return}
    if(action==='approve-request'){assert(canManage(),'Store permission required.');const r=db.requests.find(x=>x.id===idv);assert(r&&r.status==='pending','Request already processed.');r.status='approved';addAudit(`Approved request ${r.id}`);save();render();toast('Request approved. Ready for fulfilment.');return}
    if(action==='decline-request'){assert(canManage(),'Store permission required.');const r=db.requests.find(x=>x.id===idv);assert(r&&r.status==='pending','Only pending requests can be declined.');r.status='declined';addAudit(`Declined request ${r.id}`);save();render();toast('Request declined.');return}
    if(action==='fulfil-request'){fulfilRequest(db.requests.find(x=>x.id===idv));return}
    if(action==='accept-return'){acceptReturn(db.returns.find(x=>x.id===idv));return}
    if(action==='reject-return'){assert(canManage(),'Store permission required.');const r=db.returns.find(x=>x.id===idv);assert(r&&r.status==='pending','Return already processed.');r.status='rejected';addAudit(`Rejected return ${r.id}`);save();render();toast('Return rejected.');return}
    if(action==='approve-check'){approveCheck(db.checks.find(x=>x.id===idv));return}
    if(action==='reject-check'){assert(canAdmin(),'Admin approval required.');const c=db.checks.find(x=>x.id===idv);assert(c&&c.status==='pending','Check already processed.');c.status='rejected';addAudit(`Rejected stock verification ${c.id}`);save();render();toast('Verification rejected.');return}
    if(action==='confirm-reset'){assert(canAdmin(),'Admin only.');db=expandHospital(seedDB());save();ui.modal=null;ui.form={};ui.reportDate=TODAY;setPage('control','overview');toast('Demo inventory reset to original sample data.');return}
    if(action==='export-report'){const loc=ui.role==='staff'?ui.dept:formVal('location','all'),rows=reportRows(ui.reportDate,loc);exportCSV(`optivus-report-${ui.reportDate}.csv`,[['Item','SKU','Location','Unit','Opening','Inward','Outward','Used','Wasted','Adjustment','Closing'],...rows.map(r=>[r.item.name,r.item.sku,deptBy(r.location),r.item.unit,r.opening,r.inward,r.outward,r.used,r.wasted,r.adjustment,r.closing])]);toast('Daily report exported.');return}
    if(action==='export-activity'){const tx=db.transactions.filter(t=>ui.role!=='staff'||t.from===ui.dept||t.to===ui.dept);exportCSV(`optivus-activity-${TODAY}.csv`,[['Reference','Date','Time','Type','Item','Quantity','From','To','Actor','Note'],...tx.map(t=>[t.id,t.date,t.time,t.type,itemBy(t.itemId).name,t.qty,deptBy(t.from),deptBy(t.to),t.actor,t.note])]);toast('Activity exported.');return}
    if(action==='counter'){const input=document.querySelector(`[name="${el.dataset.key}"]`);if(input){const n=Math.max(0,(Number(input.value)||0)+Number(el.dataset.delta));input.value=n;input.dispatchEvent(new Event('input',{bubbles:true}))}return}
  }catch(err){toast(err.message||'Unable to complete action.',true)}}
  document.addEventListener('click',e=>{if(e.target.classList?.contains('modal-backdrop')){ui.modal=null;ui.form={};render();return}const el=e.target.closest('[data-action]');if(el){if(el.dataset.action==='close-backdrop')return;e.preventDefault();actionClick(el)}});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&ui.screen==='login'&&ui.loginShowDemo){
      const toggle=document.querySelector('[data-action="toggle-demo"]');
      toggle?.click();toggle?.focus({preventScroll:true});
    }
  });
  document.addEventListener('submit',e=>{if(e.target.matches('form')){e.preventDefault();if(e.target.id==='demo-request'){sendDemoRequest(e.target);return}try{doSubmit(e.target)}catch(err){const message=err.message||'Please check form values.';if(e.target.id==='login-form'){ui.loginError=message;e.target.querySelector('.login-error')?.remove();e.target.insertAdjacentHTML('beforeend',`<div class="login-error" role="alert">${icon('alert','sm')} ${escapeHTML(message)}</div>`)}else toast(message,true)}}});
  async function readStaffPhoto(input){
    const draft=ui.modal;
    if(draft?.type!=='staff')return;
    const file=input.files[0];
    const request=Symbol();
    draft.photoRequest=request;
    draft.loadingPhoto=Boolean(file);
    delete draft.photo;
    const preview=()=>document.getElementById('staff-preview');
    preview().hidden=true;
    if(!file)return;
    let url;
    try{
      assert(['image/jpeg','image/png','image/webp'].includes(file.type)&&file.size<=5*1024*1024,'Choose a JPG, PNG or WebP image up to 5 MB.');
      url=URL.createObjectURL(file);
      const img=new Image();img.src=url;await img.decode();
      if(ui.modal!==draft||draft.photoRequest!==request)return;
      const side=Math.min(img.naturalWidth,img.naturalHeight);
      const canvas=document.createElement('canvas');canvas.width=canvas.height=224;
      const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,224,224);
      ctx.drawImage(img,(img.naturalWidth-side)/2,(img.naturalHeight-side)/2,side,side,0,0,224,224);
      draft.photo=canvas.toDataURL('image/jpeg',0.84);
      preview().src=draft.photo;preview().hidden=false;
    }catch(err){
      if(ui.modal===draft&&draft.photoRequest===request){input.value='';toast(err.message||'Could not open this image.',true)}
    }finally{
      if(url)URL.revokeObjectURL(url);
      if(draft.photoRequest===request)draft.loadingPhoto=false;
    }
  }
  document.addEventListener('change',e=>{const t=e.target;if(t.id==='staff-photo'){readStaffPhoto(t);return}if(t.id==='login-type'){ui.loginType=t.value;return}if(t.id==='report-date'){ui.reportDate=t.value||TODAY;render();return}if(t.id==='report-location'){ui.form.location=t.value;render();return}if(t.dataset.pref){if(!canAdmin())return;db.preferences[t.dataset.pref]=t.checked;addAudit(`Changed policy: ${t.dataset.pref} = ${t.checked}`);save();toast('Preference updated.');return}if(t.dataset.refresh){const form=t.closest('form');captureForm(form);if(t.name==='location'||t.name==='to'||t.name==='from'){delete ui.form.itemId;delete ui.form.batchId}if(t.name==='itemId')delete ui.form.batchId;render()}});
  document.addEventListener('input',e=>{const t=e.target;if(t.matches('[data-search]')){ui.search=t.value;document.querySelectorAll('[data-search-row]').forEach(row=>row.hidden=!row.dataset.searchRow.includes(t.value.toLowerCase().trim()));return}if(t.name==='used'||t.name==='wasted'){const used=Number(document.querySelector('[name="used"]')?.value||0),wasted=Number(document.querySelector('[name="wasted"]')?.value||0);const total=document.querySelector('[data-usage-total]');if(total)total.textContent=fmt(Math.max(0,used+wasted))+' units'}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ui.modal){ui.modal=null;ui.form={};render()}});
  async function sendDemoRequest(form){
    const submit=form.querySelector('[type="submit"]'), status=form.querySelector('.request-status');
    if(submit.disabled)return;
    submit.disabled=true;status.textContent='Sending request…';
    const fields=Object.fromEntries(new FormData(form));
    const signature=JSON.stringify(fields);
    if(form.dataset.signature!==signature){
      form.dataset.signature=signature;
      form.dataset.requestId=crypto.randomUUID();
    }
    try{
      const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,id:form.dataset.requestId})});
      const result=await response.json();
      if(!response.ok || result.message!=='Sent'){
        status.textContent=result.message||'We could not confirm submission. Please try again.';
        return;
      }
      form.reset();
      delete form.dataset.signature;
      status.textContent='Thank you. Your demo request has been sent to the OPTIVUS team.';
    }catch{
      status.textContent='We could not confirm submission. Check your connection and try again.';
    }
    finally{submit.disabled=false}
  }
  document.addEventListener('click',event=>{
    const view=event.target.closest('[data-view]');
    if(view){
      document.querySelectorAll('[data-view]').forEach(el=>el.setAttribute('aria-pressed',String(el===view)));
      document.getElementById('product-panel').innerHTML=previewContent(view.dataset.view);
    }
    if(event.target.closest('.mobile-links a'))document.querySelector('.mobile-links').open=false;
  });
  document.addEventListener('keydown',event=>{
    const menu=document.querySelector?.('.mobile-links[open]');
    if(event.key==='Escape'&&menu){menu.open=false;menu.querySelector('summary').focus()}
  });
  const initialPortal=window.location?.pathname.replace(/^\/|\/$/g,'');
  if(['workspace','control'].includes(initialPortal)){ui.screen='login';ui.mode=initialPortal}
  render();
})();
