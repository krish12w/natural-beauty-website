/* ═══════════════════════════════════════════════
   NATURAL BEAUTY CLINIC & ACADEMY
   Main JavaScript
   ═══════════════════════════════════════════════ */

'use strict';

// ── THEME TOGGLE ──
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('nbc-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
if (themeBtn) {
  themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nbc-theme', next);
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// ── MOBILE NAV ──
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

// ── SCROLL TO TOP ──
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── SEARCH OVERLAY ──
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
if (searchBtn && searchOverlay) {
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput?.focus(), 100);
  });
  searchOverlay.addEventListener('click', e => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') searchOverlay.classList.remove('active');
  });
}

// ── SCROLL REVEAL ANIMATIONS ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── ANIMATED COUNTERS ──
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const counterSection = document.querySelector('.counter-section');
if (counterSection) counterObserver.observe(counterSection);

// ── SERVICES FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-filter');
    serviceCards.forEach(card => {
      const match = cat === 'all' || card.getAttribute('data-category') === cat;
      card.style.display = match ? '' : 'none';
    });
  });
});

// ── GALLERY LIGHTBOX ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img && lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-answer').style.maxHeight = item.querySelector('.faq-answer').scrollHeight + 'px';
    }
  });
});

// ── BOOKING FORM ──
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = bookingForm.querySelector('[type=submit]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    // Netlify Forms handles the actual submission
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(bookingForm)).toString(),
    }).then(() => {
      btn.textContent = '✓ Booking Sent!';
      btn.style.background = 'var(--green)';
      bookingForm.reset();
      setTimeout(() => { btn.textContent = 'Confirm Booking'; btn.disabled = false; btn.style.background = ''; }, 4000);
    }).catch(() => {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
    });
  });
}

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type=submit]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(contactForm)).toString(),
    }).then(() => {
      btn.textContent = '✓ Message Sent!';
      contactForm.reset();
      setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; }, 4000);
    });
  });
}

// ── DYNAMIC CONTENT FROM CMS DATA ──
// These functions load JSON data files created by Decap CMS

async function loadJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

// Load hero data
async function loadHero() {
  const data = await loadJSON('/_data/hero.json');
  if (!data) return;
  const h = document.getElementById('heroHeading');
  const s = document.getElementById('heroSub');
  const img = document.getElementById('heroImage');
  const ann = document.getElementById('announcementBar');
  if (h) h.innerHTML = data.heading || h.innerHTML;
  if (s) s.textContent = data.subheading || s.textContent;
  if (img && data.image) img.src = data.image;
  if (ann && data.announcement) { ann.innerHTML = data.announcement; ann.style.display = 'block'; }
}

// Load services
async function loadServices() {
  const container = document.getElementById('servicesContainer');
  if (!container) return;
  // Services loaded from individual JSON files in _data/services/
  // In production, use a build step or API to aggregate
}

// Load testimonials
async function loadTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  // Loaded from _data/testimonials/ via build process
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadHero();
});

// ── NAV HIGHLIGHT ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

// ── SMOOTH IMAGE LOAD ──
document.querySelectorAll('img[data-src]').forEach(img => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { img.src = img.dataset.src; img.removeAttribute('data-src'); obs.disconnect(); }
    });
  });
  obs.observe(img);
});

// ── GALLERY FILTER ──
const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
galleryFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    galleryFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-filter');
    galleryItems.forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
    });
  });
});

// ── FILE SEARCH ──
const fileSearch = document.getElementById('fileSearch');
const fileCards = document.querySelectorAll('.download-card');
if (fileSearch) {
  fileSearch.addEventListener('input', () => {
    const q = fileSearch.value.toLowerCase();
    fileCards.forEach(card => {
      const name = card.querySelector('.file-name')?.textContent.toLowerCase() || '';
      card.style.display = name.includes(q) ? '' : 'none';
    });
  });
}

/* ═══════════════════════════════════════════════
   PART 2 — CMS DATA LOADER + EXTRA FEATURES
   ═══════════════════════════════════════════════ */

// ── CMS DATA: LOAD ALL COLLECTIONS ──
// Reads JSON files created by Decap CMS and renders them into the page

