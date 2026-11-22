/* ============================================================
   RagabGFX — REBUILD 2026 | rgx-new.js
   Single source of truth for all 44 works.
   Paths are EXACT relative paths from the original repo
   (assets/identities|matchdays|hero-graphics|manipulation).
   Explanations are descriptive of the idea/concept only —
   no invented results, awards or stats.
   ============================================================ */

const WORKS = [
  /* ---------- IDENTITIES (10) ---------- */
  {cat:"identities", src:"assets/identities/kings-cup-13.jpg", title:"King's Cup — Countdown Series", client:"King's Cup", tag:"Campaign",
   why:"A countdown system built to make every day before the final feel bigger — bold numbers, player energy and one visual language carried across the whole series."},
  {cat:"identities", src:"assets/identities/kings-cup-5days.jpg", title:"King's Cup — 5 Days To Go", client:"King's Cup", tag:"Campaign",
   why:"Five days out, the tension is the story. Big type, tight crop and a red-hot frame turn a simple date into a reminder you cannot scroll past."},
  {cat:"identities", src:"assets/identities/kings-cup-oneday.jpg", title:"King's Cup — One Day To Go", client:"King's Cup", tag:"Campaign",
   why:"The last 24 hours before kick-off. The design strips everything back to one message — tomorrow — so the countdown itself becomes the hero."},
  {cat:"identities", src:"assets/identities/afc-elite-countdown.jpg", title:"AFC Champions League Elite — One Day To Go", client:"AFC Champions League Elite", tag:"Campaign",
   why:"Elite football needs an elite frame. A clean, cinematic countdown that lets the competition's scale do the talking, with the date as the punchline."},
  {cat:"identities", src:"assets/identities/saff-jeddah-finals.jpg", title:"AFC Elite — Finals Jeddah 2026", client:"SAFF × AFC", tag:"Campaign",
   why:"A finals identity for Jeddah — the city, the stage and the trophy in one composition, designed to feel like an event poster, not just a post."},
  {cat:"identities", src:"assets/identities/super-cup-countdown.jpg", title:"Saudi Super Cup — 30 Days To Go", client:"Saudi Super Cup", tag:"Campaign",
   why:"Thirty days, one city, one trophy. The countdown is set in Hong Kong, so the visual mixes travel-poster scale with matchday urgency."},
  {cat:"identities", src:"assets/identities/asia-2027-tickets.jpg", title:"AFC Asian Cup Saudi Arabia 2027 — Tickets", client:"AFC Asian Cup 2027", tag:"Campaign", featured:true,
   why:"Tickets as a collectible. The envelope-and-ticket treatment makes buying a seat feel like holding a piece of the tournament — green and black, sharp and premium."},
  {cat:"identities", src:"assets/identities/archery-hawi.jpg", title:"Saudi Archery Federation × Hawi", client:"Saudi Archery × Hawi", tag:"Campaign",
   why:"Archery is focus, stillness and one perfect release. The visual slows everything down to the archer and the target, with the partnership woven in cleanly."},
  {cat:"identities", src:"assets/identities/archery-hawi-2.jpg", title:"Saudi Archery × Hawi — Concept 02", client:"Saudi Archery × Hawi", tag:"Campaign",
   why:"A second take on the same partnership — a different crop and rhythm, exploring how far the identity can stretch without losing its calm, precise core."},
  {cat:"identities", src:"assets/identities/founding-day-story.jpg", title:"Saudi Founding Day — Our Story", client:"Saudi Founding Day", tag:"Campaign",
   why:"A story, not a slogan. Heritage textures and warm, proud tones frame Founding Day as a chapter in a longer story — history told like a matchday."},

  /* ---------- MATCHDAYS (10) ---------- */
  {cat:"matchdays", src:"assets/matchdays/01-al-ahly-vs-palmeiras.webp", title:"Al Ahly vs Palmeiras", client:"Al Ahly", tag:"Matchday",
   why:"Two continents, one night. The graphic sets up the clash like a title fight — both badges, both colours, no noise, just the fixture."},
  {cat:"matchdays", src:"assets/matchdays/02-al-ahly-vs-inter-miami.webp", title:"Al Ahly vs Inter Miami", client:"Al Ahly", tag:"Matchday", featured:true,
   why:"A Club World Cup moment: Al Ahly against Messi's Inter Miami. The manipulation builds a cinematic face-off — scale, smoke and stadium light — so the fixture feels historic before a ball is kicked."},
  {cat:"matchdays", src:"assets/matchdays/03-ettifaq.webp", title:"Ettifaq Matchday", client:"Al Ettifaq", tag:"Matchday",
   why:"A matchday built around identity — Ettifaq's colours and crest lead, the opponent and kick-off sit clean underneath, ready to be read in one second on a phone."},
  {cat:"matchdays", src:"assets/matchdays/04-ligue-1-trophee-des-champions.webp", title:"Trophee des Champions", client:"Ligue 1", tag:"Matchday",
   why:"A trophy on the line deserves a trophy treatment. Gold accents, bold type and a cup-front composition make it feel like a final, not a friendly."},
  {cat:"matchdays", src:"assets/matchdays/05-jordan-vs-algeria.webp", title:"Jordan vs Algeria", client:"International", tag:"Matchday",
   why:"National pride on both sides. Two flags, two identities, one frame — designed to be shared by fans of either team without picking a side."},
  {cat:"matchdays", src:"assets/matchdays/06-matchday.webp", title:"Matchday", client:"Matchday", tag:"Matchday",
   why:"The pure matchday template — fixture, time and tension in a single system that can flex to any two teams and still feel unmistakably RagabGFX."},
  {cat:"matchdays", src:"assets/matchdays/07-neom-vs-al-qadsiah.webp", title:"NEOM vs Al Qadsiah", client:"NEOM S.C.", tag:"Matchday",
   why:"NEOM's futuristic identity meets a league rival. Sharp geometry and clean type keep the focus on the fixture while the club's modern look leads."},
  {cat:"matchdays", src:"assets/matchdays/08-saudi-vs-uruguay.webp", title:"Saudi Arabia vs Uruguay", client:"Saudi National Team", tag:"Matchday",
   why:"Green against sky blue, Asia against South America. The design plays the colour clash up front — a friendly that looks like a World Cup night."},
  {cat:"matchdays", src:"assets/matchdays/09-psg-vs-marseille.webp", title:"PSG vs Marseille", client:"Ligue 1", tag:"Matchday",
   why:"Le Classique — France's biggest rivalry. The visual leans into the heat of it: dark, dramatic, and built around the two clubs' identities colliding."},
  {cat:"matchdays", src:"assets/matchdays/10-wijnaldum.webp", title:"Wijnaldum — To the Final", client:"Al Ettifaq", tag:"Matchday",
   why:"One player, one road to the final. Wijnaldum is isolated as the hero, with the road-ahead energy of a knockout run behind him."},

  /* ---------- HERO GRAPHICS (10) ---------- */
  {cat:"hero-graphics", src:"assets/hero-graphics/01-saudi-league.webp", title:"Saudi League", client:"Roshn Saudi League", tag:"Hero Graphic",
   why:"The league as a stage. Big players, bigger type, and the Roshn identity front and centre — a hero graphic made to stop the feed."},
  {cat:"hero-graphics", src:"assets/hero-graphics/02-basketball.webp", title:"Dubai Basketball", client:"Dubai Basketball", tag:"Hero Graphic",
   why:"Basketball moves differently — faster, higher, louder. The graphic uses vertical energy and a sharp MVP-style frame to match the sport's pace."},
  {cat:"hero-graphics", src:"assets/hero-graphics/03-neom-vs-alhilal.webp", title:"NEOM × Al Hilal", client:"NEOM S.C.", tag:"Hero Graphic", featured:true,
   why:"New force against an established giant. NEOM's clean, futuristic look is set against Al Hilal's blue, so the fixture reads as a clash of eras as much as of teams."},
  {cat:"hero-graphics", src:"assets/hero-graphics/04-kings-cup.webp", title:"King's Cup", client:"King's Cup", tag:"Hero Graphic",
   why:"A hero treatment for the cup itself — the trophy as the centre of gravity, with the design built around it like a poster for the whole competition."},
  {cat:"hero-graphics", src:"assets/hero-graphics/05-ligue1-himad.webp", title:"Ligue 1 — Himad Abdelli", client:"Ligue 1", tag:"Hero Graphic",
   why:"A player-first portrait. Abdelli is cut out large and lit like a cover star, with Ligue 1's clean system holding the information around him."},
  {cat:"hero-graphics", src:"assets/hero-graphics/06-ligue1-aguerd.webp", title:"Ligue 1 — Nayef Aguerd", client:"Ligue 1", tag:"Player Graphic",
   why:"Aguerd as a defensive wall — composed, tall and calm in the frame. The graphic gives a centre-back the same star treatment usually saved for scorers."},
  {cat:"hero-graphics", src:"assets/hero-graphics/07-world-cup.webp", title:"World Cup — Spain vs Saudi Arabia", client:"World Cup", tag:"Matchday Graphic",
   why:"The biggest stage of all. Spain against Saudi Arabia is framed like a World Cup poster — flags, scale and a sense of occasion in every corner."},
  {cat:"hero-graphics", src:"assets/hero-graphics/08-mostafa-mohamed.webp", title:"Mostafa Mohamed", client:"Mostafa Mohamed", tag:"Hero Graphic",
   why:"An Egyptian striker, hero-lit. The design puts Mostafa Mohamed front and centre as the story — power, focus and a finish-line stare."},
  {cat:"hero-graphics", src:"assets/hero-graphics/09-aljazira.webp", title:"Al Jazira — To The Final", client:"Al Jazira", tag:"Qualification Graphic",
   why:"To the final — the road ends here. The graphic captures the moment a whole season narrows to one game, with the club's colours carrying the emotion."},
  {cat:"hero-graphics", src:"assets/hero-graphics/10-rsl.webp", title:"Saudi League — RSL", client:"Roshn Saudi League", tag:"Concept Graphic",
   why:"A concept take on the Saudi League — a freer, more experimental composition that explores what the league's visual world could look like."},

  /* ---------- MANIPULATION (14) ---------- */
  {cat:"manipulation", src:"assets/manipulation/al-jazira-training-camp.webp", title:"Al Jazira — Training Camp", client:"Al Jazira", tag:"Photo Manipulation",
   why:"Behind the scenes, made cinematic. Training-ground grit is composited into a poster-like frame, so preparation feels as dramatic as matchday."},
  {cat:"manipulation", src:"assets/manipulation/devil-casemiro.webp", title:"Casemiro — Devil Concept", client:"Casemiro", tag:"Photo Manipulation",
   why:"Casemiro as a devil — the nickname made visual. Dark tones, red light and a horned, menacing cut-out turn a midfielder into a character."},
  {cat:"manipulation", src:"assets/manipulation/kings-cup-countdown.webp", title:"King's Cup — Countdown", client:"King's Cup", tag:"Photo Manipulation",
   why:"A countdown with atmosphere. The cup, the light and the texture are blended into one moody frame, so the wait for the final feels tangible."},
  {cat:"manipulation", src:"assets/manipulation/ligue1-egypt-to-the-final.webp", title:"Ligue 1 — Egypt To The Final", client:"Ligue 1", tag:"Photo Manipulation",
   why:"An Egyptian story inside Ligue 1. The manipulation frames the road to the final through an Egyptian lens — pride, colour and a clear destination."},
  {cat:"manipulation", src:"assets/manipulation/ligue1-nabil-bentaleb-lyon.webp", title:"Nabil Bentaleb — Lyon", client:"Ligue 1", tag:"Photo Manipulation",
   why:"Bentaleb in Lyon colours, composed as a portrait of control. The manipulation keeps him calm and central — a midfielder who dictates the game."},
  {cat:"manipulation", src:"assets/manipulation/ligue1-new-year.webp", title:"Ligue 1 — New Year", client:"Ligue 1", tag:"Photo Manipulation",
   why:"A New Year visual with a football twist — celebration light, fresh energy and a clean slate, built to open the year with a statement."},
  {cat:"manipulation", src:"assets/manipulation/ligue1-saudi-player-ramadan.webp", title:"Ligue 1 — Ramadan", client:"Ligue 1", tag:"Photo Manipulation",
   why:"Ramadan, respectfully lit. Warm light, crescent tones and a calm, reflective mood — a seasonal graphic that honours the moment without shouting."},
  {cat:"manipulation", src:"assets/manipulation/ligue1-yassir-zabiri-rennes.webp", title:"Yassir Zabiri — Rennes", client:"Ligue 1", tag:"Photo Manipulation",
   why:"A young star in Rennes red and black. The manipulation gives Zabiri a bold, rising-star frame — sharp, confident and built for a breakthrough season."},
  {cat:"manipulation", src:"assets/manipulation/onana.webp", title:"Onana — Concept", client:"Onana", tag:"Photo Manipulation",
   why:"A goalkeeper as a concept piece. Onana is framed with dramatic light and space, exploring the lonely, larger-than-life role of the last line."},
  {cat:"manipulation", src:"assets/manipulation/salem-al-dawsari-50-goals.webp", title:"Salem Al-Dawsari — 50 Goals", client:"Saudi National Team", tag:"Photo Manipulation",
   why:"Fifty goals, one icon. The milestone is the headline — Salem is placed like a monument, with the number 50 doing the heavy lifting."},
  {cat:"manipulation", src:"assets/manipulation/saudi-nt-best-saudi-chant.webp", title:"Saudi NT — Best Saudi Chant", client:"Saudi National Team", tag:"Photo Manipulation",
   why:"The chant is the visual. Crowd energy, green flags and a wall of sound are composited into a frame that feels like standing in the stands."},
  {cat:"manipulation", src:"assets/manipulation/saudi-nt-next-mission-atlanta.webp", title:"Saudi NT — Next Mission Atlanta", client:"Saudi National Team", tag:"Photo Manipulation",
   why:"Next mission: Atlanta. The design turns travel into a storyline — a destination, a goal and a team on the move, packed into one poster."},
  {cat:"manipulation", src:"assets/manipulation/neom-vs-al-fateh.webp", title:"NEOM vs Al Fateh", client:"NEOM S.C.", tag:"Photo Manipulation",
   why:"A manipulation-led fixture — NEOM against Al Fateh, composited with depth and light so the match poster feels like a film still."},
  {cat:"manipulation", src:"assets/manipulation/world-football-day.webp", title:"World Football Day", client:"World Football", tag:"Photo Manipulation",
   why:"A celebration of the game itself. The whole world of football — every league, every fan — condensed into one joyful, unifying visual."}
];

