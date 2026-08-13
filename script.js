const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
function cursorLoop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(cursorLoop)}cursorLoop();
document.querySelectorAll('a').forEach(a=>{a.addEventListener('mouseenter',()=>{if(ring){ring.style.width='48px';ring.style.height='48px'}});a.addEventListener('mouseleave',()=>{if(ring){ring.style.width='32px';ring.style.height='32px'}})});
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const hero=document.querySelector('.hero-image-wrap');
addEventListener('scroll',()=>{if(hero){hero.style.transform=`translate3d(0,${Math.min(scrollY*.06,35)}px,0)`}});
