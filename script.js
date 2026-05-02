document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('active');

        // Burger Animation
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Form Submission (Prevent default and show alert)
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value;
            
            // Simple validation simulation
            if(name) {
                alert(`Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`);
                contactForm.reset();
            }
        });
    }

    // Scroll Animation (Fade In)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial state for animated elements
    document.querySelectorAll('.glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Animate cursor dot
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate cursor outline with a slight delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .social-links a, .logo');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });

    // Interactive Text (Subtitle & Hero Desc)
    const interactiveText = document.querySelectorAll('.subtitle, .hero-desc');
    interactiveText.forEach(text => {
        text.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover-text');
        });
        text.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover-text');
            text.style.transform = 'translate(0, 0)';
        });

        text.addEventListener('mousemove', (e) => {
            const rect = text.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle magnetic effect
            text.style.transform = `translate(${x * 0.1}px, ${y * 0.2}px)`;
            text.style.transition = 'transform 0.1s ease-out';
        });
    });

    // Handle cursor on mobile (hide custom cursor)
    if ('ontouchstart' in window) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});
