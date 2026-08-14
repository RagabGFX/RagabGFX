const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
function cursorLoop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(cursorLoop)}cursorLoop();
document.querySelectorAll('a').forEach(a=>{a.addEventListener('mouseenter',()=>{if(ring){ring.style.width='48px';ring.style.height='48px'}});a.addEventListener('mouseleave',()=>{if(ring){ring.style.width='32px';ring.style.height='32px'}})});

// Subtle text interaction: the word under the pointer softens/blurred, restoring the original cursor feel.
const textTargets=document.querySelectorAll('h1,h2,h3,.eyebrow,.hero-text,.section-note,.card-content small,.card-content span,nav a,.brand,.nav-cta,.pill,.hero-meta span,.about-copy p,.contact-row>a,footer span');
textTargets.forEach(el=>{el.classList.add('cursor-blur-target');el.addEventListener('mouseenter',()=>el.classList.add('is-cursor-hover'));el.addEventListener('mouseleave',()=>el.classList.remove('is-cursor-hover'));});
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const hero=document.querySelector('.hero-image-wrap');
addEventListener('scroll',()=>{if(hero){hero.style.transform=`translate3d(0,${Math.min(scrollY*.06,35)}px,0)`}});


/* Ragab's Bot — bilingual, no API, no paid service */
(function(){
  const $=id=>document.getElementById(id);
  const launcher=$('ragabBotLauncher'), win=$('ragabBotWindow'), close=$('ragabBotClose');
  const messages=$('ragabBotMessages'), form=$('ragabBotForm'), input=$('ragabBotInput');
  if(!launcher||!win||!messages||!form) return;

  const links={
    behance:'https://www.behance.net/freenzylas16c4',
    instagram:'https://www.instagram.com/mohamed_ragabgfx/',
    facebook:'https://www.facebook.com/MaDoPH/',
    linkedin:'https://www.linkedin.com/in/mohamed-ragab-648a1a21/b/'
  };

  function clean(s){
    return s.toLowerCase()
      .replace(/[؟?!.,،؛:]/g,' ')
      .replace(/\s+/g,' ').trim();
  }
  function add(text,type='bot',actions=[]){
    const m=document.createElement('div');m.className='ragab-msg '+type;m.innerHTML=text;
    messages.appendChild(m);
    if(actions.length){
      const w=document.createElement('div');w.className='ragab-bot-actions';
      actions.forEach(a=>{
        const b=document.createElement('button');b.textContent=a.label;
        b.onclick=()=>doAction(a.key);w.appendChild(b);
      });
      messages.appendChild(w);
    }
    messages.scrollTop=messages.scrollHeight;
  }
  function doAction(k){
    const openMap={behance:'behance',instagram:'instagram',facebook:'facebook',linkedin:'linkedin'};
    if(openMap[k]){
      const names={behance:'Behance',instagram:'Instagram',facebook:'Facebook',linkedin:'LinkedIn'};
      add('Sure! Here is my '+names[k]+' 👇','bot',[{label:'Open '+names[k],key:'open_'+k}]);
      return;
    }
    if(k.startsWith('open_')){
      window.open(links[k.slice(5)],'_blank','noopener,noreferrer'); return;
    }
    const section={identities:'IDENTITIES',matchdays:'MATCHDAYS',hero:'HERO GRAPHICS'};
    if(section[k]){
      add('Absolutely — here is the '+section[k]+' work 👇','bot',[{label:'View '+section[k],key:'go_'+k}]);
      return;
    }
    if(k==='go_socials'){
      add('You can find me here 👇', 'bot',[
        {label:'Instagram',key:'open_instagram'},
        {label:'Facebook',key:'open_facebook'},
        {label:'LinkedIn',key:'open_linkedin'}
      ]); return;
    }
    if(k==='socials'){
      add('You can find me here 👇','bot',[
        {label:'Instagram',key:'open_instagram'},
        {label:'Facebook',key:'open_facebook'},
        {label:'LinkedIn',key:'open_linkedin'}
      ]); return;
    }
    if(k.startsWith('go_')){
      const target=k.slice(3);
      const hash={identities:'#identities',matchdays:'#matchdays',hero:'#hero-graphics'}[target];
      const el=hash?document.querySelector(hash):null;
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      else if(hash) location.hash=hash;
    }
  }
  function reply(raw){
    const q=clean(raw);
    if(!q) return;

    if(/\b(behance|بيهانس|بيهانس|بهيانس)\b|بيهانس/.test(q)) return doAction('behance');
    if(/\b(instagram|انستجرام|انستغرام|انستا)\b/.test(q)) return doAction('instagram');
    if(/\b(facebook|فيسبوك|فيس بوك|فيس)\b/.test(q)) return doAction('facebook');
    if(/\b(linkedin|linkedin|لينكد ان|لينكدإن|لينكدان)\b/.test(q)) return doAction('linkedin');

    if(/identit|identity|هوي|هويات|الهوية|الهويات/.test(q)) return doAction('identities');
    if(/matchday|match day|ماتش داي|ماتشداي|ماتشات|الماتشات|مباريات/.test(q)) return doAction('matchdays');
    if(/hero graphic|hero graphics|\bhero\b|هيرو|هيروز/.test(q)) return doAction('hero');
    if(/social|سوشيال|سوشيل|السوشيال|حسابات|لينكات/.test(q)) return doAction('socials');

    add('I can help you navigate the portfolio and social links 👋<br><br>Try: <b>“وريني بيهانس”</b> or <b>“show me Behance”</b>.');
  }

  launcher.onclick=()=>{win.classList.toggle('open');win.setAttribute('aria-hidden',!win.classList.contains('open'));if(win.classList.contains('open'))input.focus()};
  close.onclick=()=>{win.classList.remove('open');win.setAttribute('aria-hidden','true')};
  form.onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(!q)return;add(q,'user');input.value='';setTimeout(()=>reply(q),150)};
  document.querySelectorAll('[data-bot-action]').forEach(b=>b.onclick=()=>doAction(b.dataset.botAction));
})();
