
        // Loading Screen
        window.addEventListener('load', () => {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 1500);
        });

        // Custom Cursor
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.style.transform = 'scale(1)';
            });
        });

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
        setInterval(createParticle, 300);

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
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
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.1)';
                nav.style.backdropFilter = 'blur(20px)';
            }
        });

        // Add parallax effect to floating icons
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.floating-icon');
            const speed = 0.5;

            parallax.forEach((element, index) => {
                const yPos = -(scrolled * speed * (index + 1) * 0.1);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Add dynamic tech orb rotation
        const techOrbs = document.querySelectorAll('.tech-orb');
        techOrbs.forEach((orb, index) => {
            orb.addEventListener('mouseenter', () => {
                orb.style.transform = `scale(1.2) rotateY(180deg) rotateZ(${index * 90}deg)`;
            });
            orb.addEventListener('mouseleave', () => {
                orb.style.transform = 'scale(1) rotateY(0deg) rotateZ(0deg)';
            });
        });

        // Add typing effect to hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                const heroTitle = document.querySelector('.hero-text h1');
                if (heroTitle) {
                    typeWriter(heroTitle, 'Istiaq\nAhmed', 150);
                }
            }, 2000);
        });

        // Contact Form Functionality
        const contactForm = document.getElementById('contact-form');
        const contactMessage = document.getElementById('contact-message');
        const submitBtn = document.querySelector('.form-submit-btn');

        // Form submission handler
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('user_name');
            const email = formData.get('user_email');
            const subject = formData.get('user_subject');
            const project = formData.get('user_project');
            
            // Validate form
            if (!name || !email || !subject || !project) {
                showMessage('Please fill in all fields! 📝', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = `
                <span class="btn-text">Sending...</span>
                <span class="btn-icon">⏳</span>
                <div class="btn-overlay"></div>
            `;
            submitBtn.disabled = true;
            
            try {
                // Simulate API call (replace with your actual EmailJS code)
                await simulateEmailSend(formData);
                
                // Success
                showMessage('Message sent successfully! 🎉 I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = `
                    <span class="btn-text">Message Sent!</span>
                    <span class="btn-icon">✅</span>
                    <div class="btn-overlay"></div>
                `;
                
                setTimeout(() => {
                    submitBtn.innerHTML = `
                        <span class="btn-text">Send Message</span>
                        <span class="btn-icon">🚀</span>
                        <div class="btn-overlay"></div>
                    `;
                    submitBtn.disabled = false;
                }, 3000);
                
            } catch (error) {
                showMessage('Oops! Something went wrong. Please try again. 😞', 'error');
                
                // Reset button
                submitBtn.innerHTML = `
                    <span class="btn-text">Send Message</span>
                    <span class="btn-icon">🚀</span>
                    <div class="btn-overlay"></div>
                `;
                submitBtn.disabled = false;
            }
        });

        // Show message function
        function showMessage(message, type) {
            contactMessage.textContent = message;
            contactMessage.className = `form-message ${type}`;
            
            setTimeout(() => {
                contactMessage.className = 'form-message';
            }, 5000);
        }

        // Simulate email sending (replace with actual EmailJS implementation)
        function simulateEmailSend(formData) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // 90% success rate for demo
                    if (Math.random() > 0.1) {
                        resolve();
                    } else {
                        reject(new Error('Network error'));
                    }
                }, 2000);
            });
        }

        // Add EmailJS integration
        // To use EmailJS, uncomment and configure the following:
        /*
        // Initialize EmailJS
        emailjs.init("YOUR_USER_ID");

        // Replace the simulateEmailSend function with this:
        function sendEmailWithEmailJS(formData) {
            return emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                user_name: formData.get('user_name'),
                user_email: formData.get('user_email'),
                user_subject: formData.get('user_subject'),
                user_project: formData.get('user_project')
            });
        }
        */

        // Enhanced form animations
        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
                this.parentElement.style.boxShadow = '0 10px 20px rgba(6, 182, 212, 0.1)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
                this.parentElement.style.boxShadow = 'none';
            });
        });
