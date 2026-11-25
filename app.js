/* RagabGFX v2 — app logic. Data lives in works.js (WORKS, CAT_LABEL). */
(function(){
  "use strict";

  /* ---------- preloader ---------- */
  var pre = document.getElementById("preloader"),
      preCount = document.getElementById("preCount"),
      preBar = document.getElementById("preBar"),
      n = 0;
  var preTimer = setInterval(function(){
    n = Math.min(100, n + Math.ceil(Math.random()*14));
    preCount.textContent = String(n).padStart(3,"0");
    preBar.style.width = n + "%";
    if(n >= 100){
      clearInterval(preTimer);
      setTimeout(function(){ pre.classList.add("is-done"); }, 250);
    }
  }, 90);

  /* ---------- live clock — the VISITOR's local time, not Egypt's ---------- */
  function tickClock(){
    try{
      var now = new Date();
      var t = new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(now);
      var tzPart = new Intl.DateTimeFormat("en-GB",{timeZoneName:"short"}).formatToParts(now).filter(function(p){ return p.type === "timeZoneName"; })[0];
      var tz = tzPart ? tzPart.value : "";
      var c1 = document.getElementById("clock"), c2 = document.getElementById("clock2");
      var l1 = document.getElementById("tzLabel"), l2 = document.getElementById("tzLabel2");
      if(c1) c1.textContent = t;
      if(c2) c2.textContent = t;
      if(l1) l1.textContent = tz;
      if(l2) l2.textContent = tz;
    }catch(e){}
  }
  tickClock(); setInterval(tickClock, 1000);

  /* ---------- ticker: duplicate content for seamless loop ---------- */
  var track = document.getElementById("tickerTrack");
  if(track) track.innerHTML += track.innerHTML;

  /* ---------- work: filters + grid + list ---------- */
  var grid = document.getElementById("workGrid"),
      list = document.getElementById("workList"),
      filtersBox = document.getElementById("filters"),
      countEl = document.getElementById("workCount"),
      currentFilter = "all",
      currentView = "grid",
      PAGE = 12, expanded = false,
      io = ("IntersectionObserver" in window) ? new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, {threshold:.12}) : null;

  function counts(){
    var c = {all: WORKS.length};
    WORKS.forEach(function(w){ c[w.cat] = (c[w.cat]||0) + 1; });
    return c;
  }

  function renderFilters(){
    var c = counts();
    var html = '<button class="filter is-active" data-cat="all" role="tab" aria-selected="true">All <span class="count">[' + c.all + ']</span></button>';
    Object.keys(CAT_LABEL).forEach(function(k){
      html += '<button class="filter" data-cat="' + k + '" role="tab" aria-selected="false">' + CAT_LABEL[k] + ' <span class="count">[' + (c[k]||0) + ']</span></button>';
    });
    filtersBox.innerHTML = html;
    filtersBox.querySelectorAll(".filter").forEach(function(b){
      b.addEventListener("click", function(){
        filtersBox.querySelectorAll(".filter").forEach(function(x){ x.classList.remove("is-active"); x.setAttribute("aria-selected","false"); });
        b.classList.add("is-active"); b.setAttribute("aria-selected","true");
        currentFilter = b.dataset.cat; expanded = false;
        renderWorks();
      });
    });
  }

  function filtered(){
    return currentFilter === "all" ? WORKS : WORKS.filter(function(w){ return w.cat === currentFilter; });
  }

  function cardHTML(w, i){
    return '<article class="work-card" data-i="' + i + '" tabindex="0" role="button" aria-label="' + w.title + ' — ' + w.client + '">' +
      '<span class="work-card__num">[' + String(i+1).padStart(2,"0") + ']</span>' +
      '<img src="' + w.src + '" alt="' + w.title + '" loading="lazy">' +
      '<div class="work-card__holo"><h3>' + w.title + '</h3><div class="cat">' + CAT_LABEL[w.cat] + ' — ' + w.client + '</div><p>' + w.why + '</p></div>' +
      '</article>';
  }

  function renderWorks(){
    var items = filtered();
    var show = (currentFilter === "all" && !expanded) ? items.slice(0, PAGE) : items;
    grid.innerHTML = show.map(cardHTML).join("") +
      ((currentFilter === "all" && !expanded && items.length > PAGE)
        ? '<button class="work-card work-card--more" id="showAll" style="display:flex;align-items:center;justify-content:center;background:var(--ink);color:var(--paper);font-family:var(--font-display);font-size:1.3rem;letter-spacing:.04em;text-transform:uppercase">Explore all ' + items.length + ' ↓</button>'
        : "");
    list.innerHTML = items.map(function(w, i){
      return '<div class="work-row" data-i="' + i + '" tabindex="0" role="button" aria-label="' + w.title + '">' +
        '<span class="work-row__num">[' + String(i+1).padStart(2,"0") + ']</span>' +
        '<span class="work-row__title">' + w.title + '</span>' +
        '<span class="work-row__client">' + w.client + '</span>' +
        '<span class="work-row__cat">' + CAT_LABEL[w.cat] + '</span></div>';
    }).join("");
    countEl.textContent = "Showing " + show.length + " of " + items.length + (currentFilter === "all" ? " selected works" : " in " + CAT_LABEL[currentFilter]);
    grid.querySelectorAll(".work-card").forEach(function(el){
      if(io) io.observe(el); else el.classList.add("is-in");
      el.addEventListener("click", function(){
        if(el.id === "showAll"){ expanded = true; renderWorks(); return; }
        openLightbox(+el.dataset.i);
      });
      el.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); el.click(); } });
    });
    list.querySelectorAll(".work-row").forEach(function(el){
      el.addEventListener("click", function(){ openLightbox(+el.dataset.i); });
      el.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); el.click(); } });
    });
  }

  /* view toggle */
  document.querySelectorAll(".view-toggle__btn").forEach(function(b){
    b.addEventListener("click", function(){
      document.querySelectorAll(".view-toggle__btn").forEach(function(x){ x.classList.remove("is-active"); x.setAttribute("aria-pressed","false"); });
      b.classList.add("is-active"); b.setAttribute("aria-pressed","true");
      currentView = b.dataset.view;
      grid.hidden = currentView !== "grid";
      list.hidden = currentView !== "list";
    });
  });

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox"),
      lbImg = document.getElementById("lbImg"),
      lbTitle = document.getElementById("lbTitle"),
      lbMeta = document.getElementById("lbMeta"),
      lbWhy = document.getElementById("lbWhy"),
      lbIndex = 0;

  function openLightbox(i){
    lbIndex = i;
    var items = filtered();
    var w = items[i];
    lbImg.src = w.src;
    lbImg.alt = w.title;
    lbTitle.textContent = w.title;
    lbMeta.textContent = (i+1) + " / " + items.length + " — " + CAT_LABEL[w.cat] + " · " + w.client;
    lbWhy.textContent = w.why;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox(){ lb.hidden = true; document.body.style.overflow = ""; }
  function step(d){
    var items = filtered();
    lbIndex = (lbIndex + d + items.length) % items.length;
    openLightbox(lbIndex);
  }
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", function(){ step(-1); });
  document.getElementById("lbNext").addEventListener("click", function(){ step(1); });
  lb.addEventListener("click", function(e){ if(e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function(e){
    if(lb.hidden) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowLeft") step(-1);
    if(e.key === "ArrowRight") step(1);
  });

  /* ---------- formation: FIVE-A-SIDE — only what he actually does ---------- */
  var PLAYERS = [
    {num:1,  name:"Photoshop",        role:"Goalkeeper — the last line. Every pixel defended, every cut clean.",        x:50, y:90},
    {num:2,  name:"Identity Systems", role:"Right back — clubs, leagues, tournaments: one visual language.",          x:70, y:66},
    {num:3,  name:"Manipulation",     role:"Left back — reality, rebuilt frame by frame.",                            x:30, y:66},
    {num:10, name:"Matchday Graphics",role:"Captain — fixtures, line-ups, countdowns. Live, every week.",             x:50, y:42, cap:true},
    {num:9,  name:"Hero Posters",     role:"Striker — big players, bigger type. The one that stops the scroll.",       x:50, y:18}
  ];
  var pitch = document.getElementById("pitch"),
      pcNum = document.getElementById("pcNum"),
      pcName = document.getElementById("pcName"),
      pcRole = document.getElementById("pcRole"),
      pcCard = document.getElementById("playerCard");

  PLAYERS.forEach(function(p){
    var el = document.createElement("button");
    el.className = "player" + (p.num === 10 ? " is-active" : "");
    el.style.left = p.x + "%";
    el.style.top = p.y + "%";
    el.setAttribute("aria-label", p.num + " — " + p.name);
    el.innerHTML = '<span class="player__dot">' + p.num + (p.cap ? '<span class="cap">C</span>' : "") + '</span><span class="player__name">' + p.name + '</span>';
    el.addEventListener("click", function(){ selectPlayer(p, el); });
    el.addEventListener("mouseenter", function(){ selectPlayer(p, el); });
    pitch.appendChild(el);
  });
  function selectPlayer(p, el){
    pitch.querySelectorAll(".player").forEach(function(x){ x.classList.remove("is-active"); });
    el.classList.add("is-active");
    pcNum.textContent = p.num;
    pcName.textContent = p.name;
    pcRole.textContent = p.role;
    pcCard.classList.add("is-hot");
    setTimeout(function(){ pcCard.classList.remove("is-hot"); }, 600);
  }

  /* ---------- clients wall ---------- */
  var CLIENTS = [
    ["Serie A","Italy"],["FIFA Club World Cup","Saudi 2023"],["NBA","Basketball"],
    ["Roshn Saudi League","Saudi Arabia"],["Ligue 1","France"],["PIF","Saudi Arabia"],
    ["Saudi Super Cup","Saudi Arabia"],["The Best FIFA","FIFA"],["President's Cup","UAE"],
    ["PIF Saudi International","Golf"],["Al Ettifaq","Saudi Arabia"],["Saudi Founding Day","Saudi Arabia"],
    ["NEOM S.C.","Saudi Arabia"],["Al Jazira","UAE"],["Saudi Archery Federation","Saudi Arabia"],
    ["Dubai Basketball","UAE"],["AFC Asian Cup 2027","Saudi Arabia"]
  ];
  document.getElementById("clientsWall").innerHTML = CLIENTS.map(function(c){
    return "<li><b>" + c[0] + "</b><span>" + c[1] + "</span></li>";
  }).join("");

  /* ---------- process tabs ---------- */
  var STEPS = [
    {t:"Brief in. <em>Nothing lost.</em>", p:"You tell me the match, the moment, the deadline. I ask the questions that save us both a revision — audience, platform, tone, must-haves.", tags:["Match & moment","Platforms","Deadline","Must-haves"]},
    {t:"Concept. <em>One idea, loud.</em>", p:"I sketch the angle before I touch Photoshop: the headline, the composition, the one thing the eye lands on first. No idea, no design.", tags:["Angle","Headline","Composition","Moodboard"]},
    {t:"Design. <em>Built to stop thumbs.</em>", p:"Full build in Photoshop and Illustrator — type, cut-outs, colour, light. Every version sized for its platform, from story to stadium screen.", tags:["Photoshop","Illustrator","Type systems","All sizes"]},
    {t:"Finish. <em>On time, every time.</em>", p:"Final files, named properly, delivered before kick-off — plus the source files and a version for every platform you post on.", tags:["Final files","Source files","All formats","On deadline"]}
  ];
  var panel = document.getElementById("processPanel");
  function renderStep(i){
    var s = STEPS[i];
    panel.innerHTML = '<div class="process__panel-inner"><h3>' + s.t + '</h3><p>' + s.p + '</p><div class="process__tags">' +
      s.tags.map(function(t){ return "<span>" + t + "</span>"; }).join("") + "</div></div>";
    document.querySelectorAll(".process__tab").forEach(function(b, j){
      b.classList.toggle("is-active", j === i);
      b.setAttribute("aria-selected", j === i ? "true" : "false");
    });
  }
  document.querySelectorAll(".process__tab").forEach(function(b){
    b.addEventListener("click", function(){ renderStep(+b.dataset.step); });
  });
  renderStep(0);

  /* ---------- boot ---------- */
  renderFilters();
  renderWorks();
})();
