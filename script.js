/* Prevent browser scroll-restore on mobile */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

/* ════════════════════════════════════════
   COVER PAGE — door open animation
════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const cover   = document.getElementById("cover");
  const openBtn = document.getElementById("openBtn");
  if (!cover || !openBtn) return;

  openBtn.addEventListener("click", () => {
    cover.classList.add("open");
    document.body.classList.remove("cover-lock");
    setTimeout(() => { cover.remove(); }, 1600);
    burstParty();
    tryPlay();
  });
});

/* ════════════════════════════════════════
   PARTY BURST — fires when invitation opens
════════════════════════════════════════ */
function burstParty() {
  const CHARS  = ['✦', '✧', '✶', '⋆', '✸', '★', '✿', '❀', '·'];
  const COLORS = [
    'rgba(232,196,112,', 'rgba(255,215,0,',   'rgba(255,255,255,',
    'rgba(255,182,193,', 'rgba(200,162,200,', 'rgba(135,206,235,'
  ];
  const count = 90;
  const vw = window.innerWidth, vh = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const el    = document.createElement('span');
    el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];

    /* Start position — random point along one of the 4 edges */
    const edge  = Math.floor(Math.random() * 4);
    let sx, sy;
    if      (edge === 0) { sx = Math.random() * vw; sy = 0; }
    else if (edge === 1) { sx = vw;                 sy = Math.random() * vh; }
    else if (edge === 2) { sx = Math.random() * vw; sy = vh; }
    else                 { sx = 0;                  sy = Math.random() * vh; }

    /* End position — anywhere inside the viewport */
    const ex = vw * 0.05 + Math.random() * vw * 0.9;
    const ey = vh * 0.05 + Math.random() * vh * 0.9;
    const dx = ex - sx, dy = ey - sy;

    const dur   = 1000 + Math.random() * 1400;
    const delay = Math.random() * 350;
    const size  = 10  + Math.random() * 18;
    const rot   = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720);
    const col   = COLORS[Math.floor(Math.random() * COLORS.length)];
    const alpha = 0.7  + Math.random() * 0.3;

    el.style.cssText =
      `position:fixed;left:${sx}px;top:${sy}px;font-size:${size}px;` +
      `color:${col}${alpha});pointer-events:none;z-index:99999;` +
      `text-shadow:0 0 14px ${col}.9),0 0 28px ${col}.4);` +
      `opacity:0;transition:transform ${dur}ms ease-out,opacity 180ms ease-in;` +
      `transition-delay:${delay}ms;`;

    document.body.appendChild(el);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = `translate(${dx}px,${dy}px) rotate(${rot}deg) scale(${0.7 + Math.random() * 0.8})`;
        setTimeout(() => {
          el.style.transition = `opacity 500ms ease-out`;
          el.style.opacity = '0';
          setTimeout(() => { if (el.parentNode) el.remove(); }, 550);
        }, delay + dur * 0.55);
      });
    });
  }
}

/* ════════════════════════════════════════
   AOS
════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 70 });
});

/* ════════════════════════════════════════
   FLOATING PETALS
════════════════════════════════════════ */
tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: 0 },
  particles: {
    number: { value: 25, density: { enable: true, area: 900 } },
    color: { value: ["#e8c870", "#f0d4a0", "#d4a843", "#ffffff"] },
    shape: {
      type: "char",
      character: [
        { value: "✿", font: "Verdana", weight: "400" },
        { value: "❀", font: "Verdana", weight: "400" },
        { value: "✾", font: "Verdana", weight: "400" },
        { value: "🌸", font: "Verdana", weight: "400" },
      ],
    },
    opacity: { value: { min: 0.2, max: 0.65 }, animation: { enable: true, speed: 0.5 } },
    size:    { value: { min: 9, max: 20 } },
    move: {
      enable: true, speed: { min: 0.5, max: 1.6 },
      direction: "bottom", random: true, straight: false,
      outModes: { default: "out", bottom: "destroy", top: "none" },
    },
    rotate: { value: { min: 0, max: 360 }, direction: "random", animation: { enable: true, speed: 5 } },
    wobble: { enable: true, distance: 10, speed: { min: -3, max: 3 } },
  },
  emitters: {
    position: { x: 50, y: -10 },
    rate: { delay: 0.25, quantity: 1 },
    size: { width: 120, height: 0 },
  },
  interactivity: { events: { onHover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 70 } } },
});

