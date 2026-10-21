/* ============================================================
   JUMA ELECTRICALS & ENGINEERING FIRM  –  main.js
   Handles: mobile nav · back-to-top · fade animations ·
            FAQ accordion · form validation · toast · date min
   ============================================================ */

/* ---- Hamburger / mobile nav ---- */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ---- Back-to-top ---- */
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ---- Scroll fade-in ---- */
(function () {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
})();


/* ---- FAQ accordion ---- */
(function () {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        const ob = other.querySelector('.faq-question');
        if (ob) ob.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();


/* ---- Min date for consultation picker ---- */
(function () {
  const d = document.getElementById('prefDate');
  if (d) d.setAttribute('min', new Date().toISOString().split('T')[0]);
})();


/* ---- Form validation & submission ---- */
(function () {
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (!form) return;

  function showErr(input, msg) {
    clearErr(input);
    const span = document.createElement('span');
    span.className = 'field-error';
    span.textContent = msg;
    span.style.cssText = 'display:block;color:#c62828;font-size:0.78rem;margin-top:0.25rem;';
    span.setAttribute('role','alert');
    input.parentNode.appendChild(span);
    input.style.borderColor = '#c62828';
  }
  function clearErr(input) {
    const ex = input.parentNode.querySelector('.field-error');
    if (ex) ex.remove();
    input.style.borderColor = '';
  }
  function validate(input) {
    const v = input.value.trim();
    if (input.required && !v) { showErr(input,'This field is required.'); return false; }
    if (input.type==='email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { showErr(input,'Enter a valid email.'); return false; }
    if (input.type==='tel'   && v && !/^[\d\s\+\-\(\)]{7,20}$/.test(v))      { showErr(input,'Enter a valid phone number.'); return false; }
    if (input.id==='consent' && !input.checked) { showErr(input,'Please accept the Privacy Policy.'); return false; }
    clearErr(input); return true;
  }

  form.querySelectorAll('input,select,textarea').forEach(f => {
    f.addEventListener('blur',  () => validate(f));
    f.addEventListener('input', () => clearErr(f));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(f => { if (!validate(f)) valid = false; });
    if (!valid) {
      const first = form.querySelector('.field-error');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true; btn.textContent = '⏳ Sending…';
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Enquiry / Book a Visit';
      if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 5000); }
    }, 1400);
  });
})();


/* ---- Newsletter buttons ---- */
(function () {
  document.querySelectorAll('.footer-newsletter button').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      if (!input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        input.style.borderColor = '#c62828'; input.focus(); return;
      }
      input.style.borderColor = ''; input.value = '';
      btn.textContent = '✅ Subscribed!';
      setTimeout(() => { btn.textContent = 'Subscribe'; }, 3000);
    });
  });
})();


/* ---- Sticky header shadow ---- */
(function () {
  const header = document.querySelector('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 24px rgba(0,0,0,0.25)' : '0 2px 16px rgba(0,0,0,0.2)';
  }, { passive: true });
})();
