document.addEventListener('DOMContentLoaded', function() {
    const DOM = {
        header: document.querySelector('header'),
        navLinks: document.querySelectorAll('.nav-links li a'),
        hamburger: document.querySelector('.hamburger'),
        mobileNav: document.querySelector('.nav-links'),
        skillBars: document.querySelectorAll('.skill-progress'),
        categoryButtons: document.querySelectorAll('.category'),
        skillLists: document.querySelectorAll('.skills-list'),
        filterButtons: document.querySelectorAll('.filter-btn'),
        projectCards: document.querySelectorAll('.project-card'),
        sections: document.querySelectorAll('section'),
        contactForm: document.getElementById('contactForm'),
        formStatus: document.getElementById('formStatus'),
        bgMusic: document.getElementById('bgMusic'),
        musicToggle: document.getElementById('musicToggle')
    };
    function setupAudioPlayer() {
        let musicEnabled = false;
        function initAudio() {
            if (!musicEnabled) {
                DOM.bgMusic.volume = 0.2;
                DOM.bgMusic.play().catch(error => {
                    console.log('Autoplay prevented by browser policy:', error);
                });
                musicEnabled = true;
            }
        }
        DOM.musicToggle.addEventListener('click', function() {
            if (DOM.bgMusic.paused) {
                DOM.bgMusic.play();
                this.classList.remove('muted');
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                DOM.bgMusic.pause();
                this.classList.add('muted');
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
        function initAudioOnInteraction() {
            document.body.addEventListener('click', initAudio, { once: true });
            document.body.addEventListener('touchstart', initAudio, { once: true });
            document.body.addEventListener('scroll', initAudio, { once: true });
            document.body.addEventListener('keydown', initAudio, { once: true });
        }
        initAudioOnInteraction();
    }
    
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    function setupMobileNav() {
        DOM.hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            DOM.mobileNav.classList.toggle('active');

            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        document.addEventListener('click', function(e) {
            if (!DOM.hamburger.contains(e.target) && !DOM.mobileNav.contains(e.target) && DOM.mobileNav.classList.contains('active')) {
                DOM.hamburger.classList.remove('active');
                DOM.mobileNav.classList.remove('active');
                
                const bars = DOM.hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        DOM.navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (DOM.mobileNav.classList.contains('active')) {
                    DOM.hamburger.classList.remove('active');
                    DOM.mobileNav.classList.remove('active');
                    
                    const bars = DOM.hamburger.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }

    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const headerHeight = DOM.header.offsetHeight;
                    
                    window.scrollTo({
                        top: offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Add sticky class to header
        if (scrollY > 50) {
            DOM.header.classList.add('sticky');
        } else {
            DOM.header.classList.remove('sticky');
        }
        
        const scrollPosition = window.scrollY;
        
        DOM.sections.forEach(section => {
            const sectionTop = section.offsetTop - DOM.header.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        animateElementsOnScroll();
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function animateElementsOnScroll() {
        // Animate skill bars when in view
        if (isElementInViewport(document.querySelector('.skills'))) {
            DOM.skillBars.forEach(bar => {
                if (!bar.classList.contains('animated')) {
                    const width = bar.parentElement.querySelector('.skill-info p').textContent;
                    bar.style.width = width;
                    bar.classList.add('animated');
                }
            });
        }
        
    }
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    function setupTypingEffect() {
        const typedTextSpan = document.querySelector('.typed-text');
        const textArray = ['Web Developer','Content Creator', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            if (!typedTextSpan) return;
            
            const currentText = textArray[textArrayIndex];
            
            if (isDeleting) {
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, newTextDelay);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? erasingDelay : typingDelay);
            }
        }
        if (typedTextSpan) {
            setTimeout(type, newTextDelay);
        }
    }

    function setupGlitchEffect() {
        const heroHeading = document.querySelector('.hero h1');
        const dataText = heroHeading?.getAttribute('data-text');
        
        if (!heroHeading || !dataText) return;
        
        let glitchInterval = null;
        
        function startRandomGlitch() {
            // Clear any existing interval
            if (glitchInterval) clearInterval(glitchInterval);
            
            glitchInterval = setInterval(() => {
                if (Math.random() > 0.7) {
                    createGlitch();
                }
            }, 3000);
        }
        
        function createGlitch() {
            heroHeading.classList.add('glitching');
        
            setTimeout(() => {
                heroHeading.classList.remove('glitching');
            }, 200);
        }

        startRandomGlitch();
        
        heroHeading.addEventListener('mouseenter', createGlitch);
    }

    function setupSkillTabs() {
        DOM.categoryButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                

                DOM.categoryButtons.forEach(button => {
                    button.classList.remove('active');
                });
                this.classList.add('active');
                

                DOM.skillLists.forEach(list => {
                    list.classList.remove('active');
                    if (list.classList.contains(category)) {
                        list.classList.add('active');
                    }
                });
            });
        });
    }

    function setupProjectFiltering() {
        DOM.filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                

                DOM.filterButtons.forEach(button => {
                    button.classList.remove('active');
                });
                this.classList.add('active');
                

                DOM.projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';

                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    function setupContactForm() {
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const formStatus = DOM.formStatus;
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                setTimeout(() => {
                    formStatus.innerHTML = `<p class="success">Message sent successfully! I'll get back to you soon.</p>`;
                    DOM.contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';

                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                }, 1500);
            });
        }
    }
    function addGlitchStyles() {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            .glitching {
                animation: glitch 0.2s linear;
            }
            
            @keyframes glitch {
                0% {
                    transform: translate(0);
                }
                20% {
                    transform: translate(-2px, 2px);
                }
                40% {
                    transform: translate(-2px, -2px);
                }
                60% {
                    transform: translate(2px, 2px);
                }
                80% {
                    transform: translate(2px, -2px);
                }
                100% {
                    transform: translate(0);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    setupMobileNav();
    setupSmoothScrolling();
    setupTypingEffect();
    addGlitchStyles();
    setupGlitchEffect();
    setupSkillTabs();
    setupProjectFiltering();
    setupContactForm();
    setupAudioPlayer();
    
    handleScroll();
});
window.addEventListener('beforeunload', function() {
    window.removeEventListener('scroll', handleScroll);
    
}); 