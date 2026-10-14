const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.matchMedia('(max-width: 768px)').matches;

// Loading Screen
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}
window.addEventListener('load', () => setTimeout(hideLoading, 300));
// Safety net: never keep visitors waiting on a slow third-party resource
setTimeout(hideLoading, 4000);

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const isOpen = mobileMenu.classList.toggle('active');
    document.querySelector('.mobile-menu-btn').setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
}

// Custom Cursor (mouse/trackpad devices only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    });

    // Follower eases towards the pointer
    (function followCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(followCursor);
    })();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .timeline-content, .career-stat-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = '#10b981';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = '';
            cursor.style.background = '';
        });
    });
}

// Particle System
const MAX_PARTICLES = isMobile ? 15 : 40;

function createParticle() {
    const container = document.getElementById('particles');
    if (document.hidden || container.childElementCount >= MAX_PARTICLES) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDuration = (Math.random() * 15 + 8) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';

    // Random particle colors
    const colors = ['#06b6d4', '#6366f1', '#8b5cf6', '#10b981'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);

    setTimeout(() => particle.remove(), 25000);
}

if (!prefersReducedMotion) {
    setInterval(createParticle, isMobile ? 1200 : 700);
}

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);

            // Special animations for timeline items
            if (entry.target.classList.contains('timeline-item') && !prefersReducedMotion) {
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        entry.target.style.transform = '';
                    }, 300);
                }, 200);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = href.length > 1 && document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect + hero parallax
const nav = document.querySelector('nav');
const heroSection = document.querySelector('.hero');
let ticking = false;

function updateOnScroll() {
    const scrolled = window.scrollY;
    nav.classList.toggle('scrolled', scrolled > 100);

    if (!prefersReducedMotion && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, { passive: true });

// Highlight the nav link of the section in view
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));

// Modern notification system
function showNotification(message, type = 'info') {
    const backgrounds = {
        success: 'linear-gradient(45deg, #10b981, #06b6d4)',
        error: 'linear-gradient(45deg, #ef4444, #f97316)',
        info: 'linear-gradient(45deg, #6366f1, #8b5cf6)'
    };
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', type === 'error' ? 'alert' : 'status');
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        left: auto;
        max-width: calc(100vw - 40px);
        padding: 1rem 1.5rem;
        background: ${backgrounds[type] || backgrounds.info};
        color: white;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10002;
        transform: translateX(calc(100% + 40px));
        transition: all 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(calc(100% + 40px))';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Contact Form Submission

(function loadEmailJS() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
    script.onload = () => {
        // Initialize EmailJS after SDK is loaded
        emailjs.init("esldnNNnjd2oMImcZ");
    };
    script.onerror = () => {
        console.error("Failed to load EmailJS SDK");
    };
    document.head.appendChild(script);
})();


document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('user_name');
    const userEmail = formData.get('user_email');
    const subject = formData.get('user_subject');

    // Simple validation
    if (!name || !userEmail || !subject) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }

    if (typeof emailjs === 'undefined') {
        showNotification('Email service is still loading. Please try again in a moment.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending... 📤';
    submitBtn.disabled = true;

    try {
        // ✅ Send email using EmailJS
        await emailjs.sendForm('service_zuc9me4', 'template_cpjtf1i', this);

        // Success message
        showNotification('Thank you for your message! I\'ll get back to you soon. 🚀', 'success');
        this.reset();
        this.querySelectorAll('.form-input, .form-textarea').forEach(field => {
            field.style.borderColor = '';
        });
    } catch (error) {
        console.error('EmailJS Error:', error);
        showNotification('Oops! Something went wrong. Please try again later. 😞', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Timeline Interactive Effects
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');

        if (!item.classList.contains('current')) {
            marker.style.transform = 'scale(1.1)';
            marker.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.4)';
        }

        // Add subtle glow effect
        content.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 20px rgba(6, 182, 212, 0.1)';
    });

    item.addEventListener('mouseleave', () => {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');

        if (!item.classList.contains('current')) {
            marker.style.transform = '';
            marker.style.boxShadow = '';
        }

        content.style.boxShadow = '';
    });
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.career-stat-number, .hero-stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const hasPlus = finalValue.includes('+');
                const hasPercent = finalValue.includes('%');
                const numValue = parseInt(finalValue.replace(/[^\d]/g, ''));

                if (!isNaN(numValue) && !stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                    animateCounter(stat, 0, numValue, prefersReducedMotion ? 0 : 1500, hasPlus, hasPercent);
                }
            });
        }
    });
});

document.querySelectorAll('.career-stats, .hero-stats').forEach(stats => {
    statsObserver.observe(stats);
});

function animateCounter(element, start, end, duration, hasPlus = false, hasPercent = false) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = duration ? Math.min((timestamp - startTimestamp) / duration, 1) : 1;

        // Easing function for smoother animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(easeOutCubic * (end - start) + start);

        let displayValue = value.toString();
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';

        element.textContent = displayValue;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Screenshot Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
let gallery = [];
let galleryIndex = 0;
let lastFocused = null;

function showSlide(index) {
    galleryIndex = (index + gallery.length) % gallery.length;
    const shot = gallery[galleryIndex];
    lightboxImg.src = shot.dataset.full || shot.src;
    lightboxImg.alt = shot.alt;
    lightboxCaption.textContent = `${shot.alt} (${galleryIndex + 1}/${gallery.length})`;
}

function openLightbox(images, index = 0) {
    gallery = images;
    lastFocused = document.activeElement;
    showSlide(index);
    lightbox.hidden = false;
    lightbox.querySelectorAll('.lightbox-nav').forEach(btn => {
        btn.style.visibility = gallery.length > 1 ? 'visible' : 'hidden';
    });
    requestAnimationFrame(() => lightbox.classList.add('open'));
    document.body.classList.add('no-scroll');
    lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
        lightbox.hidden = true;
    }, 250);
    if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('.project-shots').forEach(shots => {
    shots.addEventListener('click', (e) => {
        const images = [...shots.querySelectorAll('img')];
        const clicked = images.indexOf(e.target);
        openLightbox(images, clicked > -1 ? clicked : 0);
    });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showSlide(galleryIndex - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showSlide(galleryIndex + 1));
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-figure')) closeLightbox();
});

// Swipe between screenshots on touch devices
let touchStartX = null;
lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });
lightbox.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) showSlide(galleryIndex + (deltaX < 0 ? 1 : -1));
    touchStartX = null;
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.hidden) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showSlide(galleryIndex + 1);
        if (e.key === 'ArrowLeft') showSlide(galleryIndex - 1);
        return;
    }
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Resume Download
document.getElementById('resume-download').addEventListener('click', () => {
    showNotification('Resume download started! 📄✨', 'success');

    // Optional: Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'Resume',
            'event_label': 'Istiaq Ahmed Resume'
        });
    }
});

// Add contact form validation feedback
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('blur', function () {
        validateField(this);
    });

    input.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Remove previous error styling
    field.classList.remove('error');
    field.style.borderColor = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }

    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
    } else if (value) {
        field.style.borderColor = '#10b981';
    }

    return isValid;
}

// Footer year
document.getElementById('footer-year').textContent = new Date().getFullYear();
