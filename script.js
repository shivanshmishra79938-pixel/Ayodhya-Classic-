document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Luxury Loader
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';

        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';

        setTimeout(() => {
            loader.remove();
        }, 500);

    }, 1500);
});

    // 2. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth outline follow
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // 3. Sticky Navbar & Scroll Progress
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        // Navbar animation
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll progress
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        // Parallax Effect
        const parallax = document.querySelector('.hero-parallax-bg');
        let scrollValue = window.scrollY;
        parallax.style.transform = `translateY(${scrollValue * 0.5}px)`;
    });

    // 4. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // If it's a counter, start counting
                if(entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .about-img, .about-text, .menu-card, .counter').forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Counter Animation
    function startCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const count = 0;
        const speed = 2000 / target;

        const updateCount = () => {
            const current = parseFloat(el.innerText);
            if (current < target) {
                el.innerText = (current + (target / 100)).toFixed(target % 1 === 0 ? 0 : 1);
                setTimeout(updateCount, 20);
            } else {
                el.innerText = target + (target === 100 ? '%' : target === 4.8 ? '★' : '+');
            }
        };
        updateCount();
    }

    // 6. Testimonial Slider (Infinite Loop)
    const track = document.querySelector('.testimonial-track');
    let index = 0;

    function moveSlider() {
        index++;
        if (index > 1) index = 0;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
    setInterval(moveSlider, 5000);

    // 7. Form Validation & Submission
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('.btn-submit');
            const originalText = btn.innerText;
            
            btn.innerText = "Processing Gold Reservation...";
            btn.style.background = "#fff";
            
            setTimeout(() => {
                btn.innerText = "Table Reserved Successfully!";
                btn.style.background = "#28a745";
                btn.style.color = "#fff";
                bookingForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "#D4AF37";
                    btn.style.color = "#0B0B0B";
                }, 3000);
            }, 2000);
        });
    }

    // 8. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(11,11,11,0.95)';
        navLinks.style.padding = '20px';
    });
});