const NBC = {
  // Utility: fetch a JSON file safely
  async get(path) {
    try {
      const r = await fetch(path + '?v=' + Date.now());
      return r.ok ? r.json() : null;
    } catch { return null; }
  },

  // Utility: list all JSON files in a _data folder via manifest
  async listFolder(folder) {
    const manifest = await NBC.get(`/_data/manifests/${folder}.json`);
    return manifest ? manifest.files : [];
  },

  // Render star rating
  stars(n) {
    return '★'.repeat(Math.min(5, n || 5)) + '☆'.repeat(Math.max(0, 5 - (n || 5)));
  },

  // Format date nicely
  formatDate(str) {
    if (!str) return '';
    try {
      return new Date(str).toLocaleDateString('en-NP', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return str; }
  },

  // File type icon
  fileIcon(type) {
    const icons = { PDF: '📄', DOCX: '📝', Excel: '📊', ZIP: '🗜️', Image: '🖼️', Video: '🎬', Other: '📁' };
    return icons[type] || '📁';
  },

  // File icon CSS class
  fileClass(type) {
    const cls = { PDF: 'file-pdf', DOCX: 'file-doc', Excel: 'file-xls', ZIP: 'file-zip', Image: 'file-img', Video: 'file-img' };
    return cls[type] || 'file-img';
  }
};

// ── LOAD: HERO ──
async function initHero() {
  const d = await NBC.get('/_data/hero.json');
  if (!d) return;
  const h = document.getElementById('heroHeading');
  const s = document.getElementById('heroSub');
  const img = document.getElementById('heroImage');
  const bar = document.getElementById('announcementBar');
  const txt = document.getElementById('announcementText');
  if (h && d.heading) h.innerHTML = d.heading;
  if (s && d.subheading) s.textContent = d.subheading;
  if (img && d.image) { img.src = d.image; img.alt = 'Natural Beauty Clinic'; }
  if (bar && txt && d.show_announcement && d.announcement) {
    txt.textContent = d.announcement;
    bar.style.display = 'block';
  }
}

// ── LOAD: ABOUT ──
async function initAbout() {
  const d = await NBC.get('/_data/about.json');
  if (!d) return;
  const h = document.getElementById('aboutHeading');
  const t = document.getElementById('aboutText');
  const img = document.getElementById('aboutImage');
  if (h && d.heading) h.innerHTML = d.heading;
  if (t && d.text) t.innerHTML = d.text;
  if (img && d.image) { img.src = d.image; }
  // Update counters
  const nums = { statYears: d.years, statClients: d.clients, statCourses: d.courses, statStudents: d.students };
  Object.entries(nums).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el && val) el.setAttribute('data-target', val);
  });
}

