/* RagabGFX v3 — app logic. Data lives in works.js (WORKS, CAT_LABEL). */
(function(){
  "use strict";

  /* ---------- preloader: quick, then reveal the hero ---------- */
  var pre = document.getElementById("preloader"),
      preBar = document.getElementById("preBar");
  var p = 0;
  var preTimer = setInterval(function(){
    p = Math.min(100, p + 34);
    preBar.style.width = p + "%";
    if(p >= 100){
      clearInterval(preTimer);
      setTimeout(function(){
        pre.classList.add("is-done");
        document.body.classList.add("is-ready");
      }, 200);
    }
  }, 120);

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

  /* ---------- scroll progress bar ---------- */
  var progressBar = document.getElementById("progressBar");
  function onScroll(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    progressBar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, {threshold:.12}) : null;
  document.querySelectorAll(".reveal").forEach(function(el){
    if(io) io.observe(el); else el.classList.add("is-in");
  });

  /* ---------- rail + dock: highlight the section in view ---------- */
  var navLinks = document.querySelectorAll("[data-sec]");
  var secIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var id = e.target.id;
      navLinks.forEach(function(a){ a.classList.toggle("is-active", a.dataset.sec === id); });
    });
  }, {rootMargin:"-40% 0px -55% 0px"}) : null;
  ["work","formation","clients","contact"].forEach(function(id){
    var s = document.getElementById(id);
    if(s && secIO) secIO.observe(s);
  });

  /* ---------- work: filters + card slider ---------- */
  var track = document.getElementById("workTrack"),
      filtersBox = document.getElementById("filters"),
      countEl = document.getElementById("workCount"),
      prevBtn = document.getElementById("workPrev"),
      nextBtn = document.getElementById("workNext"),
      barEl = document.getElementById("workBar"),
      posEl = document.getElementById("workPos"),
      currentFilter = "all";

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
        currentFilter = b.dataset.cat;
        renderWorks();
      });
    });
  }

  function filtered(){
    return currentFilter === "all" ? WORKS : WORKS.filter(function(w){ return w.cat === currentFilter; });
  }

  function cardHTML(w, i){
    return '<article class="work-card" data-i="' + i + '" tabindex="0" role="button" aria-label="' + w.title + ' — ' + w.client + '" style="--i:' + (i % 3) + '">' +
      '<div class="work-card__media"><img src="' + w.src + '" alt="" loading="lazy" draggable="false"></div>' +
      '<span class="work-card__chip">' + CAT_LABEL[w.cat] + '</span>' +
      '<span class="work-card__num">' + String(i+1).padStart(2,"0") + '</span>' +
      '<div class="work-card__info"><h3>' + w.title + '</h3><p>' + w.client + ' · ' + CAT_LABEL[w.cat] + '</p></div>' +
    '</article>';
  }

  function cardWidth(){
    var c = track.querySelector(".work-card");
    if (!c) return 440;
    return c.getBoundingClientRect().width + 20;
  }

  function updateNav(){
    var n = filtered().length;
    var max = track.scrollWidth - track.clientWidth;
    var p = max > 0 ? track.scrollLeft / max : 0;
    barEl.style.width = Math.max(8, Math.round(8 + p * 92)) + "%";
    var idx = Math.min(n, Math.round(track.scrollLeft / cardWidth()) + 1);
    posEl.textContent = String(idx).padStart(2,"0") + " / " + String(n).padStart(2,"0");
  }

  function renderWorks(){
    var items = filtered();
    track.innerHTML = items.map(cardHTML).join("");
    track.scrollLeft = 0;
    countEl.textContent = items.length + " pieces" + (currentFilter === "all" ? "" : " in " + CAT_LABEL[currentFilter]) + " — swipe, drag, or use the arrows";
    track.querySelectorAll(".work-card").forEach(function(el){
      el.addEventListener("click", function(){ openViewer(+el.dataset.i); });
      el.addEventListener("keydown", function(e){
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openViewer(+el.dataset.i); }
      });
    });
    updateNav();
  }

  prevBtn.addEventListener("click", function(){ track.scrollBy({left: -cardWidth(), behavior: "smooth"}); });
  nextBtn.addEventListener("click", function(){ track.scrollBy({left: cardWidth(), behavior: "smooth"}); });
  track.addEventListener("scroll", function(){ updateNav(); }, {passive: true});
  window.addEventListener("resize", function(){ updateNav(); });

  /* drag to scroll (clicks still open the viewer; a drag does not) */
  (function(){
    var down = false, moved = false, startX = 0, startL = 0;
    track.addEventListener("pointerdown", function(e){ down = true; moved = false; startX = e.clientX; startL = track.scrollLeft; });
    track.addEventListener("pointermove", function(e){
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 6) moved = true;
      track.scrollLeft = startL - dx;
    });
    track.addEventListener("pointerup", function(){ down = false; });
    track.addEventListener("pointercancel", function(){ down = false; });
    track.addEventListener("click", function(e){ if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
  })();

  /* ---------- viewer ---------- */
  var vw = document.getElementById("viewer"),
      vwImg = document.getElementById("vwImg"),
      vwTitle = document.getElementById("vwTitle"),
      vwMeta = document.getElementById("vwMeta"),
      vwWhy = document.getElementById("vwWhy"),
      vwCount = document.getElementById("vwCount"),
      vwFig = vw.querySelector(".viewer__fig"),
      vwIndex = 0;

  function openViewer(i){
    vwIndex = i;
    var items = filtered();
    var w = items[i];
    vwImg.src = w.src;
    vwImg.alt = w.title;
    vwTitle.textContent = w.title;
    vwMeta.textContent = CAT_LABEL[w.cat] + " · " + w.client;
    vwWhy.textContent = w.why;
    vwCount.textContent = String(i+1).padStart(2,"0") + " / " + items.length;
    vwFig.classList.remove("is-swap");
    void vwFig.offsetWidth;
    vwFig.classList.add("is-swap");
    vw.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeViewer(){ vw.hidden = true; document.body.style.overflow = ""; }
  function step(d){
    var items = filtered();
    vwIndex = (vwIndex + d + items.length) % items.length;
    openViewer(vwIndex);
  }
  document.getElementById("vwClose").addEventListener("click", closeViewer);
  document.getElementById("vwPrev").addEventListener("click", function(){ step(-1); });
  document.getElementById("vwNext").addEventListener("click", function(){ step(1); });
  vw.addEventListener("click", function(e){ if(e.target === vw) closeViewer(); });
  document.addEventListener("keydown", function(e){
    if(vw.hidden) return;
    if(e.key === "Escape") closeViewer();
    if(e.key === "ArrowLeft") step(-1);
    if(e.key === "ArrowRight") step(1);
  });
  var touchX = null;
  vw.addEventListener("touchstart", function(e){ touchX = e.touches[0].clientX; }, {passive:true});
  vw.addEventListener("touchend", function(e){
    if(touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if(Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  }, {passive:true});

  /* ---------- formation: EIGHT — 1-2-3-2, tools + crafts he actually uses ---------- */
  var PLAYERS = [
    {num:1,  name:"Photoshop",        short:"Photoshop",   role:"Goalkeeper — the last line. Every pixel defended, every cut clean.",        x:50, y:90, z:6},
    {num:2,  name:"Illustrator",      short:"Illustrator", role:"Right back — vectors, logos, icons. Sharp at any size.",                   x:72, y:68, z:16},
    {num:3,  name:"InDesign",         short:"InDesign",    role:"Left back — layouts, grids, print. Where long-form design lives.",          x:28, y:68, z:16},
    {num:6,  name:"Identity Systems", short:"Identity",    role:"Midfield engine — clubs, leagues, tournaments: one visual language.",      x:20, y:45, z:28, mx:22},
    {num:10, name:"Matchday Graphics",short:"Matchday",    role:"Captain — fixtures, line-ups, countdowns. Live, every week.",             x:50, y:45, z:34, cap:true},
    {num:8,  name:"Manipulation",     short:"Manipulation",role:"Midfield — reality, rebuilt frame by frame.",                              x:80, y:45, z:28, mx:78},
    {num:9,  name:"Hero Posters",     short:"Hero Posters",role:"Striker — big players, bigger type. The one that stops the scroll.",       x:32, y:20, z:44},
    {num:11, name:"Premiere",         short:"Premiere",    role:"Striker — cuts, reels, matchday edits. The final cut before it goes live.",x:68, y:20, z:44}
  ];
  var pitch = document.getElementById("pitch"),
      pcNum = document.getElementById("pcNum"),
      pcName = document.getElementById("pcName"),
      pcRole = document.getElementById("pcRole"),
      pcCard = document.getElementById("playerCard");

  PLAYERS.forEach(function(p){
    var el = document.createElement("button");
    var small = window.innerWidth <= 640;
    el.className = "player" + (p.num === 10 ? " is-active" : "");
    el.style.left = (small && p.mx ? p.mx : p.x) + "%";
    el.style.top = p.y + "%";
    el.style.setProperty("--pz", (p.z || 0) + "px");
    el.setAttribute("aria-label", p.num + " — " + p.name);
    el.innerHTML = '<span class="player__dot">' + p.num + (p.cap ? '<span class="cap">C</span>' : "") + '</span><span class="player__name">' + (small && p.short ? p.short : p.name) + '</span>';
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

  /* ---------- formation 3D tilt: smooth, light, fine pointers only ---------- */
  (function(){
    var tilt = document.getElementById("pitchTilt");
    if (!tilt) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function loop(){
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      tilt.style.transform = "perspective(1100px) rotateX(" + (-cy * 5).toFixed(2) + "deg) rotateY(" + (cx * 7).toFixed(2) + "deg)";
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) { raf = requestAnimationFrame(loop); }
      else { raf = null; }
    }
    function kick(){ if (!raf) raf = requestAnimationFrame(loop); }
    var section = document.getElementById("formation");
    section.addEventListener("mousemove", function(e){
      var r = tilt.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    });
    section.addEventListener("mouseleave", function(){ tx = 0; ty = 0; kick(); });
  })();

  /* ---------- floating 3D: hero portrait + viewer slider ---------- */
  (function(){
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    function addTilt(el, zone, maxX, maxY){
      if (!el || !zone) return;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      function loop(){
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        el.style.transform = "perspective(1100px) rotateX(" + (-cy * maxX).toFixed(2) + "deg) rotateY(" + (cx * maxY).toFixed(2) + "deg)";
        if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) { raf = requestAnimationFrame(loop); }
        else { raf = null; }
      }
      function kick(){ if (!raf) raf = requestAnimationFrame(loop); }
      zone.addEventListener("mousemove", function(e){
        var r = el.getBoundingClientRect();
        if (!r.width) return;
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        kick();
      });
      zone.addEventListener("mouseleave", function(){ tx = 0; ty = 0; kick(); });
    }
    addTilt(document.getElementById("portraitTilt"), document.querySelector(".hero"), 4, 6);
    addTilt(document.querySelector(".viewer__fig"), document.querySelector(".viewer"), 3, 5);
    addTilt(document.getElementById("contactTilt"), document.querySelector(".contact"), 2, 3);
  })();

  /* ---------- clients list ---------- */
  var CLIENTS = [
    ["Serie A","Italy"],["FIFA Club World Cup","Saudi 2023"],["NBA","Basketball"],
    ["Roshn Saudi League","Saudi Arabia"],["Ligue 1","France"],["PIF","Saudi Arabia"],
    ["Saudi Super Cup","Saudi Arabia"],["The Best FIFA","FIFA"],["President's Cup","UAE"],
    ["PIF Saudi International","Golf"],["Al Ettifaq","Saudi Arabia"],["Saudi Founding Day","Saudi Arabia"],
    ["NEOM S.C.","Saudi Arabia"],["Al Jazira","UAE"],["Saudi Archery Federation","Saudi Arabia"],
    ["Dubai Basketball","UAE"],["AFC Asian Cup 2027","Saudi Arabia"]
  ];
  document.getElementById("clientsList").innerHTML = CLIENTS.map(function(c){
    return "<li><b>" + c[0] + "</b><span>" + c[1] + "</span></li>";
  }).join("");

  /* ---------- boot ---------- */
  renderFilters();
  renderWorks();
})();
