document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loader Animation ---
    const loader = document.querySelector('.loader');
    const loaderLine = document.querySelector('.loader-line');
    
    setTimeout(() => {
        loaderLine.style.width = '100px';
    }, 100);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 1000);
        }, 1200);
    });

    // --- 2. Custom Cursor (Optimized) ---
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth follower movement
    function renderCursor() {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;
        
        follower.style.transform = `translate3d(${posX - 16}px, ${posY - 16}px, 0)`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover interactions
    document.querySelectorAll('a, button, .menu-item').forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.transform += ' scale(1.5)';
            follower.style.background = 'rgba(212, 175, 55, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.background = 'transparent';
        });
    });

    // --- 3. Scroll Reveal Engine ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .counter').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 4. Counter Animation Logic ---
    function animateCounter(el) {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const increment = target / 100;

        if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(el), 30);
        } else {
            el.innerText = target + (target === 4.8 ? '' : '+');
        }
    }

    // --- 5. Navbar Scrolled State ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 6. Parallax Hero & Image Effect ---
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        const heroImg = document.querySelector('.hero-image');
        if (heroImg) {
            heroImg.style.transform = `translate3d(0, ${scroll * 0.4}px, 0) scale(1.1)`;
        }
    });

    // --- 7. Form Submission Micro-interaction ---
    const form = document.getElementById('resForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const span = btn.querySelector('span');
            
            span.innerText = "Verifying Table Availability...";
            
            setTimeout(() => {
                span.innerText = "Royal Table Reserved!";
                btn.style.background = "#28a745";
                form.reset();
                
                setTimeout(() => {
                    span.innerText = "Confirm Booking";
                    btn.style.background = "var(--gold)";
                }, 3000);
            }, 2000);
        });
    }
});