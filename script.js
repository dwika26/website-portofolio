// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll (match baby pink tone)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(254, 247, 249, 1)';
        navbar.style.boxShadow = '0 2px 12px rgba(244, 166, 199, 0.28)';
    } else {
        navbar.style.backgroundColor = 'rgba(254, 247, 249, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(244, 166, 199, 0.2)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hobby-card, .timeline-item, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero name (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroName, originalText, 150);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    // Auto-hide welcome after delay if present
    const welcome = document.getElementById('welcome');
    if (welcome) {
        const hide = () => {
            welcome.classList.add('hidden');
            // Re-enable page scroll after animation
            setTimeout(() => {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                welcome.removeAttribute('aria-modal');
            }, 650);
        };

        // Prevent scroll while welcome is visible
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // Button to enter site
        const enterBtn = document.getElementById('enter-site');
        if (enterBtn) {
            enterBtn.addEventListener('click', hide);
            // Keyboard accessibility
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (document.activeElement === enterBtn) {
                        e.preventDefault();
                        hide();
                    }
                }
            });
        }
    }
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Contact form handling (if you add a contact form later)
function handleContactForm(event) {
    event.preventDefault();
    // Add your contact form logic here
    console.log('Contact form submitted');
}

// Social media link handlers
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add analytics or tracking here if needed
        console.log('Social link clicked:', e.target.closest('a').href);
    });
});

// Add scroll progress indicator (optional)
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #64ffda, #4fd1c7);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Cursor Light Effect
class CursorLight {
    constructor() {
        this.cursor = null;
        this.init();
    }

    init() {
        // Create cursor light element
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-light';
        document.body.appendChild(this.cursor);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.updatePosition(e.clientX, e.clientY);
        });

        // Handle hover effects
        this.setupHoverEffects();
        
        // Handle click effects
        this.setupClickEffects();
    }

    updatePosition(x, y) {
        this.cursor.style.left = x - 150 + 'px'; // Center the 300px circle
        this.cursor.style.top = y - 150 + 'px';
    }

    setupHoverEffects() {
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .cta-button, .social-link, .hobby-card, .timeline-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }

    setupClickEffects() {
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });
    }
}

// Initialize cursor light when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CursorLight();
});

// Disable cursor light on mobile devices
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    // Remove cursor light on mobile
    document.addEventListener('DOMContentLoaded', () => {
        const cursorLight = document.querySelector('.cursor-light');
        if (cursorLight) {
            cursorLight.remove();
        }
    });
}
