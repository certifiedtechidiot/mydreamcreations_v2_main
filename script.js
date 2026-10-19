// ===================================================
// DREAM CREATION EVENTS - THEME 2 SCRIPT
// "Extraordinary Events, Lasting Memories"
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  initScrollAnimations();
  initNavbarScroll();
  startHeroSlideshow();
  startCreationsAutoRotate();
  startTestimonialsAutoRotate();
});

// ===================================================
// 1. SCROLL REVEAL (INTERSECTION OBSERVER)
// ===================================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '40px 0px 40px 0px'
  });

  elements.forEach(el => observer.observe(el));

  // Safety fallback: reveal any near-viewport items after load even if scroll event didn't trigger
  setTimeout(() => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 250) {
        el.classList.add('in-view');
      }
    });
  }, 600);
}

// ===================================================
// 2. NAVBAR SCROLL EFFECT
// ===================================================
function initNavbarScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===================================================
// 3. HERO SLIDESHOW WITH TIMED PHOTO INTERVALS
// ===================================================
let currentHeroSlide = 0;
let heroTimer = null;
const heroInterval = 4800;

function nextHeroSlide() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  slides[currentHeroSlide].classList.remove('active');
  currentHeroSlide = (currentHeroSlide + 1) % slides.length;
  slides[currentHeroSlide].classList.add('active');
}

function startHeroSlideshow() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, heroInterval);
}

// ===================================================
// 4. CREATIONS MOSAIC ROTATION
// ===================================================
const creationsData = [
  {
    big: 'assets/creation_centerpiece_pin.jpg',
    sub1: 'assets/creation_pavilion_pin.jpg',
    sub2: 'assets/creation_neon_pin.jpg'
  },
  {
    big: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    sub1: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=85',
    sub2: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85'
  },
  {
    big: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
    sub1: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85',
    sub2: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85'
  }
];

let currentCreationsIndex = 0;
let creationsTimer = null;

function rotateCreationsGallery() {
  currentCreationsIndex = (currentCreationsIndex + 1) % creationsData.length;
  const set = creationsData[currentCreationsIndex];

  const bigImg = document.getElementById('mosaicBigImg');
  const sub1 = document.getElementById('mosaicSub1');
  const sub2 = document.getElementById('mosaicSub2');

  [bigImg, sub1, sub2].forEach(img => {
    if (img) img.style.opacity = '0.3';
  });

  setTimeout(() => {
    if (bigImg) bigImg.src = set.big;
    if (sub1) sub1.src = set.sub1;
    if (sub2) sub2.src = set.sub2;

    [bigImg, sub1, sub2].forEach(img => {
      if (img) img.style.opacity = '1';
    });
  }, 200);
}

function startCreationsAutoRotate() {
  if (creationsTimer) clearInterval(creationsTimer);
  creationsTimer = setInterval(rotateCreationsGallery, 5500);
}

// ===================================================
// 5. TESTIMONIALS SLIDER
// ===================================================
const clientTestimonials = [
  {
    quote: '"Dream Creation made our wedding an absolute dream! Every detail was taken care of, and the team went above and beyond. Truly a memorable experience!"',
    name: 'Aarushi Mehta',
    role: 'Bride',
    avatar: 'assets/client_avatar_pin.jpg'
  },
  {
    quote: '"Zaan and the Dream Creation team handled our destination celebration in Goa with such effortless poise. The lighting, floral stage, and ambiance were unforgettable."',
    name: 'Kabir & Tanya',
    role: 'Couple',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    quote: '"Professional, punctual, and visionary. From the 3D stage sketches to the actual day-of execution, they delivered far beyond our highest expectations!"',
    name: 'Rehan & Zoya',
    role: 'Nikah & Reception in Panaji',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];

let activeTestimonial = 0;
let testimonialTimer = null;

function setClientTestimonial(index) {
  activeTestimonial = index;
  const qEl = document.getElementById('clientQuoteText');
  const nEl = document.getElementById('clientNameText');
  const rEl = document.getElementById('clientRoleText');
  const aEl = document.getElementById('clientAvatarImg');
  const dots = document.querySelectorAll('.t-dots .t-dot');

  if (qEl && nEl && rEl) {
    qEl.style.opacity = '0';
    nEl.style.opacity = '0';
    rEl.style.opacity = '0';
    if (aEl) aEl.style.opacity = '0';

    setTimeout(() => {
      qEl.innerText = clientTestimonials[index].quote;
      nEl.innerText = clientTestimonials[index].name;
      rEl.innerText = clientTestimonials[index].role;
      if (aEl) aEl.src = clientTestimonials[index].avatar;

      qEl.style.opacity = '1';
      nEl.style.opacity = '1';
      rEl.style.opacity = '1';
      if (aEl) aEl.style.opacity = '1';
    }, 200);
  }

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextClientTestimonial() {
  activeTestimonial = (activeTestimonial + 1) % clientTestimonials.length;
  setClientTestimonial(activeTestimonial);
}

function prevClientTestimonial() {
  activeTestimonial = (activeTestimonial - 1 + clientTestimonials.length) % clientTestimonials.length;
  setClientTestimonial(activeTestimonial);
}

function startTestimonialsAutoRotate() {
  if (testimonialTimer) clearInterval(testimonialTimer);
  testimonialTimer = setInterval(nextClientTestimonial, 6500);
}

// ===================================================
// 6. CONSULTATION MODAL (DIRECT WHATSAPP)
// ===================================================
function openConsultModal() {
  const modal = document.getElementById('consultModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function openConsultModalWithTopic(topic) {
  openConsultModal();
  const select = document.getElementById('cTopic');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === topic) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function closeConsultModal() {
  const modal = document.getElementById('consultModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function handleConsultBackdrop(e) {
  if (e.target.id === 'consultModal') {
    closeConsultModal();
  }
}

function handleConsultSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value;
  const topic = document.getElementById('cTopic').value;
  const details = document.getElementById('cDetails').value;
  const message = document.getElementById('cMessage').value;

  const text = `Hello Dream Creation Events team! 💐\n\n` +
    `My name is *${name}*.\n` +
    `*Occasion:* ${topic}\n` +
    `*Date & Location in Goa:* ${details}\n` +
    `*Vision & Notes:* ${message || 'I would like to discuss event planning and decor.'}\n\n` +
    `Please let me know your availability for a free consultation!`;

  const phone = '918788149303';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  closeConsultModal();
}

function openVideoStoryModal() {
  // Directly opens WhatsApp to request video reel portfolio
  const text = `Hi Zaan! 🎥 I was on your website and would love to watch your latest event story reels and video portfolios in Goa.`;
  window.open(`https://wa.me/918788149303?text=${encodeURIComponent(text)}`, '_blank');
}

// ===================================================
// 7. MOBILE MENU DRAWER
// ===================================================
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  const btn = document.getElementById('mobileToggleBtn');
  if (drawer && btn) {
    const isOpen = drawer.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  const btn = document.getElementById('mobileToggleBtn');
  if (drawer && btn) {
    drawer.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }
}

