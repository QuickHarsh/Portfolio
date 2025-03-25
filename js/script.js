document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        updateActiveMenuItem();
    });

    function updateActiveMenuItem() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links li a');
        
        let current = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ['Web Developer', 'Content Creator', 'Freelancer', 'Gamer'];
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 1100);
        }
    }
    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }
    const categoryButtons = document.querySelectorAll('.skill-categories .category');
    const skillsLists = document.querySelectorAll('.skills-list');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            skillsLists.forEach(list => list.classList.remove('active'));

            const category = button.getAttribute('data-category');
            document.querySelector(`.skills-list.${category}`).classList.add('active');
        });
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 100);
            }
        });
    }

    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            formStatus.textContent = `Thank you, ${name}! Your message has been sent.`;
            formStatus.classList.add('success');
            
            contactForm.reset();
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.classList.remove('success');
            }, 5000);
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize AOS (Animate On Scroll) - You would need to include AOS library for this
    // if (typeof AOS !== 'undefined') {
    //     AOS.init({
    //         duration: 1000,
    //         once: true,
    //         mirror: false
    //     });
    // }
}); 