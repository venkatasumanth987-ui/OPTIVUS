const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const src = fs.readFileSync(path.join(__dirname, '../public/app.js'), 'utf8');
const anchor = '  render();\n})();';
assert(src.endsWith(anchor + '\n') || src.endsWith(anchor), 'Unexpected application entrypoint');
const instrumented = src.replace(anchor,
  '  globalThis.testApi={ui,db,DEMO_ACCOUNTS,doSubmit,actionClick,modal,landing,loginPage,appShell,trendChart,controlOverview,departmentsPage,inventoryPage,cataloguePage,staffPage,reportsPage,verificationPage,returnsPage,requestsPage,usagePage};\n' + anchor);

const app = { innerHTML: '' };
const document = {
  getElementById: (id) => id === 'app' ? app : { innerHTML: '' },
  querySelectorAll: () => [],
  addEventListener: () => {},
  body: { insertAdjacentHTML: () => {} },
  title: '',
};
const storage = new Map();
const context = {
  document,
  localStorage: { getItem: key => storage.get(key) || null, setItem: (key,value) => storage.set(key,value) },
  window: { scrollTo: () => {} },
  FormData: class { constructor(form) { this.form = form; } entries() { return Object.entries(this.form.values); } },
  setTimeout: () => {},
  clearTimeout: () => {},
};
vm.runInNewContext(instrumented, context, { filename: 'app.js' });
const { ui, doSubmit, loginPage, appShell, trendChart } = context.testApi;
const click = (action,id) => context.testApi.actionClick({ dataset:{action,id} });

const controlLoginHtml = (() => { ui.mode='control'; return loginPage(); })();
assert(controlLoginHtml.includes('Clarity across<br>every department.'),'Control photo should have leadership copy');
assert(controlLoginHtml.includes('login-visual-footer'),'Control photo should have a branded caption');
assert(controlLoginHtml.includes('Back to OPTIVUS home'),'Back navigation should stay available');
assert(!controlLoginHtml.includes('login-brand-divider'),'Control login must not show the header divider');
assert(!controlLoginHtml.includes('login-hospital-mark'),'Control login must not show the hospital icon or portal label');
assert(!controlLoginHtml.includes('Hospital leadership access'),'Control login must not show the leadership badge');
assert(fs.existsSync(path.join(__dirname,'../public/assets/login-control-real.webp')),'Control photo asset must exist');
assert(fs.existsSync(path.join(__dirname,'../public/assets/login-workspace-real.webp')),'Workspace photo asset must exist');
const loginLayoutCSS = fs.readFileSync(path.join(__dirname,'../public/assets/login-fullscreen.css'),'utf8');
const sidebarCollapseCSS = fs.readFileSync(path.join(__dirname,'../public/assets/sidebar-collapse.css'),'utf8');
assert(sidebarCollapseCSS.includes('.sidebar.collapsed') && sidebarCollapseCSS.includes('76px'),'Collapsed sidebar must preserve an icon rail');
assert(sidebarCollapseCSS.includes('linear-gradient(180deg,#082844'),'Icon rail should have the requested blue treatment');
assert(loginLayoutCSS.includes('max-width: 460px; min-height: 60px; margin-inline: auto'),'Brand and form must align on the same grid');
assert(loginLayoutCSS.includes('grid-template-columns: minmax(0,46%) minmax(0,54%)'),'Desktop login should devote more space to the hospital photography');
assert(loginLayoutCSS.includes('white-space: nowrap'),'Back-to-home label must not break onto two lines');
assert(loginLayoutCSS.includes('.login-fields { gap: 19px; }'),'Login controls must have consistent spacing');

const home = context.testApi.landing();
assert(home.includes('Hospital Consumables &amp; Procurement Intelligence'),'Brand lockup should show the new tagline');
assert(!home.includes('hero-glass')&&!home.includes('Inventory Pulse'),'Homepage demo overlay must be removed');
assert(home.includes('Enter Workspace')&&home.includes('Open Control'),'Homepage entry actions must remain');

ui.mode = 'workspace';
ui.screen = 'login';
assert(loginPage().includes('Every shift.<br>Fully supplied.'),'Workspace photo should have employee copy');
assert(!loginPage().includes('login-brand-divider'),'Workspace login must not show the header divider');
assert(!loginPage().includes('login-hospital-mark'),'Workspace login must not show the hospital icon or portal label');
const loginTypes = [...loginPage().matchAll(/<option value="(staff|store|nurse|ward|lab|ot)"/g)];
assert.equal(loginTypes.length, 6, 'Workspace should show six login types');

