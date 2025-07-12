// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Custom Cursor (Desktop only)
if (window.innerWidth > 768) {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.display = 'block';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
            cursorFollower.style.display = 'block';
        }, 100);
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .timeline-content, .career-stat-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = '#10b981';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '#ec4899';
        });
    });
}

// Particle System
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';

    document.getElementById('particles').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Create particles periodically
setInterval(createParticle, 500);

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Special animations for timeline items
            if (entry.target.classList.contains('timeline-item')) {
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1)';
                    }, 300);
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe all animation elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
        nav.style.backdropFilter = 'blur(30px)';
        nav.style.transform = 'translateX(-50%) scale(0.95)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.1)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.transform = 'translateX(-50%) scale(1)';
    }
});

// Resume Download Function


// Modern notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'linear-gradient(45deg, #10b981, #06b6d4)' : 'linear-gradient(45deg, #6366f1, #8b5cf6)'};
        color: white;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(20px);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const subject = formData.get('user_subject');
    const project = formData.get('user_project');

    // Simple validation
    if (!name || !email || !subject) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending... 📤';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual email service integration)
    setTimeout(() => {
        showNotification('Thank you for your message! I\'ll get back to you soon. 🚀', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Enhanced Interactive Effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    });
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
            marker.style.transform = 'scale(1)';
            marker.style.boxShadow = '';
        }

        content.style.boxShadow = '';
    });
});

// Project Cards Enhanced Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const projectImage = card.querySelector('.project-image');
        projectImage.style.transform = 'scale(1.05)';
        projectImage.style.filter = 'brightness(1.1)';
    });

    card.addEventListener('mouseleave', () => {
        const projectImage = card.querySelector('.project-image');
        projectImage.style.transform = 'scale(1)';
        projectImage.style.filter = 'brightness(1)';
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
                    animateCounter(stat, 0, numValue, 1500, hasPlus, hasPercent);
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
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

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

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Performance optimizations
let ticking = false;

function updateOnScroll() {
    // Parallax effect for hero section
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
    }

    // Update particles position
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const speed = parseFloat(particle.dataset.speed) || 1;
        particle.style.transform = `translateY(${scrolled * speed * 0.05}px)`;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Initialize particles with random speeds
function initializeParticles() {
    setInterval(() => {
        createParticle();
    }, 800);
}

// Enhanced particle creation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDuration = (Math.random() * 15 + 8) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.dataset.speed = (Math.random() * 2 + 0.5).toString();

    // Random particle colors
    const colors = ['#06b6d4', '#6366f1', '#8b5cf6', '#10b981'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.getElementById('particles').appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 25000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Initialize enhanced features
    initializeParticles();

    // Add focus styles for accessibility
    document.querySelectorAll('a, button, input, textarea').forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #06b6d4';
            element.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Add smooth transitions when changing themes or color schemes
function applyThemeTransition() {
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Enhanced error handling for resume download
function downloadResume() {
    try {
        // You should replace this with your actual resume file path
        const resumeUrl = '  https://drive.google.com/file/d/1v1EAaGLf0Gl0Q3gFQUjRSp3AoTrB1evx/view?usp=sharing';
        window.open(resumeUrl, '_blank');

        // Show success message with modern styling
        showNotification('Resume download started! 📄✨', 'success');

        // Analytics tracking (replace with your analytics service)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'Resume',
                'event_label': 'Istiaq Ahmed Resume'
            });
        }

    } catch (error) {
        console.error('Resume download error:', error);
        showNotification('Sorry, resume download failed. Please try again later.', 'error');
    }
}

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
    } else {
        field.style.borderColor = '#10b981';
    }

    return isValid;
}

// Print styles optimization
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});