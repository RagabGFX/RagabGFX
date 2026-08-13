const cursor=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot');
if(window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('mousemove',e=>{
    cursor.style.opacity=1;dot.style.opacity=1;
    cursor.animate({left:`${e.clientX}px`,top:`${e.clientY}px`},{duration:450,fill:'forwards'});
    dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';
  });
  document.querySelectorAll('a,.project,.magnetic').forEach(el=>{
    el.addEventListener('mouseenter',()=>cursor.classList.add('active'));
    el.addEventListener('mouseleave',()=>cursor.classList.remove('active'));
  });
}
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.12,y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

document.querySelectorAll('.project').forEach((p,i)=>{
  p.addEventListener('click',()=>alert(`Project ${String(i+1).padStart(2,'0')} — later we will replace this with your real project gallery.`));
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});
