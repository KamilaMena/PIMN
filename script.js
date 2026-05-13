/* ============================
   SCRIPT.JS – PIMN
   ============================ */

// ── NAV SHRINK & MOBILE TOGGLE ──────────────────────
const nav        = document.getElementById('navbar');
const navToggle  = document.getElementById('navToggle');
const navMenu    = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close menu on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.padding = '12px 10%';
    nav.style.background = 'rgba(7,24,40,0.99)';
  } else {
    nav.style.padding = '16px 10%';
    nav.style.background = 'rgba(7,24,40,0.92)';
  }
});

// ── STAR FIELD GENERATOR ────────────────────────────
const starsContainer = document.getElementById('stars');
if (starsContainer) {
  const count = 80;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.classList.add('star');
    s.style.left    = Math.random() * 100 + '%';
    s.style.top     = Math.random() * 100 + '%';
    s.style.setProperty('--dur', (2 + Math.random() * 4).toFixed(1) + 's');
    s.style.setProperty('--del', (Math.random() * 5).toFixed(1) + 's');
    s.style.setProperty('--op',  (0.3 + Math.random() * 0.7).toFixed(2));
    s.style.width   = (1 + Math.random() * 2).toFixed(1) + 'px';
    s.style.height  = s.style.width;
    starsContainer.appendChild(s);
  }
}

// ── REVEAL ON SCROLL ────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('active');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION ───────────────────────────────
function animateCounter(el) {
  const target  = parseInt(el.dataset.target, 10);
  const duration = 1600; // ms
  const start   = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ── INVESTMENT BAR ANIMATION ─────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.inv-fill').forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = target; }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const investGrid = document.querySelector('.investment-grid');
if (investGrid) barObserver.observe(investGrid);