/* ════════════════════════════════════════
   COUNTDOWN
════════════════════════════════════════ */
const weddingDate = new Date("Dec 25, 2026 19:00:00").getTime();
const pad = n => String(n).padStart(2, "0");

function setFlip(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  const nv = pad(val);
  if (el.innerText !== nv) {
    el.classList.remove("flip");
    void el.offsetWidth;
    el.innerText = nv;
    el.classList.add("flip");
  }
}

function tick() {
  const gap = weddingDate - Date.now();
  if (gap <= 0) { ["days","hours","minutes","seconds"].forEach(id => { const e = document.getElementById(id); if(e) e.innerText="00"; }); return; }
  setFlip("days",    Math.floor(gap / 864e5));
  setFlip("hours",   Math.floor((gap % 864e5) / 36e5));
  setFlip("minutes", Math.floor((gap % 36e5) / 6e4));
  setFlip("seconds", Math.floor((gap % 6e4) / 1e3));
}
tick();
setInterval(tick, 1000);

/* ════════════════════════════════════════
   BACKGROUND MUSIC
════════════════════════════════════════ */
const musicBtn   = document.getElementById("musicBtn");
const musicWrap  = document.getElementById("musicWrap");
const musicTip   = document.getElementById("musicTip");
const bgMusic    = document.getElementById("bgMusic");
const musicToast = document.getElementById("musicToast");
const toastMsg   = document.getElementById("musicToastMsg");
let playing = false, audioOk = true;

function showToast(msg) {
  toastMsg.textContent = msg;
  musicToast.classList.add("show");
  clearTimeout(musicToast._t);
  musicToast._t = setTimeout(() => musicToast.classList.remove("show"), 4000);
}

function setPlaying(state) {
  playing = state;
  if (state) {
    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    musicBtn.classList.add("playing");
    musicTip.textContent = "Pause music";
  } else {
    musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    musicBtn.classList.remove("playing");
    musicTip.textContent = "Play music";
  }
}

function tryPlay() {
  if (!audioOk) return;
  bgMusic.play().then(() => setPlaying(true)).catch(() => {});
}

bgMusic.addEventListener("error", () => { audioOk = false; }, true);
bgMusic.addEventListener("canplay", () => { audioOk = true; });

musicBtn.addEventListener("click", e => {
  e.stopPropagation();
  if (playing) { bgMusic.pause(); setPlaying(false); }
  else { bgMusic.play().then(() => { setPlaying(true); showToast("♪ Bismillah — Kailash Kher"); }).catch(() => showToast("Tap play to start music")); }
});

/* ════════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
const navbar    = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu   = document.getElementById("navLinks");
const navLinks  = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navMenu.classList.toggle("open");
});

navLinks.forEach(a => a.addEventListener("click", () => {
  navToggle.classList.remove("open");
  navMenu.classList.remove("open");
}));

/* Active link highlight */
const sections = document.querySelectorAll("section[id]");
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { threshold: 0.3, rootMargin: "-60px 0px 0px 0px" }).observe ? sections.forEach(s => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting)
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { threshold: 0.3, rootMargin: "-60px 0px 0px 0px" }).observe(s);
}) : null;

/* ════════════════════════════════════════
   GALLERY LIGHTBOX — swipe + back button
════════════════════════════════════════ */
const lightbox  = document.getElementById("lightbox");
const lbImg     = document.getElementById("lbImg");
const lbClose   = document.getElementById("lbClose");
const lbPrev    = document.getElementById("lbPrev");
const lbNext    = document.getElementById("lbNext");
const lbCounter = document.getElementById("lbCounter");

const gItems = [...document.querySelectorAll(".g-item")];
let curIdx = 0, lbPushed = false;

