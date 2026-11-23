import {readdir,readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {extname} from 'node:path';
const mime={'.webp':'image/webp','.svg':'image/svg+xml','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8'};
const assets={};
async function collect(dir){
  for(const file of await readdir('public'+dir,{withFileTypes:true})){
    const key=dir+'/'+file.name;
    if(file.isDirectory())await collect(key);
    else assets[key]=[mime[extname(key)],(await readFile('public'+key)).toString('base64')];
  }
}
await collect('');
// Let standalone tabs fetch the stylesheet matching this release, even with a warm cache.
const cssPath = '/assets/landing-refinement.css';
const revision = createHash('sha256').update(assets[cssPath][1]).digest('hex').slice(0,12);
const html = Buffer.from(assets['/index.html'][1],'base64').toString('utf8');
assets['/index.html'][1] = Buffer.from(html.replace(cssPath, cssPath+'?v='+revision)).toString('base64');
await mkdir('dist/server',{recursive:true});
await mkdir('dist/.openai',{recursive:true});
await copyFile('.openai/hosting.json','dist/.openai/hosting.json');
await writeFile('dist/server/index.js','const publicAssets='+JSON.stringify(assets)+';\n'+await readFile('worker/index.mjs','utf8'));
