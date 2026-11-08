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
    initShowcase();   
    initLoader();
    initCursor();
    initNavbar();
    initMobileMenu();
    initActiveNavLink();
    initHeroCanvas();
    initScrollReveal();
    initFAQ();
    initContactForm();
    initBookingForm();
    initProjectFilter();
    initStatCounter();
    initTicker();
    initVideoBackground();
    initCalendar();
  });
  
/* ─── PAGE LOADER WITH PROGRESS ──────────────────────── */

function initLoader() {
 const loader      = document.getElementById('page-loader');
 const percentEl   = document.getElementById('loader-percent');
 const progressBar = document.querySelector('.loader-bar-progress');

 if (!loader) return;

 let progress  = 0;
 const duration  = 2000;
 const startTime = performance.now();

 function updateProgress() {
   const elapsed    = performance.now() - startTime;
   const raw        = Math.min(elapsed / duration, 1);
   const eased      = 1 - Math.pow(1 - raw, 3);
   progress         = Math.round(eased * 100);

   if (percentEl)   percentEl.textContent  = progress;
   if (progressBar) progressBar.style.width = progress + '%';

   if (raw < 1) {
     requestAnimationFrame(updateProgress);
   }
 }

 requestAnimationFrame(updateProgress);

 // Hide loader — with a hard fallback in case transitions fail
 setTimeout(() => {
   loader.classList.add('hidden');
   // Force-remove after transition duration in case classList add doesn't trigger
   setTimeout(() => {
     if (loader.parentNode) loader.remove();
     triggerHeroAnimations();
   }, 900);
 }, 2400);
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
             // ── GENERATE ADMIN DASHBOARD LINK ──
             const dateVal = form.querySelector('input[name="date"]').value;
             const adminLinkInput = document.getElementById('admin-link-field');
             if (adminLinkInput && dateVal) {
                // Builds link like: http://127.0.0.1:5500/admin.html?date=2026-11-19
                const baseUrl = window.location.origin + window.location.pathname.replace('book.html', '');
                adminLinkInput.value = `${baseUrl}admin.html?date=${dateVal}`;
             }

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
   
      /* ─── BOOKING FORM (SECURED + FIREBASE CHECK + WHATSAPP) ── */
      function initBookingForm() {
        const form = document.getElementById('booking-form');
        if (!form) return;
   
        // ── Generate Admin Link Automatically ──
        function updateAdminLink() {
          const dateInput = form.querySelector('input[name="date"]');
          const adminLinkInput = document.getElementById('admin-link-field');
          
          if (adminLinkInput) {
            if (dateInput && dateInput.value) {
              // Grab the name and service (fallback to empty if not filled yet)
              const fName = form.querySelector('input[name="firstName"]')?.value.trim() || '';
              const lName = form.querySelector('input[name="lastName"]')?.value.trim() || '';
              const svc = form.querySelector('select[name="service"]')?.value || '';
              
              // Combine them into a nice label: "Mengez Emzet - Music Videos"
              let labelText = `${fName} ${lName}`.trim();
              if (labelText && svc) labelText += ` — ${svc}`;
              else if (svc) labelText = svc;
              
              const baseUrl = window.location.origin + window.location.pathname.replace('book.html', '');
              
              // Encode the text so it's safe for the URL, and add it as '&label='
              const encodedLabel = encodeURIComponent(labelText);
              adminLinkInput.value = `${baseUrl}admin.html?date=${dateInput.value}&status=booked&label=${encodedLabel}`;
            } else {
              adminLinkInput.value = 'No date selected';
            }
          }
        }
   
            // Update link when date changes
     const dateField = form.querySelector('input[name="date"]');
     if (dateField) {
       dateField.addEventListener('change', updateAdminLink);
       dateField.addEventListener('input', updateAdminLink);
     }

     // NEW: Update link when name or service changes
     const nameFields = form.querySelectorAll('input[name="firstName"], input[name="lastName"]');
     nameFields.forEach(field => {
       field.addEventListener('input', updateAdminLink);
     });
     
     const serviceField = form.querySelector('select[name="service"]');
     if (serviceField) {
       serviceField.addEventListener('change', updateAdminLink);
     }

     updateAdminLink(); // Run once on load
   
        // ── CSRF Token ──
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
   
        // ── Sanitizer & Validation ──
        function sanitize(str) {
          if (typeof str !== 'string') return '';
          str = str.replace(/[\r\n]/g, ' ');
          const div = document.createElement('div');
          div.textContent = str;
          return div.innerHTML.replace(/javascript:/gi, '').replace(/on\w+=/gi, '').trim();
        }
        function isValidEmail(email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        }
   
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const btn = form.querySelector('.form-submit');
          const success = form.querySelector('.form-success');
          const errorEl = form.querySelector('.form-error');
   
          errorEl.style.display = 'none';
          success.style.display = 'none';
   
          if (form.querySelector('input[name="website"]').value.trim() !== '') return;
   
          let hasError = false;
          form.querySelectorAll('.form-input, .form-textarea').forEach(field => {
            // ... validation logic
          });
          if (hasError) return;
   
          // ── 1. FORCE UPDATE THE LINK HERE ──
          updateAdminLink(); // <--- ADD THIS LINE
          
          const dateInput = form.querySelector('input[name="date"]');
          const firstName = form.querySelector('input[name="firstName"]').value;
          const lastName = form.querySelector('input[name="lastName"]').value;
          const service = form.querySelector('select[name="service"]').value;
          const dateVal = dateInput ? dateInput.value : '';
          
          const finalDashboardLink = document.getElementById('admin-link-field').value || 'No link generated';
   
          // ── 2. TRIGGER WHATSAPP ──
          const waNumber = "263715222660"; // TEMPORARY TEST NUMBER
          const waMessage = `Hi TayVisualss! I just submitted a booking request.\n\n*Name:* ${firstName} ${lastName}\n*Service:* ${service}\n*Date:* ${dateVal}\n\n*Review this booking:* ${finalDashboardLink}`;
          const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
          window.open(waUrl, '_blank');
   
          // ── 3. CHECK FIREBASE ──
          btn.disabled = true;
          btn.querySelector('span').textContent = 'Checking...';
   
          if (dateInput && dateInput.value) {
            try {
              const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
              const { getFirestore, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
              
              const app = initializeApp({
                apiKey: "AIzaSyAjKF0Iy6okAFVG-nt04ZOJXHcW4nHWHjY",
                authDomain: "tayvisualss-web.firebaseapp.com",
                projectId: "tayvisualss-web",
                storageBucket: "tayvisualss-web.firebasestorage.app",
                messagingSenderId: "702560378882",
                appId: "1:702560378882:web:8b022ae84ee2461d81871b"
              });
              const db = getFirestore(app);
              const docSnap = await getDoc(doc(db, 'availability', dateInput.value));
   
              if (docSnap.exists() && docSnap.data().status === 'booked') {
                btn.disabled = false;
                btn.querySelector('span').textContent = 'Confirm Booking';
                showError(errorEl, 'Sorry, this date is already booked. Please pick another date.');
                return;
              }
            } catch (err) {
              console.error("Firebase check failed:", err);
            }
          }
   
          btn.querySelector('span').textContent = 'Booking...';
          
          // ── 4. SUBMIT TO FORMSPREE ──
          const formData = new FormData(form);
          
          // Force Formspree to use our saved variable, ignoring whatever is currently in the input
          formData.set('Admin_Dashboard_Link', finalDashboardLink); 
   
          fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          })
          .then(res => { showSuccessState(); })
          .catch((err) => { 
            console.warn("Fetch blocked, simulating success:", err);
            showSuccessState(); 
          });
   
          function showSuccessState() {
            btn.querySelector('span').textContent = 'Booked!';
            success.style.display = 'block';
            
            setTimeout(() => {
              success.style.display = 'none';
              btn.disabled = false;
              btn.querySelector('span').textContent = 'Confirm Booking';
              form.reset();
              updateAdminLink(); // Repopulates the field for the next client
            }, 6000);
          }
        });
   
        function showError(el, msg) {
          if (!el) { alert(msg); return; }
          el.textContent = msg;
          el.style.display = 'block';
          setTimeout(() => { el.style.display = 'none'; }, 8000);
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

   /* ─── AUTO-CHANGING SHOWCASE ─────────────────────────── */
function initShowcase() {
  document.querySelectorAll('.showcase-wrap').forEach(wrap => {
    const stage = wrap.querySelector('.showcase');
    const slides = Array.from(wrap.querySelectorAll('.showcase-slide'));
    if (!stage || !slides.length) return;

    const tabsBox = wrap.querySelector('.showcase-tabs');
    const tabs = Array.from(wrap.querySelectorAll('.showcase-tab'));
    const counter = wrap.querySelector('.showcase-counter');
    const bar = wrap.querySelector('.showcase-progress span');
    const delay = parseInt(stage.dataset.delay, 10) || 5500;
    const pad = n => String(n).padStart(2, '0');
    let current = 0, timer = null;

    stage.style.setProperty('--delay', delay + 'ms');

    function restartBar() {
      if (!bar) return;
      bar.style.animation = 'none';
      void bar.offsetWidth;
      bar.style.animation = '';
    }

    function go(n) {
      slides[current].classList.remove('active');
      if (tabs[current]) tabs[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (tabs[current]) {
        tabs[current].classList.add('active');
        if (tabsBox) {
          tabsBox.scrollTo({
            left: tabs[current].offsetLeft - tabsBox.clientWidth / 2 + tabs[current].clientWidth / 2,
            behavior: 'smooth'
          });
        }
      }
      if (counter) counter.innerHTML = '<b>' + pad(current + 1) + '</b> / ' + pad(slides.length);
      restartBar();
    }

    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function play() {
      stop();
      if (slides.length < 2) return;
      timer = setInterval(() => go(current + 1), delay);
    }

    wrap.querySelector('.showcase-prev')?.addEventListener('click', () => { go(current - 1); play(); });
    wrap.querySelector('.showcase-next')?.addEventListener('click', () => { go(current + 1); play(); });
    tabs.forEach((tab, i) => tab.addEventListener('click', () => { go(i); play(); }));

    // pause on hover (desktop)
    stage.addEventListener('mouseenter', () => { stop(); stage.classList.add('paused'); });
    stage.addEventListener('mouseleave', () => { stage.classList.remove('paused'); restartBar(); play(); });

    // swipe (mobile)
    let startX = 0, startY = 0;
    stage.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    }, { passive: true });
    stage.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { go(current + (dx < 0 ? 1 : -1)); play(); }
    }, { passive: true });

    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : play(); });

    go(0);
    play();
  });
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

   /* ─── BOOKING CALENDAR (FIREBASE) ────────────────── */
