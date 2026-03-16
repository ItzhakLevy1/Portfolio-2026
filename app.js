  // ── Smooth scroll helper ──
  // Defined first so onclick="scrollTo_(...)" calls in HTML can find it
  var mobileNav = document.getElementById('mobileNav');
  var hamburger  = document.getElementById('hamburger');

  function scrollTo_(selector) {
    var target = document.querySelector(selector);
    if (!target) return;
    var navH = (document.querySelector('nav') || {offsetHeight:64}).offsetHeight;
    var y = target.getBoundingClientRect().top + window.pageYOffset - navH;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    if (mobileNav) mobileNav.classList.remove('open');
  }

  // ── Logo → scroll to top ──
  var logoEl = document.querySelector('.logo');
  if (logoEl) {
    logoEl.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (mobileNav) mobileNav.classList.remove('open');
    });
  }

  // ── Hamburger menu ──
  function toggleMenu() {
    if (mobileNav) mobileNav.classList.toggle('open');
  }
  document.addEventListener('click', function(e) {
    if (!mobileNav || !hamburger) return;
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });

  // ── Mouse glow on cards ──
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // ── Category filter ──
  function filterCat(cat, btn) {
    document.querySelectorAll('.cat-tab').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(function(card) {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  }

  // ── Theme toggle ──
  var htmlEl  = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var isLight = false;
  try { isLight = localStorage.getItem('theme') === 'light'; } catch(e) {}

  function applyTheme() {
    if (isLight) {
      htmlEl.classList.add('light');
      if (themeBtn) themeBtn.textContent = '🌑';
    } else {
      htmlEl.classList.remove('light');
      if (themeBtn) themeBtn.textContent = '🌙';
    }
  }
  function toggleTheme() {
    isLight = !isLight;
    applyTheme();
    try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch(e) {}
  }
  applyTheme();

  // ── Active nav highlight on scroll ──
  window.addEventListener('scroll', function() {
    var fromTop = window.pageYOffset + 90;
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      var id  = a.getAttribute('href').replace('#', '');
      var sec = document.getElementById(id);
      if (sec && sec.offsetTop <= fromTop && sec.offsetTop + sec.offsetHeight > fromTop) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }, { passive: true });

  // Open presentation in new tab
document.querySelectorAll('.card-action-btn').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.href.includes('canva.com')) {
            window.open(this.href, '_blank');
            e.preventDefault();
        }
    });
});
