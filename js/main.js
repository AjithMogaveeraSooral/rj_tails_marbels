/* ============================================
   RJ TILES AND GRANITES - Main JavaScript
   GSAP Animations & Interactive Features
   ============================================ */

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ---- Preloader ----
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const barFill = document.querySelector('.preloader-bar-fill');

    // Animate the loading bar
    gsap.to(barFill, {
        width: '100%',
        duration: 1.8,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    preloader.classList.add('hidden');
                    preloader.style.display = 'none';
                    initHeroAnimations();
                }
            });
        }
    });
});

// ---- Hero Animations ----
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }});

    tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2
    })
    .to('.hero-title-line', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15
    }, '-=0.6')
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-scroll-indicator', {
        opacity: 1,
        duration: 0.8
    }, '-=0.3');
}

// ---- Hero Slider ----
const heroSlides = document.querySelectorAll('.hero-slide');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    heroSlides[currentSlide].classList.remove('active');
    sliderDots[currentSlide].classList.remove('active');
    currentSlide = index;
    heroSlides[currentSlide].classList.add('active');
    sliderDots[currentSlide].classList.add('active');
}

function nextSlide() {
    const next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 6000);
}

sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(parseInt(dot.dataset.slide));
        startSlider();
    });
});

startSlider();

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Update active nav link
    updateActiveNavLink();
});

backToTop.addEventListener('click', () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power3.inOut' });
});

// ---- Active Nav Link ----
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ---- Mobile Menu ----
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ---- Smooth Scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: 80 },
                ease: 'power3.inOut'
            });
        }
    });
});

// ---- GSAP ScrollTrigger Reveal Animations ----
function initScrollAnimations() {
    // Reveal Up
    gsap.utils.toArray('.reveal-up').forEach(el => {
        const delay = parseFloat(el.dataset.delay) || 0;
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: delay,
            ease: 'power3.out'
        });
    });

    // Reveal Left
    gsap.utils.toArray('.reveal-left').forEach(el => {
        const delay = parseFloat(el.dataset.delay) || 0;
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: delay,
            ease: 'power3.out'
        });
    });

    // Reveal Right
    gsap.utils.toArray('.reveal-right').forEach(el => {
        const delay = parseFloat(el.dataset.delay) || 0;
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: delay,
            ease: 'power3.out'
        });
    });

    // Reveal Scale
    gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'back.out(1.2)'
        });
    });

    // Parallax effect on showcase sections
    gsap.utils.toArray('.showcase-parallax, .cta-parallax').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPositionY: '30%',
            ease: 'none'
        });
    });

    // Product cards stagger animation
    ScrollTrigger.batch('.product-card', {
        start: 'top 85%',
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.9,
                ease: 'power3.out'
            });
        }
    });

    // Gallery items entrance
    ScrollTrigger.batch('.gallery-item', {
        start: 'top 90%',
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.7,
                ease: 'power3.out'
            });
        }
    });
}

// ---- Counter Animation ----
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const target = parseInt(counter.dataset.count);
                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: 'power2.out',
                    modifiers: {
                        innerText: val => Math.floor(val).toLocaleString()
                    }
                });
            }
        });
    });
}

// ---- Gallery Filter ----
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                        onStart: () => item.classList.remove('hidden')
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => item.classList.add('hidden')
                    });
                }
            });
        });
    });
}

// ---- Lightbox ----
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ---- Contact Form ----
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate inputs
        if (!data.name || !data.phone || !data.email || !data.service || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Simulate form submission
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent! &#10003;</span>';
            btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2500);

            showNotification('Thank you! We will contact you shortly.', 'success');
        }, 1500);
    });
}

function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<p>${message}</p>`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        font-size: 0.9rem;
        font-family: var(--font-body);
        z-index: 10001;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        transform: translateX(120%);
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 500);
    }, 3500);
}

// ---- Magnetic Hover Effect for Buttons ----
function initMagneticButtons() {
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.15,
                    y: y * 0.15,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }
}

// ---- Tilt Effect on Product Cards ----
function initTiltCards() {
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(card, {
                    rotationY: x * 8,
                    rotationX: -y * 8,
                    duration: 0.4,
                    ease: 'power2.out',
                    transformPerspective: 800
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }
}

// ---- Text Shimmer Animation on Gold Text ----
function initGoldShimmer() {
    gsap.utils.toArray('.text-gold').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            backgroundPosition: '200% center',
            duration: 2,
            ease: 'power2.inOut'
        });
    });
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initCounters();
    initGalleryFilter();
    initLightbox();
    initContactForm();
    initMagneticButtons();
    initTiltCards();
    initGoldShimmer();
});