function openLb(i) {
  curIdx = i;
  lightbox.classList.remove("prev");
  lbImg.src = gItems[i].querySelector("img").src;
  lbCounter.textContent = (i + 1) + " / " + gItems.length;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
  history.pushState({ lb: true }, "");
  lbPushed = true;
}

function showLb(i, dir) {
  if (i < 0) i = gItems.length - 1;
  if (i >= gItems.length) i = 0;
  curIdx = i;
  lightbox.classList.toggle("prev", dir === "prev");
  lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
  lbImg.src = gItems[curIdx].querySelector("img").src;
  lbCounter.textContent = (curIdx + 1) + " / " + gItems.length;
}

function closeLb() {
  if (!lightbox.classList.contains("active")) return;
  lightbox.classList.remove("active", "prev");
  document.body.style.overflow = "";
  lbImg.src = "";
  if (lbPushed) { lbPushed = false; history.back(); }
}

window.addEventListener("popstate", () => {
  if (lightbox.classList.contains("active")) {
    lbPushed = false;
    lightbox.classList.remove("active", "prev");
    document.body.style.overflow = "";
    lbImg.src = "";
  }
});

gItems.forEach((item, i) => item.addEventListener("click", () => openLb(i)));
lbClose.addEventListener("click", closeLb);
lbPrev.addEventListener("click", e => { e.stopPropagation(); showLb(curIdx - 1, "prev"); });
lbNext.addEventListener("click", e => { e.stopPropagation(); showLb(curIdx + 1, "next"); });
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLb(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowRight") showLb(curIdx + 1, "next");
  if (e.key === "ArrowLeft")  showLb(curIdx - 1, "prev");
});

let tx = 0, ty = 0;
lightbox.addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
lightbox.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    dx < 0 ? showLb(curIdx + 1, "next") : showLb(curIdx - 1, "prev");
  }
}, { passive: true });

/* ════════════════════════════════════════
   CLOSING SECTION — stars from all sides
════════════════════════════════════════ */
(function () {
  const section = document.querySelector('.closing-section');
  if (!section) return;

  const CHARS = ['✦', '✧', '✶', '⋆', '✸', '·', '★'];
  let interval = null;

  function spawnStar() {
    const W = section.offsetWidth, H = section.offsetHeight;
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    if      (edge === 0) { x = Math.random() * W; y = -12; }
    else if (edge === 1) { x = W + 12;  y = Math.random() * H; }
    else if (edge === 2) { x = Math.random() * W; y = H + 12; }
    else                 { x = -12;     y = Math.random() * H; }

    const cx   = W * 0.15 + Math.random() * W * 0.7;
    const cy   = H * 0.15 + Math.random() * H * 0.7;
    const dx   = cx - x, dy = cy - y;
    const dur  = 1600 + Math.random() * 1800;
    const size = 9  + Math.random() * 13;
    const rot  = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540);
    const alpha = 0.45 + Math.random() * 0.55;

    const star = document.createElement('span');
    star.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
    star.style.cssText =
      `position:absolute;left:${x}px;top:${y}px;font-size:${size}px;` +
      `color:rgba(232,196,112,${alpha});pointer-events:none;z-index:0;` +
      `text-shadow:0 0 10px rgba(232,196,112,.75),0 0 20px rgba(232,196,112,.35);` +
      `opacity:0;transition:transform ${dur}ms ease-out,opacity ${dur * 0.45}ms ease-in;`;

    section.appendChild(star);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        star.style.opacity = '1';
        star.style.transform = `translate(${dx}px,${dy}px) rotate(${rot}deg) scale(${0.8 + Math.random() * 0.6})`;
        setTimeout(() => {
          star.style.opacity = '0';
          setTimeout(() => { if (star.parentNode) star.remove(); }, 700);
        }, dur * 0.52);
      });
    });
  }

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !interval) {
        spawnStar();
        interval = setInterval(spawnStar, 260);
      } else if (!e.isIntersecting && interval) {
        clearInterval(interval);
        interval = null;
      }
    });
  }, { threshold: 0.05 }).observe(section);
})();
