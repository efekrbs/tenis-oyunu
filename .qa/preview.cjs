const { chromium } = require('C:/Users/befek/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(require('node:url').pathToFileURL(require('node:path').resolve('index.html')).href,{waitUntil:'load'});
await page.waitForFunction(()=>!document.getElementById('start').disabled);
await page.screenshot({path:'.qa/menu.png'});
await page.click('#start');
await page.screenshot({path:'.qa/game.png'});
console.log(JSON.stringify({errors,canvas:await page.locator('canvas').count(),state:await page.evaluate(()=>({phase,surface:surface.name,player:player.group.position.toArray()}))}));
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
