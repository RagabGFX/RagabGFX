const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const nav=document.querySelector(".nav");
let last=0;
window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  document.body.classList.toggle("scrolling",y>40);
  last=y;
},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"})}
  });
});

// Subtle image parallax: the sections remain visually connected while scrolling.
const frames=[...document.querySelectorAll(".image-frame")];
let ticking=false;
function parallax(){
  const vh=innerHeight;
  frames.forEach(frame=>{
    const r=frame.getBoundingClientRect();
    if(r.bottom>-100 && r.top<vh+100){
      const amount=(r.top+ r.height/2-vh/2)*Number(frame.dataset.speed||.08);
      frame.style.setProperty("--py",`${amount}px`);
      frame.style.transform=`translate3d(0,${amount}px,0)`;
    }
  });
  ticking=false;
}
window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true}},{passive:true});
parallax();

if(matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".magnetic").forEach(el=>{
    el.addEventListener("mousemove",e=>{
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.14,y=(e.clientY-r.top-r.height/2)*.14;
      el.style.transform=`translate(${x}px,${y}px)`;
    });
    el.addEventListener("mouseleave",()=>el.style.transform="");
  });
}