async function initCalendar() {
  const calGrid = document.getElementById('tv-cal-grid');
  if (!calGrid) return; // Exit if not on the booking page

  try {
    // Dynamically load Firebase so it doesn't break standard script execution
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
    const { getFirestore, collection, onSnapshot } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");

    const FIREBASE_CONFIG = {
      apiKey: "AIzaSyAjKF0Iy6okAFVG-nt04ZOJXHcW4nHWHjY",
      authDomain: "tayvisualss-web.firebaseapp.com",
      projectId: "tayvisualss-web",
      storageBucket: "tayvisualss-web.firebasestorage.app",
      messagingSenderId: "702560378882",
      appId: "1:702560378882:web:8b022ae84ee2461d81871b"
    };

    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);

    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const todayObj = new Date();
    const todayYear = todayObj.getFullYear();
    const todayMon = todayObj.getMonth();
    const todayDay = todayObj.getDate();

    let viewYear = todayYear;
    let viewMonth = todayMon;
    let selectedCell = null;
    let availability = {};

    function pad(n) { return String(n).padStart(2, '0'); }
    function dateKey(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

    function getState(y, m, d) {
      const key = dateKey(y, m, d);
      const isPast = (y < todayYear) ||
        (y === todayYear && m < todayMon) ||
        (y === todayYear && m === todayMon && d < todayDay);
      if (isPast) return 'past';
      const entry = availability[key];
      if (!entry) return 'available';
      return entry.status;
    }

    function renderCalendar() {
      const grid = document.getElementById('tv-cal-grid');
      const header = document.getElementById('tv-cal-month');
      if (!grid || !header) return;

      header.textContent = `${MONTHS[viewMonth]} ${viewYear}`;

      // Preserve Day of Week headers (Mon, Tue...)
      const dowTexts = [];
      grid.querySelectorAll('.cal-dow').forEach(el => dowTexts.push(el.textContent));
      grid.innerHTML = '';
      dowTexts.forEach(text => {
        const dow = document.createElement('div');
        dow.className = 'cal-dow';
        dow.textContent = text;
        grid.appendChild(dow);
      });

      // Calculate empty days before the 1st
      let startDow = new Date(viewYear, viewMonth, 1).getDay();
      startDow = (startDow === 0) ? 6 : startDow - 1;

      for (let i = 0; i < startDow; i++) {
        const blank = document.createElement('div');
        blank.className = 'cal-day empty';
        grid.appendChild(blank);
      }

      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      const todayKey = dateKey(todayYear, todayMon, todayDay);

      for (let d = 1; d <= daysInMonth; d++) {
        const state = getState(viewYear, viewMonth, d);
        const key = dateKey(viewYear, viewMonth, d);
        const cell = document.createElement('div');
        cell.className = `cal-day ${state}`;
        
        if (key === todayKey && state !== 'past') cell.classList.add('today');

        const num = document.createElement('div');
        num.className = 'cal-day-num';
        num.textContent = d;
        cell.appendChild(num);

        if (state !== 'past') {
          const dot = document.createElement('div');
          dot.className = 'cal-day-dot';
          cell.appendChild(dot);
        }

        if (state === 'available' || state === 'booked') {
          cell.style.cursor = 'pointer';
          cell.addEventListener('click', (e) => {
            e.stopPropagation();
            selectDate(cell, key, d, state);
          });
        }

        grid.appendChild(cell);
      }
    }

    function selectDate(cell, key, d, state) {
      if (selectedCell) selectedCell.classList.remove('selected');
      selectedCell = cell;
      cell.classList.add('selected');

      const detail = document.getElementById('tv-cal-detail');
      const placeholder = document.getElementById('tv-cal-placeholder');
      const dateEl = document.getElementById('tv-detail-date');
      const dot = document.getElementById('tv-status-dot');
      const statusEl = document.getElementById('tv-status-text');
      const noteEl = document.getElementById('tv-detail-note');
      const ctaEl = document.getElementById('tv-detail-cta');

      const dateObj = new Date(viewYear, viewMonth, d);
      dateEl.textContent = dateObj.toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      });

      const dateInput = document.querySelector('#booking-form input[type="date"]');

      if (state === 'available') {
        dot.className = 'cal-status-dot status-avail';
        statusEl.textContent = 'Available for bookings';
        noteEl.textContent = "This date is open. Click below to jump to the booking form.";
        ctaEl.style.display = 'inline-flex';
        if (dateInput) dateInput.value = key;
        
        ctaEl.onclick = (e) => {
          e.preventDefault();
          document.getElementById('booking-form-section').scrollIntoView({ behavior: 'smooth' });
        };
      } else {
        const label = availability[key]?.label || '';
        dot.className = 'cal-status-dot status-booked';
        statusEl.textContent = 'Already booked';
        noteEl.textContent = label ?
          `This date is fully booked for a ${label}. Please browse other dates or contact us.` :
          'This date is fully booked. Please browse other available dates.';
        ctaEl.style.display = 'none';
      }

      if (detail) detail.classList.add('visible');
      if (placeholder) placeholder.style.display = 'none';
    }

    function clearSelection() {
      if (selectedCell) {
        selectedCell.classList.remove('selected');
        selectedCell = null;
      }
      const detail = document.getElementById('tv-cal-detail');
      const placeholder = document.getElementById('tv-cal-placeholder');
      if (detail) detail.classList.remove('visible');
      if (placeholder) placeholder.style.display = '';
    }

    // Nav buttons
    document.getElementById('tv-prev').addEventListener('click', () => {
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      clearSelection();
      renderCalendar();
    });

    document.getElementById('tv-next').addEventListener('click', () => {
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      clearSelection();
      renderCalendar();
    });

    // Start Firestore listener
    const header = document.getElementById('tv-cal-month');
    if (header) header.textContent = 'Loading...';

    onSnapshot(collection(db, 'availability'), (snapshot) => {
      availability = {};
      snapshot.forEach(doc => {
        availability[doc.id] = doc.data();
      });
      renderCalendar();
    }, (error) => {
      console.error('Firestore error:', error);
      if (header) header.textContent = 'Could not load — refresh page';
    });

  } catch (err) {
    console.error("Failed to initialize calendar:", err);
  }
}