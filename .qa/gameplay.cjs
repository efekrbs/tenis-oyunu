const {chromium}=require('C:/Users/befek/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 await page.goto(require('node:url').pathToFileURL(require('node:path').resolve('index.html')).href);
 await page.waitForFunction(()=>!document.getElementById('start').disabled);
 const surfaces=await page.evaluate(()=>{const result=[];for(const key of Object.keys(TOURNAMENTS)){selected=key;startMatch();serve();let returned=false,firstBounce=false,netHeight=0;for(let n=0;n<1200&&phase==='rally';n++){tick(1/120);if(ball.bounces>0)firstBounce=true;if(ball.last===1)returned=true;if(Math.abs(ball.z)<.2)netHeight=ball.y;}result.push({surface:key,returned,firstBounce,points:[...score.points],reason:$('notice-main').textContent,netHeight});}return result;});
 console.log('SURFACES',JSON.stringify(surfaces));
 for(const s of surfaces){assert.equal(s.firstBounce,true,`No bounce on ${s.surface}`);assert.equal(s.returned,true,`AI failed return on ${s.surface}`);assert.equal(s.points.reduce((a,b)=>a+b,0),1);}
 const checks=await page.evaluate(()=>{
 const result={};selected='ao';startMatch();serveAttempt=1;phase='rally';ball.live=true;serviceFault('NET');result.firstFault=serveAttempt===2&&score.points[1]===0;preparePoint(false);phase='rally';ball.live=true;serviceFault('OUT');result.doubleFault=score.points[1]===1&&$('notice-main').textContent==='DOUBLE FAULT';
 startMatch();serve();ball.x=0;ball.y=.5;ball.z=.03;ball.vz=-10;ball.vy=-1;updateBall(.01);result.net=score.points[1]===1&&$('notice-main').textContent==='DOUBLE FAULT'; // service is first fault, then force second
 result.net=phase==='point'&&serveAttempt===2;
 startMatch();serve();ball.serve=false;ball.x=4.8;ball.z=-7;ball.y=R+.001;ball.vy=-3;updateBall(.01);result.out=score.points[1]===1&&$('notice-main').textContent==='OUT';
 startMatch();serve();ball.serve=false;ball.x=0;ball.z=-8;ball.y=R+.001;ball.vy=-3;ball.bounces=1;updateBall(.01);result.doubleBounce=score.points[0]===1;
 startMatch();serve();ball.let=true;ball.x=-2;ball.z=-4;ball.y=R+.001;ball.vy=-3;updateBall(.01);result.let=phase==='point'&&score.points[0]===0&&score.points[1]===0&&serveAttempt===1;
 startMatch();serve();ball.serve=false;ball.crossed=true;ball.last=1;ball.x=0;ball.z=10.6;ball.y=1.2;player.group.position.set(0,0,10.6);keys.add('ArrowLeft');hit(0);result.aimLeft=ball.vx<0;ball.last=1;ball.crossed=true;keys.delete('ArrowLeft');keys.add('ArrowRight');hit(0);result.aimRight=ball.vx>0;keys.clear();return result;});
 console.log('RULES',JSON.stringify(checks));for(const [k,v] of Object.entries(checks))assert.equal(v,true,k);
 await page.evaluate(()=>startMatch());await page.keyboard.press('Space');assert.equal(await page.evaluate(()=>phase),'rally');await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>paused),true);await page.click('#resume');assert.equal(await page.evaluate(()=>paused),false);
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>toMenu());await page.screenshot({path:'.qa/mobile-menu.png'});await page.click('#start');await page.screenshot({path:'.qa/mobile-game.png'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 console.log('PASS: surface physics and AI returns; service faults, double faults, net, out, double bounce, let, directional aim, keyboard serve, pause/resume, mobile layout; offline/no external requests.');
 console.log('ERRORS',JSON.stringify(errors));assert.deepEqual(errors,[]);assert.equal(requests.filter(u=>/^https?:/.test(u)).length,0);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
