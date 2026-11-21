(function () {
  // Reveal on scroll (with load-time fallback so above-fold content always shows)
  var revealEls = document.querySelectorAll('.rgx-reveal');
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('rgx-in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('rgx-in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    revealEls.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      revealEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('rgx-in');
      });
    }, 600);
  }

  // Hero photo parallax (desktop)
  var photo = document.querySelector('.rgx-hero-photo');
  var onScroll = function () { if (photo && window.innerWidth > 820) { photo.style.transform = 'translateY(' + Math.min(window.scrollY * .08, 50) + 'px)'; } };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Liquid hero canvas
  var canvas = document.getElementById('rgxFluid');
  if (!canvas) return;
  var gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
  if (!gl) { canvas.style.display = 'none'; return; }
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var still = reduce || window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 820;
  var vsrc = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var fsrc = `
precision highp float;
uniform vec2 u_res;uniform float u_t;uniform vec2 u_ptr;uniform float u_act;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);
 float a=hash(i);float b=hash(i+vec2(1.,0.));float c=hash(i+vec2(0.,1.));float d=hash(i+vec2(1.,1.));
 return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm(vec2 p){float v=0.;float a=.55;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.04+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res.xy;
 float asp=u_res.x/u_res.y;
 vec2 p=vec2(uv.x*asp,uv.y);
 float t=u_t*.05;
 vec2 q=vec2(fbm(p*1.5+vec2(0.,t)),fbm(p*1.5+vec2(5.2,t*1.3)));
 vec2 r=vec2(fbm(p*1.5+2.4*q+vec2(1.7,9.2)+.14*t),fbm(p*1.5+2.4*q+vec2(8.3,2.8)-.1*t));
 vec2 pp=vec2(u_ptr.x*asp,u_ptr.y);
 float d=distance(p,pp);
 float stir=exp(-d*d*6.)*u_act;
 r+=stir*vec2(fbm(p*3.+u_t*.35),fbm(p*3.-u_t*.3))*1.2;
 float f=fbm(p*1.5+2.6*r);
 vec3 base=vec3(.039,.039,.043);
 vec3 deep=vec3(.30,.03,.045);
 vec3 hot=vec3(.91,.20,.18);
 vec3 col=mix(base,deep,smoothstep(.28,.78,f));
 col=mix(col,hot,smoothstep(.74,.97,f)*.85);
 float ridge=pow(smoothstep(.55,1.,fbm(p*3.4+r*3.2+vec2(0.,t*2.))),5.);
 col+=ridge*vec3(1.,.42,.36)*.22;
 col+=stir*vec3(.9,.25,.2)*.22;
 float vig=smoothstep(1.25,.35,length(uv-vec2(.5,.58)));
 col*=mix(.5,1.,vig);
 gl_FragColor=vec4(col,1.);
}`;
  var sh = function (type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  var prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vsrc));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fsrc));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.style.display = 'none'; return; }
  gl.useProgram(prog);
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uRes = gl.getUniformLocation(prog, 'u_res');
  var uT = gl.getUniformLocation(prog, 'u_t');
  var uPtr = gl.getUniformLocation(prog, 'u_ptr');
  var uAct = gl.getUniformLocation(prog, 'u_act');
  var px = .62, py = .5, tx = .62, ty = .5, act = .4;
  var onMove = function (e) { var b = canvas.getBoundingClientRect(); tx = (e.clientX - b.left) / b.width; ty = 1 - (e.clientY - b.top) / b.height; act = Math.min(1, act + .22); };
  var resize = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5) * .6;
    var w = Math.max(2, Math.floor(canvas.clientWidth * dpr));
    var h = Math.max(2, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
  };
  var draw = function (t) {
    resize();
    px += (tx - px) * .06; py += (ty - py) * .06; act *= .965;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uT, t);
    gl.uniform2f(uPtr, px, py);
    gl.uniform1f(uAct, act);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  if (still) {
    draw(7.3);
    var onRs = function () { draw(7.3); };
    window.addEventListener('resize', onRs);
    return;
  }
  window.addEventListener('mousemove', onMove, { passive: true });
  var visible = true;
  var t0 = performance.now();
  var loop = function (now) {
    requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    draw((now - t0) / 1000 + 4);
  };
  var vio = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 });
  vio.observe(canvas);
  requestAnimationFrame(loop);
})();