// ── LOAD: SERVICES ──
async function initServices() {
  const container = document.getElementById('servicesContainer');
  if (!container) return;
  const files = await NBC.listFolder('services');
  if (!files.length) return; // keep default HTML content
  const services = (await Promise.all(files.map(f => NBC.get(f)))).filter(Boolean);
  if (!services.length) return;
  const active = services.filter(s => s.active !== false);
  container.innerHTML = active.map(s => `
    <div class="card service-card reveal" data-category="${s.category || ''}">
      <div class="card-img">
        ${s.image
          ? `<img src="${s.image}" alt="${s.title}" loading="lazy"/>`
          : `<div class="card-img-placeholder">${s.icon || '💅'}</div>`}
      </div>
      <div class="card-body">
        <span class="card-tag tag-gold">${s.category || ''}</span>
        <h3>${s.title}</h3>
        <p>${s.description || ''}</p>
        <div class="card-price">
          <span class="price-tag">Rs. ${s.price || '—'}</span>
          <span class="price-duration">${s.duration || ''}</span>
        </div>
      </div>
    </div>`).join('');
  // Re-observe new cards
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LOAD: COURSES ──
async function initCourses() {
  const container = document.getElementById('coursesContainer');
  if (!container) return;
  const files = await NBC.listFolder('courses');
  if (!files.length) return;
  const courses = (await Promise.all(files.map(f => NBC.get(f)))).filter(Boolean);
  if (!courses.length) return;
  container.innerHTML = courses.map(c => `
    <div class="course-card reveal">
      <div class="course-header">
        <div class="course-icon">${c.icon || '✂️'}</div>
        <div class="course-title">${c.title}</div>
        <div class="course-duration">⏱ ${c.duration || ''} · ${c.schedule || ''}</div>
      </div>
      <div class="course-body">
        <div class="course-fee">Rs. ${c.fee || '—'}</div>
        <div class="course-topics">
          ${(c.topics || []).map(t => `<div class="course-topic">${t}</div>`).join('')}
        </div>
        <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;">
          ${c.certificate ? '<span class="card-tag tag-gold">Certificate</span>' : ''}
          ${c.online ? '<span class="card-tag tag-green">Online Available</span>' : ''}
          ${c.enrolling ? '<span class="card-tag tag-rose">Enrolling Now</span>' : ''}
        </div>
        <a href="#booking" class="btn btn-primary btn-sm" style="margin-top:14px;width:100%;justify-content:center;">
          Enroll Now →
        </a>
      </div>
    </div>`).join('');
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LOAD: GALLERY ──
async function initGallery() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;
  const files = await NBC.listFolder('gallery');
  if (!files.length) return;
  const items = (await Promise.all(files.map(f => NBC.get(f)))).filter(Boolean);
  if (!items.length) return;
  container.innerHTML = items.map(item => `
    <div class="gallery-item reveal" data-category="${item.category || 'All'}">
      <img src="${item.image}" alt="${item.title || ''}" loading="lazy"/>
      <div class="gallery-overlay">
        <span class="gallery-caption">${item.title || ''}</span>
      </div>
    </div>`).join('');
  // Re-attach lightbox to new items
  container.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LOAD: VIDEOS ──
async function initVideos() {
  const container = document.getElementById('videosContainer');
  if (!container) return;
  const files = await NBC.listFolder('videos');
  if (!files.length) return;
  const videos = (await Promise.all(files.map(f => NBC.get(f)))).filter(Boolean);
  if (!videos.length) return;
  container.innerHTML = videos.map(v => {
    // Convert YouTube watch URL to embed URL
    let embedUrl = v.url || '';
    embedUrl = embedUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/');
    return `
      <div class="video-card reveal">
        <iframe src="${embedUrl}" title="${v.title || 'Video'}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
      </div>`;
  }).join('');
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LOAD: TESTIMONIALS ──
async function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  const files = await NBC.listFolder('testimonials');
  if (!files.length) return;
  const items = (await Promise.all(files.map(f => NBC.get(f)))).filter(Boolean);
  if (!items.length) return;
  const featured = items.filter(t => t.featured !== false);
  if (!featured.length) return;
  track.innerHTML = featured.map(t => `
    <div class="testimonial-card reveal">
      <div class="t-stars">${NBC.stars(t.rating)}</div>
      <p class="t-text">"${t.review}"</p>
      <div class="t-author">
        <div class="t-avatar">
          ${t.photo ? `<img src="${t.photo}" alt="${t.name}"/>` : '👩'}
        </div>
        <div>
          <div class="t-name">${t.name}</div>
          <div class="t-service">${t.service || ''}</div>
        </div>
      </div>
    </div>`).join('');
  track.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LOAD: TEAM ──
async function initTeam() {
  const container = document.getElementById('teamContainer');
  if (!container) return;
  const files = await NBC.listFolder('team');
  if (!files.length) return;
  const members = (await Promise.all(files.map(f => NBC.get(f)))).filter(Boolean)
    .sort((a, b) => (a.order || 99) - (b.order || 99));
  if (!members.length) return;
  container.innerHTML = members.map(m => `
    <div class="team-card reveal">
      <div class="team-photo">
        ${m.photo ? `<img src="${m.photo}" alt="${m.name}"/>` : '👩'}
      </div>
      <div class="team-name">${m.name}</div>
      <div class="team-role">${m.role}</div>
      <div class="team-skills">
        ${(m.skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    </div>`).join('');
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LOAD: BLOG ──
async function initBlog() {
  const container = document.getElementById('blogContainer');
  if (!container) return;
  const files = await NBC.listFolder('blog');
  if (!files.length) return;
  const posts = (await Promise.all(files.map(f => NBC.get(f)))).filter(p => p && p.published !== false);
  if (!posts.length) return;
  // Sort newest first, show 3
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const tagColors = { 'Haircare Tips': 'tag-gold', 'Skin Care': 'tag-green', 'Bridal Trends': 'tag-rose', 'Academy News': 'tag-gold', 'Offers': 'tag-rose' };
  container.innerHTML = posts.slice(0, 3).map(p => `
    <div class="card blog-card reveal">
      <div class="card-img">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title}" loading="lazy"/>`
          : `<div class="card-img-placeholder">✍️</div>`}
      </div>
      <div class="card-body">
        <span class="card-tag ${tagColors[p.category] || 'tag-gold'}">${p.category || 'News'}</span>
        <p class="blog-date">${NBC.formatDate(p.date)}</p>
        <h3>${p.title}</h3>
        <p class="blog-excerpt">${p.excerpt || ''}</p>
        <a href="/blog/posts/${p._file || ''}" class="read-more-link">Read More →</a>
      </div>
    </div>`).join('');
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LOAD: DOWNLOADS ──
async function initDownloads() {
  const container = document.getElementById('downloadsContainer');
  if (!container) return;
  const files = await NBC.listFolder('downloads');
  if (!files.length) return;
  const items = (await Promise.all(files.map(f => NBC.get(f)))).filter(d => d && d.public !== false);
  if (!items.length) return;
  container.innerHTML = items.map(d => `
    <div class="download-card reveal" data-category="${d.category || 'Other'}">
      <div class="file-icon ${NBC.fileClass(d.type)}">${NBC.fileIcon(d.type)}</div>
      <div class="file-info">
        <div class="file-name">${d.title}</div>
        <div class="file-meta">${d.type || 'File'}${d.size ? ' · ' + d.size : ''} · ${NBC.formatDate(d.date)}</div>
        ${d.description ? `<div class="file-meta">${d.description}</div>` : ''}
      </div>
      <button class="file-dl-btn" onclick="window.open('${d.file}','_blank')" title="Download">⬇</button>
    </div>`).join('');
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LOAD: ANNOUNCEMENTS ──
async function initAnnouncements() {
  const files = await NBC.listFolder('announcements');
  if (!files.length) return;
  const items = (await Promise.all(files.map(f => NBC.get(f)))).filter(a => a && a.active);
  if (!items.length) return;
  // Show latest active homepage announcement in bar
  const homeItems = items.filter(a => a.homepage);
  if (homeItems.length) {
    const bar = document.getElementById('announcementBar');
    const txt = document.getElementById('announcementText');
    if (bar && txt) {
      txt.textContent = homeItems[0].title;
      bar.style.display = 'block';
    }
  }
}

// ── LOAD: FAQ ──
async function initFAQ() {
  const container = document.getElementById('faqContainer');
  if (!container) return;
  const files = await NBC.listFolder('faq');
  if (!files.length) return;
  const items = (await Promise.all(files.map(f => NBC.get(f)))).filter(Boolean)
    .sort((a, b) => (a.order || 99) - (b.order || 99));
  if (!items.length) return;
  container.innerHTML = items.map(f => `
    <div class="faq-item">
      <div class="faq-question">${f.question} <span class="faq-icon">+</span></div>
      <div class="faq-answer"><p>${f.answer}</p></div>
    </div>`).join('');
  // Re-attach FAQ accordion
  container.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      container.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-answer').style.maxHeight = item.querySelector('.faq-answer').scrollHeight + 'px';
      }
    });
  });
}

// ── LOAD: CONTACT INFO ──
async function initContact() {
  const d = await NBC.get('/_data/contact.json');
  if (!d) return;
  // Update WhatsApp links
  if (d.whatsapp) {
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      const msg = encodeURIComponent('Hello Natural Beauty! I found you on your website and would like to enquire.');
      a.href = `https://wa.me/${d.whatsapp}?text=${msg}`;
    });
  }
  // Update social links
  if (d.facebook) document.querySelectorAll('[aria-label="Facebook"]').forEach(a => a.href = d.facebook);
  if (d.instagram) document.querySelectorAll('[aria-label="Instagram"]').forEach(a => a.href = d.instagram);
}

// ── TESTIMONIALS AUTO-SCROLL ──
function initTestimonialsScroll() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  let isPaused = false;
  track.addEventListener('mouseenter', () => isPaused = true);
  track.addEventListener('mouseleave', () => isPaused = false);
  track.addEventListener('touchstart', () => isPaused = true, { passive: true });
  setInterval(() => {
    if (isPaused || !track) return;
    track.scrollBy({ left: 360, behavior: 'smooth' });
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, 4000);
}

// ── ANNOUNCEMENT CLOSE ──
function initAnnouncementClose() {
  const bar = document.getElementById('announcementBar');
  if (!bar) return;
  const closeBtn = bar.querySelector('.ann-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.style.display = 'none';
      sessionStorage.setItem('nbc-ann-closed', '1');
    });
  }
  if (sessionStorage.getItem('nbc-ann-closed') === '1') bar.style.display = 'none';
}

// ── STICKY NAV SHADOW ──
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(26,10,16,0.1)' : '';
  }, { passive: true });
}

// ── BOOKING DATE: SET MIN TO TODAY ──
function initDateField() {
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}

// ══ MASTER INIT ══
document.addEventListener('DOMContentLoaded', async () => {
  initNavScroll();
  initAnnouncementClose();
  initTestimonialsScroll();
  initDateField();
  // Load all CMS data in parallel
  await Promise.allSettled([
    initHero(),
    initAbout(),
    initContact(),
    initAnnouncements(),
    initServices(),
    initCourses(),
    initGallery(),
    initVideos(),
    initTestimonials(),
    initTeam(),
    initBlog(),
    initDownloads(),
    initFAQ(),
  ]);
});
