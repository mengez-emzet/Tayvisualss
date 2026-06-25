/* ===================================================
   TayVisualss — script.js (Multi-Page Version)
   =================================================== */

   'use strict';

   /* ─── IMAGE PROTECTION (replaces inline oncontextmenu) ──
      Blocks right-click on portfolio images without
      violating CSP (no inline event handlers).       */
   (function initImageProtection() {
     document.addEventListener('contextmenu', (e) => {
       if (e.target.matches('[data-no-context="true"]')) {
         e.preventDefault();
         return false;
       }
     });
     // Also block drag on protected images
     document.addEventListener('dragstart', (e) => {
       if (e.target.matches('[data-no-context="true"]')) {
         e.preventDefault();
       }
     });
   })();


   /* ─── DOM READY ─────────────────────────────────── */
   document.addEventListener('DOMContentLoaded', () => {
     initLoader();
     initCursor();
     initNavbar();
     initMobileMenu();
     initActiveNavLink(); // NEW: Sets active state for current page
     initHeroCanvas();
     initScrollReveal();
     initFAQ();
     initContactForm();
     initBookingForm();
     initProjectFilter();
     initStatCounter();
     initTicker();
     initVideoBackground();
   });
   
/* ─── PAGE LOADER WITH PROGRESS ──────────────────────── */

function initLoader() {
  const loader = document.getElementById('page-loader');
  const percentElement = document.getElementById('loader-percent');
  
  if (!loader) return;
  
  let progress = 0;
  const duration = 2000; // 2 seconds
  const startTime = performance.now();
  
  // Update percentage counter
  function updateProgress() {
    const elapsed = performance.now() - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);
    
    // Easing function for natural feel
    const eased = 1 - Math.pow(1 - rawProgress, 3);
    progress = Math.round(eased * 100);
    
    if (percentElement) {
      percentElement.textContent = progress;
    }
    
    if (rawProgress < 1) {
      requestAnimationFrame(updateProgress);
    }
  }
  
  // Start progress animation
  requestAnimationFrame(updateProgress);
  
  // Hide loader after animation completes
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.remove();
      triggerHeroAnimations();
    }, 800);
  }, 2600); // 2s animation + 0.6s buffer
}