const CAT_LABEL = { "matchdays":"Matchdays", "hero-graphics":"Hero Graphics", "identities":"Identities", "manipulation":"Manipulation" };

/* ---------- helpers ---------- */
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const grid = $("#workGrid");
const countLabel = $("#workCount");
let currentFilter = "all";
let visibleWorks = [...WORKS];

/* ---------- render: featured ---------- */
function renderFeatured(){
  const feats = WORKS.filter(w => w.featured);
  $("#featuredGrid").innerHTML = feats.map((w,i)=>`
    <article class="feat reveal in" data-idx="${WORKS.indexOf(w)}" tabindex="0" role="button" aria-label="Open ${w.title}">
      <span class="feat-no">FEATURED <b>0${i+1}</b></span>
      <img src="${w.src}" alt="${w.title}" loading="${i===0?'eager':'lazy'}" decoding="async">
      <div class="feat-cap">
        <span class="chip red">${CAT_LABEL[w.cat]}</span>
        <h3>${w.title}</h3><p>${w.why}</p>
      </div>
    </article>`).join("");
}

/* ---------- render: work grid + hologram cards ---------- */
function cardHTML(w, i){
  const wide = i % 7 === 0 ? " wide" : "";
  return `
  <article class="card${wide} reveal in" data-idx="${WORKS.indexOf(w)}" tabindex="0"
           role="button" aria-label="${w.title} — hover or tap for the story, Enter to open fullscreen">
    <span class="idx">RGX / <b>${String(WORKS.indexOf(w)+1).padStart(2,"0")}</b></span>
    <span class="tap-hint">TAP FOR STORY</span>
    <img class="art" src="${w.src}" alt="${w.title} — ${w.client}" loading="lazy" decoding="async" width="800" height="1000">
    <div class="base">
      <h3>${w.title}</h3>
      <div class="meta"><span class="chip">${CAT_LABEL[w.cat]}</span><span class="chip">${w.client}</span></div>
    </div>
    <div class="holo" aria-hidden="true">
      <div class="hud"><span>◉ HOLO / STORY</span><span class="rec">● REC</span></div>
      <h3>${w.title}</h3>
      <p>${w.why}</p>
      <div class="holo-foot">
        <span class="view-pill">View case ↗</span>
        <span class="scan">${w.client} — ${CAT_LABEL[w.cat].toUpperCase()}</span>
      </div>
    </div>
  </article>`;
}
function renderGrid(){
  visibleWorks = currentFilter === "all" ? [...WORKS] : WORKS.filter(w => w.cat === currentFilter);
  grid.innerHTML = visibleWorks.map((w,i)=>cardHTML(w,i)).join("");
  countLabel.innerHTML = `Showing <b>${visibleWorks.length}</b> / 44 works`;
  $$(".filter-btn").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === currentFilter)));
  bindCards();
}