function signIn(email,loginType,mode='workspace') {
  ui.mode = mode;
  ui.screen = 'login';
  doSubmit({ id:'login-form', values:{ email,loginType,password:'Optivus123' } });
  assert.equal(ui.screen, 'app');
}

signIn('lab@optivus.demo','lab');
assert.equal(ui.role, 'staff');
assert.equal(ui.dept, 'lab', 'Lab staff must only see their department');
assert(appShell().includes('Asha Nair'));
assert(appShell().includes('lab@optivus.demo'));
assert(appShell().includes('data-action="toggle-sidebar"'),'Both portals need a clickable sidebar brand');
assert(appShell().includes('aria-label="Inventory"'),'Navigation icons must keep accessible names');
click('toggle-sidebar');
assert(ui.sidebarCollapsed,'The brand button should collapse the sidebar');
assert(appShell().includes('sidebar-compact'),'Collapsed sidebar must expose an icon-only layout state');
assert(appShell().includes('aria-expanded="false"'),'Collapsed logo should advertise its state');
click('toggle-sidebar');
assert(!ui.sidebarCollapsed,'Clicking the brand again should restore the full menu');
assert(!appShell().includes('side-hospital'), 'Removed hospital card must stay removed');
assert(!appShell().includes('DESIGNATION'), 'Uppercase designation label must stay removed');

for (const [range,expected] of [['7d',7],['30d',30],['12m',12]]) {
  ui.trendRange = range;
  const chart = trendChart();
  assert.equal((chart.match(/class="trend-column"/g) || []).length,expected,`${range} chart bucket count`);
  assert.equal((chart.match(/class="trend-bar"/g) || []).length,expected,`Staff chart should show one bar per ${range} bucket`);
  assert(chart.includes('trend-y-axis'),`${range} chart must include a numbered y-axis`);
  assert(chart.includes('--bar-color:'),`${range} chart must use a color scale`);
  assert(chart.includes('Recorded consumption'));
}

assert(context.testApi.inventoryPage().includes('data-action="view-item"'),'Inventory item names should open details');
click('view-item','gloves');
assert.equal(ui.modal.type,'view-item');
const labItemDetail = context.testApi.modal();
assert(labItemDetail.includes('Batch and expiry details'));
assert(labItemDetail.includes('Laboratory'));
assert(!labItemDetail.includes('<td>Central Store</td>'),'Staff must not see central store batch data');
click('close-modal');

for (const view of ['cataloguePage','staffPage','reportsPage','verificationPage','returnsPage','usagePage']) {
  assert(!context.testApi[view]().includes('mini-help'),`${view} should not render explanatory banners`);
}

signIn('head@optivus.demo','', 'control');
assert.equal(ui.role,'head');
click('toggle-sidebar');
assert(appShell().includes('sidebar-compact'),'Control should use the same collapsible sidebar');
click('toggle-sidebar');
assert(appShell().includes('N Lakshmi Sowmika'));
assert(appShell().includes('Hospital Head / Superintendent'));
assert(!context.testApi.controlOverview().includes('data-action="modal-department"'),'Head should not see Add Department action');
assert(context.testApi.controlOverview().includes('data-action="view-department"'),'Department summary tiles should be clickable');
assert(context.testApi.departmentsPage().includes('class="dept-card-open"'),'Department cards should open detail views');
assert(context.testApi.cataloguePage().includes('data-action="view-item"'),'Catalogue item names should be clickable');
assert(context.testApi.reportsPage().includes('data-action="view-item"'),'Report item names should be clickable');
assert(context.testApi.staffPage().includes('data-action="view-staff"'),'Staff names should be clickable');
ui.trendRange = '7d';
const headChart = trendChart();
assert((headChart.match(/class="trend-bar"/g) || []).length > 7,'Head should see grouped multi-colour departmental bars');
assert.equal((headChart.match(/trend-bar-total/g) || []).length,0,'Chart should show department series only');
assert((headChart.match(/--bar-color:/g) || []).length > 7);
click('view-department','icu');
assert(context.testApi.modal().includes('Department stock'));
click('view-staff','staff-1');
assert(context.testApi.modal().includes('Staff ID'));
assert(context.testApi.modal().includes('K Krishna Priya'));

signIn('admin@optivus.demo','', 'control');
assert(context.testApi.controlOverview().includes('data-action="modal-department"'),'Hospital Admin must be able to add departments from Command Center');
assert(context.testApi.departmentsPage().includes('data-action="modal-department"'),'Hospital Admin must be able to add departments from Departments');
click('modal-department');
assert(context.testApi.modal().includes('Create Department'));

console.log('OPTIVUS smoke checks passed: login scopes, detailed entities, department admin access, multicolour chart and y-axis.');
