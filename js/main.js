// ===== dewansas - Main JavaScript =====

(function () {
    'use strict';

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = navbar.offsetHeight + 20;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations with IntersectionObserver
    var animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry, index) {
                    if (entry.isIntersecting) {
                        // Stagger animation based on element position
                        var siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                        var siblingIndex = Array.prototype.indexOf.call(siblings, entry.target);
                        var delay = siblingIndex * 100;

                        setTimeout(function () {
                            entry.target.classList.add('visible');
                        }, delay);

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // Contact form handling
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var btn = contactForm.querySelector('button[type="submit"]');
        var originalText = btn.innerHTML;

        btn.innerHTML = '<span>Enviando...</span>';
        btn.disabled = true;

        // Simulate form submission (replace with real endpoint)
        setTimeout(function () {
            btn.innerHTML = '<span>Mensaje enviado</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
            btn.style.background = '#1a4731';

            setTimeout(function () {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });

    // Active nav link on scroll
    var sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        var scrollPos = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.querySelectorAll('a').forEach(function (a) {
                    a.classList.remove('active-link');
                });
                var activeLink = navLinks.querySelector('a[href="#' + id + '"]');
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });
})();