/* ---------- hologram: tilt + tap toggle ---------- */
function bindCards(){
  $$(".card, .feat").forEach(card=>{
    // tilt on hover (pointer: fine only)
    card.addEventListener("pointermove", e=>{
      if (e.pointerType !== "mouse") return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5, y = (e.clientY - r.top)/r.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-3px)`;
    });
    card.addEventListener("pointerleave", ()=>{ card.style.transform = ""; });
    // tap toggles hologram on touch; click opens lightbox
    let tapped = false;
    card.addEventListener("click", e=>{
      if (window.matchMedia("(hover: none)").matches && !card.classList.contains("is-holo") && card.classList.contains("card")){
        e.stopPropagation();
        $$(".card.is-holo").forEach(c=>c.classList.remove("is-holo"));
        card.classList.add("is-holo"); tapped = true; return;
      }
      openLightbox(+card.dataset.idx);
    });
    card.addEventListener("keydown", e=>{
      if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openLightbox(+card.dataset.idx); }
    });
  });
}

/* ---------- INTRO — branded preloader, max ~1.1s, skippable ---------- */
(function intro(){
  const introEl = document.getElementById("intro");
  if (!introEl) { document.body.classList.remove("loading"); document.body.classList.add("intro-done"); return; }
  let done = false;
  function finish(){
    if (done) return; done = true;
    introEl.classList.add("done");
    document.body.classList.remove("loading");
    document.body.classList.add("intro-done");
    setTimeout(()=>introEl.remove(), 500);
  }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches){ finish(); return; }
  setTimeout(finish, 1100); // bar animation is 1s; never blocks longer
  document.getElementById("introSkip").addEventListener("click", finish);
  introEl.addEventListener("click", e=>{ if (e.target === introEl) finish(); });
  document.addEventListener("keydown", e=>{ if (e.key === "Escape" && !done) finish(); });
})();

/* ---------- TAB INDICATOR — sliding red underline under the active tab ---------- */
const indicator = document.getElementById("tabIndicator");
function moveIndicator(){
  const active = document.querySelector('.filter-btn[aria-pressed="true"]');
  if (!indicator || !active) return;
  indicator.style.left = active.offsetLeft + "px";
  indicator.style.width = active.offsetWidth + "px";
}
addEventListener("resize", moveIndicator);

/* ---------- filters ---------- */
$$(".filter-btn").forEach(b=>b.addEventListener("click", ()=>{
  if (b.dataset.filter === currentFilter) { moveIndicator(); return; }
  currentFilter = b.dataset.filter;
  grid.classList.add("switching");
  setTimeout(()=>{ renderGrid(); grid.classList.remove("switching"); moveIndicator(); }, 220);
}));

/* ---------- lightbox: THAT work, with prev/next ---------- */
const lb = $("#lightbox");
let lbIndex = 0;
function openLightbox(globalIdx){
  // open within the currently visible list, falling back to full list
  const list = visibleWorks.length ? visibleWorks : WORKS;
  lbIndex = Math.max(0, list.findIndex(w => WORKS.indexOf(w) === globalIdx));
  if (lbIndex < 0) lbIndex = 0;
  lb._list = list; renderLb();
  lb.classList.add("open"); document.body.style.overflow = "hidden";
  $("#lbClose").focus();
}
function renderLb(){
  const list = lb._list || WORKS;
  const w = list[lbIndex];
  $("#lbImg").src = w.src; $("#lbImg").alt = w.title + " — " + w.client;
  $("#lbTitle").textContent = w.title;
  $("#lbWhy").textContent = w.why;
  $("#lbChips").innerHTML = `<span class="chip red">${CAT_LABEL[w.cat]}</span><span class="chip">${w.client}</span><span class="chip cyan">${w.tag}</span>`;
  $("#lbCounter").textContent = `${lbIndex+1} / ${list.length}`;
  $("#lbMeta").textContent = `Work ${WORKS.indexOf(w)+1} of 44 — ${CAT_LABEL[w.cat]}`;
}
function stepLb(d){ const list = lb._list || WORKS; lbIndex = (lbIndex + d + list.length) % list.length; renderLb(); }
function closeLb(){ lb.classList.remove("open"); document.body.style.overflow = ""; }
$("#lbClose").addEventListener("click", closeLb);
$("#lbPrev").addEventListener("click", ()=>stepLb(-1));
$("#lbNext").addEventListener("click", ()=>stepLb(1));
lb.addEventListener("click", e=>{ if (e.target === lb) closeLb(); });
document.addEventListener("keydown", e=>{
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowRight") stepLb(1);
  if (e.key === "ArrowLeft") stepLb(-1);
});
// touch swipe in lightbox
let touchX = null;
lb.addEventListener("touchstart", e=>{ touchX = e.touches[0].clientX; }, {passive:true});
lb.addEventListener("touchend", e=>{
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 48) stepLb(dx < 0 ? 1 : -1);
  touchX = null;
}, {passive:true});

/* ---------- nav: hide on scroll down, progress, burger ---------- */
const nav = $("#nav"), progress = $("#progress"), burger = $("#burger"), menu = $("#mobileMenu");
let lastY = 0;
addEventListener("scroll", ()=>{
  const y = scrollY;
  progress.style.width = (y / (document.body.scrollHeight - innerHeight) * 100) + "%";
  if (y > 140 && y > lastY + 4) nav.classList.add("hide"); else nav.classList.remove("hide");
  lastY = y;
}, {passive:true});
burger.addEventListener("click", ()=>{
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});
$$("#mobileMenu a").forEach(a=>a.addEventListener("click", ()=>{
  menu.classList.remove("open"); burger.setAttribute("aria-expanded","false"); document.body.style.overflow = "";
}));

/* ---------- hero parallax (rAF, respects reduced motion) ---------- */
const portrait = $("#heroPortrait");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && portrait){
  let ticking = false;
  addEventListener("scroll", ()=>{
    if (ticking) return; ticking = true;
    requestAnimationFrame(()=>{
      const y = Math.min(scrollY, 600);
      portrait.style.transform = `translateY(${y * .12}px) scale(${1 + y * .00012})`;
      ticking = false;
    });
  }, {passive:true});
}

/* ---------- magnetic Let's Talk ---------- */
$$(".btn-magnetic").forEach(btn=>{
  btn.addEventListener("pointermove", e=>{
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width/2)*.18}px, ${(e.clientY - r.top - r.height/2)*.28}px)`;
  });
  btn.addEventListener("pointerleave", ()=>{ btn.style.transform = ""; });
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
}, {threshold:.12});
$$(".reveal").forEach(el=>io.observe(el));

/* ---------- copy WhatsApp number (keeps its icon) ---------- */
const copyBtn = $("#copyWa");
const copyHTML = copyBtn ? copyBtn.innerHTML : "";
copyBtn?.addEventListener("click", async ()=>{
  const num = "+20 101 602 9558";
  try { await navigator.clipboard.writeText(num); copyBtn.innerHTML = "✓ Copied — " + num; }
  catch { copyBtn.textContent = "WhatsApp: " + num; }
  setTimeout(()=>{ copyBtn.innerHTML = copyHTML; }, 2600);
});

/* ---------- init ---------- */
renderFeatured();
renderGrid();
requestAnimationFrame(moveIndicator);
setTimeout(moveIndicator, 350);