function triggerHeroAnimations() {
  const heroEls = document.querySelectorAll('.hero-animate');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, i * 160);
  });
}
   
   /* ─── CUSTOM CURSOR ──────────────────────────────── */
   function initCursor() {
     const dot = document.querySelector('.cursor-dot');
     const ring = document.querySelector('.cursor-ring');
     if (!dot || !ring) return;
   
     let mouseX = 0, mouseY = 0;
     let ringX = 0, ringY = 0;
     let rafId;
   
     document.addEventListener('mousemove', (e) => {
       mouseX = e.clientX;
       mouseY = e.clientY;
       dot.style.left = mouseX + 'px';
       dot.style.top = mouseY + 'px';
     });
   
     function animateRing() {
       ringX += (mouseX - ringX) * 0.12;
       ringY += (mouseY - ringY) * 0.12;
       ring.style.left = ringX + 'px';
       ring.style.top = ringY + 'px';
       rafId = requestAnimationFrame(animateRing);
     }
     animateRing();
   
     document.querySelectorAll('a, button, .service-card, .work-item, .project-item, .faq-question, .filter-btn, .pricing-card').forEach(el => {
       el.addEventListener('mouseenter', () => ring.classList.add('hover'));
       el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
     });
   
     document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
     document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
   }
   
   /* ─── NAVBAR ─────────────────────────────────────── */
   function initNavbar() {
     const navbar = document.getElementById('navbar');
     if (!navbar) return;
   
     window.addEventListener('scroll', () => {
       if (window.scrollY > 40) {
         navbar.classList.add('scrolled');
       } else {
         navbar.classList.remove('scrolled');
       }
     }, { passive: true });
   }
   
   /* ─── ACTIVE NAV LINK (NEW FOR MULTI-PAGE) ────────── */
   function initActiveNavLink() {
     // Get current page filename
     const currentPage = window.location.pathname.split('/').pop() || 'index.html';
     
     // Map filenames to page identifiers
     const pageMap = {
       'index.html': 'home',
       'about.html': 'about',
       'services.html': 'services',
       'projects.html': 'projects',
       'contact.html': 'contact',
       'book.html': 'book'
     };
     
     const currentPageName = pageMap[currentPage] || 'home';
     
     // Update all nav links
     document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
       link.classList.remove('active');
       if (link.dataset.page === currentPageName) {
         link.classList.add('active');
       }
     });
     
     // Also handle footer links with data-page
     document.querySelectorAll('.footer-col a[data-page]').forEach(link => {
       const page = link.dataset.page;
       if (pageMap[page + '.html'] === currentPage) {
         link.style.color = 'var(--white)';
       }
     });
   }
   
   /* ─── MOBILE MENU ────────────────────────────────── */
   function initMobileMenu() {
     const hamburger = document.querySelector('.hamburger');
     const mobileMenu = document.querySelector('.mobile-menu');
     const overlay = document.querySelector('.mobile-menu-overlay');
     if (!hamburger || !mobileMenu) return;
   
     function openMenu() {
       hamburger.classList.add('open');
       mobileMenu.classList.add('open');
       overlay.classList.add('open');
       document.body.style.overflow = 'hidden';
     }
     function closeMenu() {
       hamburger.classList.remove('open');
       mobileMenu.classList.remove('open');
       overlay.classList.remove('open');
       document.body.style.overflow = '';
     }
   
     hamburger.addEventListener('click', () => {
       if (hamburger.classList.contains('open')) closeMenu();
       else openMenu();
     });
     overlay.addEventListener('click', closeMenu);
   
     document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
       link.addEventListener('click', closeMenu);
     });
   }
   
   /* ─── REMOVED: initPageRouter(), navigateTo(), showPage(), reinitCursorHovers() ── */
   // These functions are removed since we're using separate HTML pages
   // Regular HTML links will work naturally
   
   /* ─── HERO CANVAS ANIMATION ──────────────────────── */
   function initHeroCanvas() {
     const canvas = document.getElementById('hero-canvas');
     if (!canvas) return;
   
     const ctx = canvas.getContext('2d');
     let w, h, particles = [], animFrame;
   
     function resize() {
       w = canvas.width = canvas.offsetWidth;
       h = canvas.height = canvas.offsetHeight;
     }
     window.addEventListener('resize', resize);
     resize();
   
     // Create particles
     class Particle {
       constructor() { this.reset(true); }
       reset(initial = false) {
         this.x = Math.random() * w;
         this.y = initial ? Math.random() * h : h + 10;
         this.size = Math.random() * 1.8 + 0.3;
         this.speedY = -(Math.random() * 0.5 + 0.15);
         this.speedX = (Math.random() - 0.5) * 0.2;
         this.opacity = Math.random() * 0.5 + 0.1;
         this.life = 0;
         this.maxLife = Math.random() * 400 + 200;
       }
       update() {
         this.y += this.speedY;
         this.x += this.speedX;
         this.life++;
         if (this.y < -10 || this.life > this.maxLife) this.reset();
       }
       draw() {
         const alpha = this.opacity * Math.sin((this.life / this.maxLife) * Math.PI);
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(200,200,200,${alpha})`;
         ctx.fill();
       }
     }
   
     // Lines
     class Line {
       constructor() { this.reset(); }
       reset() {
         this.x = Math.random() * w;
         this.y = Math.random() * h;
         this.length = Math.random() * 60 + 20;
         this.angle = Math.random() * Math.PI;
         this.opacity = Math.random() * 0.08 + 0.02;
         this.life = 0;
         this.maxLife = Math.random() * 200 + 100;
         this.speed = (Math.random() - 0.5) * 0.3;
       }
       update() {
         this.y -= 0.2;
         this.angle += this.speed * 0.01;
         this.life++;
         if (this.life > this.maxLife || this.y < -60) this.reset();
       }
       draw() {
         const alpha = this.opacity * Math.sin((this.life / this.maxLife) * Math.PI);
         ctx.beginPath();
         ctx.moveTo(this.x, this.y);
         ctx.lineTo(
           this.x + Math.cos(this.angle) * this.length,
           this.y + Math.sin(this.angle) * this.length
         );
         ctx.strokeStyle = `rgba(180,180,180,${alpha})`;
         ctx.lineWidth = 0.5;
         ctx.stroke();
       }
     }
   
     // Initialize
     for (let i = 0; i < 120; i++) particles.push(new Particle());
     const lines = Array.from({ length: 24 }, () => new Line());
   
     // Vignette
     function drawVignette() {
       const gradient = ctx.createRadialGradient(w / 2, h / 2, h * 0.1, w / 2, h / 2, h * 0.8);
       gradient.addColorStop(0, 'rgba(10,10,10,0)');
       gradient.addColorStop(1, 'rgba(10,10,10,0.85)');
       ctx.fillStyle = gradient;
       ctx.fillRect(0, 0, w, h);
     }
   
     function animate() {
       ctx.clearRect(0, 0, w, h);
   
       // Dark bg
       ctx.fillStyle = '#0a0a0a';
       ctx.fillRect(0, 0, w, h);
   
       // Subtle grid
       ctx.strokeStyle = 'rgba(255,255,255,0.015)';
       ctx.lineWidth = 1;
       const gridSize = 80;
       for (let x = 0; x < w; x += gridSize) {
         ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
       }
       for (let y = 0; y < h; y += gridSize) {
         ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
       }
   
       lines.forEach(l => { l.update(); l.draw(); });
       particles.forEach(p => { p.update(); p.draw(); });
       drawVignette();
       animFrame = requestAnimationFrame(animate);
     }
     if (animFrame) cancelAnimationFrame(animFrame);
     animate();
   }
   
   /* ─── SCROLL REVEAL ──────────────────────────────── */
   function initScrollReveal() {
     const elements = document.querySelectorAll('.reveal:not(.visible)');
     if (!elements.length) return;
   
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           entry.target.classList.add('visible');
           observer.unobserve(entry.target);
         }
       });
     }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
   
     elements.forEach(el => observer.observe(el));
   }
   
   /* ─── STAT COUNTER ───────────────────────────────── */
   function initStatCounter() {
     const stats = document.querySelectorAll('.stat-number[data-count]');
     stats.forEach(el => {
       el.dataset.counted = '';
     });
   
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting && !entry.target.dataset.counted) {
           entry.target.dataset.counted = 'true';
           animateCount(entry.target);
         }
       });
     }, { threshold: 0.5 });
   
     stats.forEach(el => observer.observe(el));
   }
   
   function animateCount(el) {
     const target = parseInt(el.dataset.count, 10);
     const suffix = el.dataset.suffix || '';
     const duration = 1600;
     const start = performance.now();
   
     function update(now) {
       const elapsed = now - start;
       const progress = Math.min(elapsed / duration, 1);
       const eased = 1 - Math.pow(1 - progress, 3);
       el.textContent = Math.round(eased * target) + suffix;
       if (progress < 1) requestAnimationFrame(update);
     }
     requestAnimationFrame(update);
   }
   
   /* ─── TICKER ─────────────────────────────────────── */
   function initTicker() {
     // Already CSS-animated, just ensure duplicate
     const track = document.querySelector('.ticker-track');
     if (track) {
       const clone = track.cloneNode(true);
       track.parentElement.appendChild(clone);
     }
   }
   
   /* ─── FAQ ────────────────────────────────────────── */
   function initFAQ() {
     document.querySelectorAll('.faq-question').forEach(question => {
       question.addEventListener('click', () => {
         const item = question.closest('.faq-item');
         const isOpen = item.classList.contains('open');
   
         // Close all
         document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
   
         // Open clicked
         if (!isOpen) item.classList.add('open');
       });
     });
   }
   
   /* ─── CONTACT FORM (SECURED v2 — Formspree) ────────
      Fixes applied:
      • CSRF token (per-session, rotated each page load)
      • Email injection prevention (strips \r\n)
      • Enhanced XSS sanitizer (HTML + injection chars)
      • Honeypot silent drop
      • Client-side rate limiting (+ note: Formspree enforces server-side)
      • reCAPTCHA v3 token attached before submit
      • Inline event handlers removed (moved to JS)
   ──────────────────────────────────────────────────── */
   function initContactForm() {
     const form = document.getElementById('contact-form');
     if (!form) return;

     // ── CSRF token ─────────────────────────────────────
     // Generates a unique token per page session.
     // Formspree handles true server-side CSRF; this adds a
     // client-layer defence against basic cross-origin tricks.
     function generateCSRFToken() {
       const arr = new Uint8Array(24);
       crypto.getRandomValues(arr);
       return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
     }
     const csrfToken = generateCSRFToken();
     let csrfInput = form.querySelector('input[name="_csrf"]');
     if (!csrfInput) {
       csrfInput = document.createElement('input');
       csrfInput.type = 'hidden';
       csrfInput.name = '_csrf';
       form.appendChild(csrfInput);
     }
     csrfInput.value = csrfToken;

     // ── Rate limiting (client-side friction layer) ──────
     // Real rate limiting is enforced by Formspree server-side.
     // This stops accidental double-submits and casual abuse.
     const RATE_KEY = 'tv_contact_times';
     const RATE_LIMIT = 3;
     const RATE_WINDOW = 10 * 60 * 1000;

     function isRateLimited() {
       try {
         const times = JSON.parse(sessionStorage.getItem(RATE_KEY) || '[]');
         const recent = times.filter(t => Date.now() - t < RATE_WINDOW);
         sessionStorage.setItem(RATE_KEY, JSON.stringify(recent));
         return recent.length >= RATE_LIMIT;
       } catch { return false; }
     }

     function recordSubmission() {
       try {
         const times = JSON.parse(sessionStorage.getItem(RATE_KEY) || '[]');
         times.push(Date.now());
         sessionStorage.setItem(RATE_KEY, JSON.stringify(times));
       } catch {}
     }

     // ── Input sanitizer ─────────────────────────────────
     // Strips HTML tags + email injection characters (\r \n)
     // and common XSS vectors before data leaves the browser.
     function sanitize(str) {
       if (typeof str !== 'string') return '';
       // Strip email injection characters
       str = str.replace(/[\r\n]/g, ' ');
       // Strip HTML tags
       const div = document.createElement('div');
       div.textContent = str;
       return div.innerHTML
         .replace(/javascript:/gi, '')
         .replace(/on\w+=/gi, '')
         .trim();
     }

     // ── Email format validator ──────────────────────────
     function isValidEmail(email) {
       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
     }

     form.addEventListener('submit', (e) => {
       e.preventDefault();
       const btn = form.querySelector('.form-submit');
       const success = form.querySelector('.form-success');
       const errorEl = form.querySelector('.form-error');

       // ── Honeypot ────────────────────────────────────
       const honeypot = form.querySelector('input[name="website"]');
       if (honeypot && honeypot.value.trim() !== '') return; // silent drop

       // ── Rate limit ──────────────────────────────────
       if (isRateLimited()) {
         showError(errorEl, 'Too many submissions — please wait 10 minutes.');
         return;
       }

       // ── Validate & sanitize all fields ─────────────
       let hasError = false;
       form.querySelectorAll('.form-input, .form-textarea').forEach(field => {
         if (field.type === 'email') {
           if (!isValidEmail(field.value)) {
             showError(errorEl, 'Please enter a valid email address.');
             hasError = true;
           }
         } else if (field.type !== 'date' && field.type !== 'tel') {
           field.value = sanitize(field.value);
         } else if (field.type === 'tel') {
           // Strip anything that isn't digits, +, spaces, hyphens
           field.value = field.value.replace(/[^0-9+\s\-]/g, '');
         }
       });
       if (hasError) return;

       btn.disabled = true;
       btn.querySelector('span').textContent = 'Sending...';

       // ── reCAPTCHA v3 → then submit to Formspree ────
       function doSubmit() {
         recordSubmission();
         // Submit to Formspree via fetch (AJAX — no page reload)
         const data = new FormData(form);
         fetch(form.action, {
           method: 'POST',
           body: data,
           headers: { 'Accept': 'application/json' }
         })
         .then(res => {
           if (res.ok) {
             form.querySelectorAll('.form-input, .form-textarea, .form-select')
               .forEach(f => f.value = '');
             btn.querySelector('span').textContent = 'Message Sent';
             if (success) {
               success.style.display = 'block';
               setTimeout(() => {
                 success.style.display = 'none';
                 btn.disabled = false;
                 btn.querySelector('span').textContent = 'Send Message';
               }, 5000);
             }
           } else {
             btn.disabled = false;
             btn.querySelector('span').textContent = 'Send Message';
             showError(errorEl, 'Something went wrong. Please try again or email us directly.');
           }
         })
         .catch(() => {
           btn.disabled = false;
           btn.querySelector('span').textContent = 'Send Message';
           showError(errorEl, 'Network error. Please check your connection and try again.');
         });
       }

       if (typeof grecaptcha !== 'undefined') {
         grecaptcha.ready(() => {
           grecaptcha.execute('YOUR_SITE_KEY_HERE', { action: 'contact' }).then(token => {
             let tokenInput = form.querySelector('input[name="g-recaptcha-response"]');
             if (!tokenInput) {
               tokenInput = document.createElement('input');
               tokenInput.type = 'hidden';
               tokenInput.name = 'g-recaptcha-response';
               form.appendChild(tokenInput);
             }
             tokenInput.value = token;
             doSubmit();
           });
         });
       } else {
         doSubmit();
       }
     });

     function showError(el, msg) {
       if (!el) { alert(msg); return; }
       el.textContent = msg;
       el.style.display = 'block';
       setTimeout(() => { el.style.display = 'none'; }, 6000);
     }
   }
   
   /* ─── BOOKING FORM (SECURED v2 — Formspree) ────────
      Same protections as contact form +
      stricter rate limit (2 per 15 min)
   ──────────────────────────────────────────────────── */
   function initBookingForm() {
     const form = document.getElementById('booking-form');
     if (!form) return;

     // ── CSRF token ──────────────────────────────────
     function generateCSRFToken() {
       const arr = new Uint8Array(24);
       crypto.getRandomValues(arr);
       return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
     }
     const csrfToken = generateCSRFToken();
     let csrfInput = form.querySelector('input[name="_csrf"]');
     if (!csrfInput) {
       csrfInput = document.createElement('input');
       csrfInput.type = 'hidden';
       csrfInput.name = '_csrf';
       form.appendChild(csrfInput);
     }
     csrfInput.value = csrfToken;

     // ── Rate limiting ────────────────────────────────
     const RATE_KEY = 'tv_booking_times';
     const RATE_LIMIT = 2;
     const RATE_WINDOW = 15 * 60 * 1000;

     function isRateLimited() {
       try {
         const times = JSON.parse(sessionStorage.getItem(RATE_KEY) || '[]');
         const recent = times.filter(t => Date.now() - t < RATE_WINDOW);
         sessionStorage.setItem(RATE_KEY, JSON.stringify(recent));
         return recent.length >= RATE_LIMIT;
       } catch { return false; }
     }

     function recordSubmission() {
       try {
         const times = JSON.parse(sessionStorage.getItem(RATE_KEY) || '[]');
         times.push(Date.now());
         sessionStorage.setItem(RATE_KEY, JSON.stringify(times));
       } catch {}
     }

     // ── Sanitizer (same as contact) ─────────────────
     function sanitize(str) {
       if (typeof str !== 'string') return '';
       str = str.replace(/[\r\n]/g, ' ');
       const div = document.createElement('div');
       div.textContent = str;
       return div.innerHTML
         .replace(/javascript:/gi, '')
         .replace(/on\w+=/gi, '')
         .trim();
     }

     function isValidEmail(email) {
       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
     }

     form.addEventListener('submit', (e) => {
       e.preventDefault();
       const btn = form.querySelector('.form-submit');
       const success = form.querySelector('.form-success');
       const errorEl = form.querySelector('.form-error');

       // ── Honeypot ────────────────────────────────────
       const honeypot = form.querySelector('input[name="website"]');
       if (honeypot && honeypot.value.trim() !== '') return;

       // ── Rate limit ──────────────────────────────────
       if (isRateLimited()) {
         showError(errorEl, 'Too many booking requests — please wait 15 minutes.');
         return;
       }

       // ── Validate & sanitize ─────────────────────────
       let hasError = false;
       form.querySelectorAll('.form-input, .form-textarea').forEach(field => {
         if (field.type === 'email') {
           if (!isValidEmail(field.value)) {
             showError(errorEl, 'Please enter a valid email address.');
             hasError = true;
           }
         } else if (field.type !== 'date' && field.type !== 'tel') {
           field.value = sanitize(field.value);
         } else if (field.type === 'tel') {
           field.value = field.value.replace(/[^0-9+\s\-]/g, '');
         }
       });
       if (hasError) return;

       btn.disabled = true;
       btn.querySelector('span').textContent = 'Booking...';

       function doSubmit() {
         recordSubmission();
         const data = new FormData(form);
         fetch(form.action, {
           method: 'POST',
           body: data,
           headers: { 'Accept': 'application/json' }
         })
         .then(res => {
           if (res.ok) {
             form.querySelectorAll('.form-input, .form-textarea, .form-select')
               .forEach(f => f.value = '');
             btn.querySelector('span').textContent = 'Booked!';
             if (success) {
               success.style.display = 'block';
               setTimeout(() => {
                 success.style.display = 'none';
                 btn.disabled = false;
                 btn.querySelector('span').textContent = 'Confirm Booking';
               }, 5000);
             }
           } else {
             btn.disabled = false;
             btn.querySelector('span').textContent = 'Confirm Booking';
             showError(errorEl, 'Something went wrong. Please try again or WhatsApp us directly.');
           }
         })
         .catch(() => {
           btn.disabled = false;
           btn.querySelector('span').textContent = 'Confirm Booking';
           showError(errorEl, 'Network error. Please check your connection and try again.');
         });
       }

       if (typeof grecaptcha !== 'undefined') {
         grecaptcha.ready(() => {
           grecaptcha.execute('YOUR_SITE_KEY_HERE', { action: 'booking' }).then(token => {
             let tokenInput = form.querySelector('input[name="g-recaptcha-response"]');
             if (!tokenInput) {
               tokenInput = document.createElement('input');
               tokenInput.type = 'hidden';
               tokenInput.name = 'g-recaptcha-response';
               form.appendChild(tokenInput);
             }
             tokenInput.value = token;
             doSubmit();
           });
         });
       } else {
         doSubmit();
       }
     });

     function showError(el, msg) {
       if (!el) { alert(msg); return; }
       el.textContent = msg;
       el.style.display = 'block';
       setTimeout(() => { el.style.display = 'none'; }, 6000);
     }
   }
   
   /* ─── PROJECT FILTER ─────────────────────────────── */
   function initProjectFilter() {
     document.querySelectorAll('.filter-btn').forEach(btn => {
       btn.addEventListener('click', () => {
         document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
         btn.classList.add('active');
   
         const filter = btn.dataset.filter;
         document.querySelectorAll('.project-item').forEach(item => {
           const match = filter === 'all' || item.dataset.category === filter;
           if (match) {
             item.style.display = '';
             item.style.opacity = '0';
             item.style.transform = 'scale(0.96)';
             setTimeout(() => {
               item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
               item.style.opacity = '1';
               item.style.transform = '';
             }, 20);
           } else {
             item.style.transition = 'opacity 0.2s ease';
             item.style.opacity = '0';
             setTimeout(() => { item.style.display = 'none'; }, 200);
           }
         });
       });
     });
   }
   
   /* ─── VIDEO BACKGROUND ──────────────────────────────── */
   function initVideoBackground() {
     const videoBg = document.querySelector('.hero-video-bg');
     const video = videoBg?.querySelector('video');
     const canvasBg = document.querySelector('.hero-canvas-bg');
   
     if (!video) return;
   
     // Add loading state
     videoBg.classList.add('loading');
   
     // Check if video can play
     const canPlayVideo = () => {
       return new Promise((resolve) => {
         const playPromise = video.play();
         
         if (playPromise !== undefined) {
           playPromise
             .then(() => {
               resolve(true);
             })
             .catch(() => {
               resolve(false);
             });
         } else {
           resolve(false);
         }
       });
     };
   
     // Handle video load
     video.addEventListener('loadeddata', function() {
       videoBg.classList.remove('loading');
     });
   
     // If video fails, show canvas fallback
     video.addEventListener('error', function() {
       showCanvasFallback();
     });
   
     // Check if video plays after 3 seconds, fallback if not
     setTimeout(async () => {
       const playing = await canPlayVideo();
       if (!playing) {
         showCanvasFallback();
       }
     }, 3000);
   
     function showCanvasFallback() {
       videoBg.style.display = 'none';
       canvasBg.style.display = 'block';
       initCanvasBackground();
     }
   
     function initCanvasBackground() {
       const canvas = document.getElementById('hero-canvas');
       if (!canvas) return;
   
       const ctx = canvas.getContext('2d');
       let width, height;
       let particles = [];
       const particleCount = 80;
   
       function resize() {
         width = canvas.width = window.innerWidth;
         height = canvas.height = window.innerHeight;
       }
   
       class Particle {
         constructor() {
           this.x = Math.random() * width;
           this.y = Math.random() * height;
           this.size = Math.random() * 2 + 0.5;
           this.speedX = (Math.random() - 0.5) * 0.5;
           this.speedY = (Math.random() - 0.5) * 0.5;
           this.opacity = Math.random() * 0.5 + 0.2;
         }
   
         update() {
           this.x += this.speedX;
           this.y += this.speedY;
   
           if (this.x < 0 || this.x > width) this.speedX *= -1;
           if (this.y < 0 || this.y > height) this.speedY *= -1;
         }
   
         draw() {
           ctx.beginPath();
           ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
           ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
           ctx.fill();
         }
       }
   
       function init() {
         resize();
         particles = [];
         for (let i = 0; i < particleCount; i++) {
           particles.push(new Particle());
         }
         animate();
       }
   
       function animate() {
         ctx.clearRect(0, 0, width, height);
         
         for (let i = 0; i < particles.length; i++) {
           particles[i].update();
           particles[i].draw();
   
           for (let j = i + 1; j < particles.length; j++) {
             const dx = particles[i].x - particles[j].x;
             const dy = particles[i].y - particles[j].y;
             const distance = Math.sqrt(dx * dx + dy * dy);
   
             if (distance < 120) {
               ctx.beginPath();
               ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
               ctx.lineWidth = 0.5;
               ctx.moveTo(particles[i].x, particles[i].y);
               ctx.lineTo(particles[j].x, particles[j].y);
               ctx.stroke();
             }
           }
         }
   
         requestAnimationFrame(animate);
       }
   
       window.addEventListener('resize', resize);
       init();
     }
   
     // ─── REDUCED MOTION PREFERENCE ──────────────────────
     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
     if (prefersReducedMotion.matches) {
       video?.setAttribute('muted', '');
       video?.setAttribute('loop', '');
       video?.pause();
     }
   }
   
   /* ─── SMOOTH SECTION LINK ────────────────────────── */
   document.addEventListener('click', (e) => {
     const anchor = e.target.closest('[data-scroll-to]');
     if (anchor) {
       e.preventDefault();
       const target = document.querySelector(anchor.dataset.scrollTo);
       if (target) {
         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
     }
   });
   
   /* ─── PARALLAX ON HERO ───────────────────────────── */
   window.addEventListener('scroll', () => {
     const hero = document.querySelector('#page-home .hero-content');
     if (!hero) return;
     const scrolled = window.scrollY;
     hero.style.transform = `translateY(${scrolled * 0.25}px)`;
     hero.style.opacity = 1 - scrolled / 500;
   }, { passive: true });

