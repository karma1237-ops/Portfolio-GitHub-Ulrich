// ==========================================
// PORTFOLIO ULRICH FOSSO - JavaScript
// ==========================================

/* ==================== CONFIGURATION ==================== */
const CONFIG = {
    particleCount: 80,
    animationSpeed: 0.5,
    scrollThreshold: 0.15
};

/* ==================== THEME TOGGLE ==================== */
class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Appliquer le thème sauvegardé
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateIcon();
        
        // Écouter le clic sur le bouton
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateIcon();
    }
    
    updateIcon() {
        if (this.themeIcon) {
            this.themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

/* ==================== NAVIGATION ==================== */
class Navigation {
    constructor() {
        this.nav = document.getElementById('mainNav');
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.handleMenuToggle();
        this.handleLinkClick();
        
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.nav?.classList.add('scrolled');
        } else {
            this.nav?.classList.remove('scrolled');
        }
    }
    
    handleMenuToggle() {
        this.menuToggle?.addEventListener('click', () => {
            this.menuToggle.classList.toggle('active');
            this.navMenu?.classList.toggle('active');
        });
    }
    
    handleLinkClick() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Fermer le menu mobile
                    this.menuToggle?.classList.remove('active');
                    this.navMenu?.classList.remove('active');
                }
            });
        });
    }
}

/* ==================== PARTICLE CANVAS ==================== */
class ParticleCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createParticles() {
        const particleCount = CONFIG.particleCount;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * CONFIG.animationSpeed,
                vy: (Math.random() - 0.5) * CONFIG.animationSpeed,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            // Interactivité avec la souris
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                particle.x -= dx / distance * 2;
                particle.y -= dy / distance * 2;
            }
            
            // Mouvement
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebonds
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Dessiner
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
            this.ctx.fill();
        });
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / 120})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawParticles();
        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }
}

/* ==================== TYPING EFFECT ==================== */
class TypingEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        
        if (this.element) {
            this.element.textContent = '';
            this.type();
        }
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

/* ==================== COUNTER ANIMATION ==================== */
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.checkPosition());
        this.checkPosition();
    }
    
    checkPosition() {
        if (this.hasAnimated) return;
        
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            this.animateCounters();
            this.hasAnimated = true;
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
}

/* ==================== SCROLL ANIMATIONS ==================== */
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('section, .expertise-card, .project-card, .timeline-item');
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.scrollThreshold,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

/* ==================== SKILL BARS ANIMATION ==================== */
class SkillBarsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-bar');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.skill-fill');
                    if (fill) {
                        setTimeout(() => {
                            fill.style.opacity = '1';
                            fill.style.transform = 'scaleX(1)';
                        }, 200);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        this.skillBars.forEach(bar => {
            const fill = bar.querySelector('.skill-fill');
            if (fill) {
                fill.style.opacity = '0';
                fill.style.transformOrigin = 'left';
                fill.style.transform = 'scaleX(0)';
                fill.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            observer.observe(bar);
        });
    }
}

/* ==================== CONTACT FORM ==================== */
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!data.name || !data.email || !data.message) {
            this.showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        if (!this.validateEmail(data.email)) {
            this.showMessage('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        const btn = this.form.querySelector('.btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Envoi en cours...</span>';
        btn.disabled = true;
        
        // Simulation d'envoi
        setTimeout(() => {
            this.showMessage('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
            this.form.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showMessage(message, type) {
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();
        
        const msgDiv = document.createElement('div');
        msgDiv.className = `form-message ${type}`;
        msgDiv.textContent = message;
        msgDiv.style.cssText = `
            padding: 1rem;
            margin-bottom: 1rem;
            border: 2px solid ${type === 'success' ? '#00ff88' : '#ff4444'};
            background: ${type === 'success' ? '#00ff8810' : '#ff444410'};
            color: ${type === 'success' ? '#00cc6a' : '#ff4444'};
            font-family: var(--font-mono);
            font-size: 0.9rem;
        `;
        
        this.form.insertBefore(msgDiv, this.form.firstChild);
        
        setTimeout(() => msgDiv.remove(), 5000);
    }
}

/* ==================== SCROLL TO TOP ==================== */
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollTop');
        if (this.button) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    toggleVisibility() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

/* ==================== SMOOTH SCROLLING ==================== */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==================== LAZY LOADING IMAGES ==================== */
class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        this.images.forEach(img => imageObserver.observe(img));
    }
}

/* ==================== CURSOR EFFECT ==================== */
class CustomCursor {
    constructor() {
        this.cursor = this.createCursor();
        this.cursorDot = this.createCursorDot();
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        
        this.init();
    }
    
    createCursor() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            width: 40px;
            height: 40px;
            border: 2px solid rgba(0, 255, 136, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
        `;
        document.body.appendChild(cursor);
        return cursor;
    }
    
    createCursorDot() {
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 8px;
            height: 8px;
            background: #00ff88;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
        `;
        document.body.appendChild(dot);
        return dot;
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            this.cursorDot.style.left = e.clientX - 4 + 'px';
            this.cursorDot.style.top = e.clientY - 4 + 'px';
        });
        
        this.animate();
        
        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .expertise-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.borderColor = 'rgba(0, 255, 136, 1)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.borderColor = 'rgba(0, 255, 136, 0.5)';
            });
        });
    }
    
    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * 0.1;
        this.cursorY += (this.mouseY - this.cursorY) * 0.1;
        
        this.cursor.style.left = this.cursorX - 20 + 'px';
        this.cursor.style.top = this.cursorY - 20 + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
}

/* ==================== PERFORMANCE MONITOR ==================== */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.fetchStart;
            console.log(`%c⚡ Portfolio chargé en ${loadTime}ms`, 'color: #00ff88; font-size: 14px; font-weight: bold;');
        });
    }
}

/* ==================== PROJECT FILTER (BONUS) ==================== */
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        
        if (this.filterButtons.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.projects.forEach(project => {
                    if (filter === 'all' || project.dataset.category === filter) {
                        project.style.display = 'grid';
                        setTimeout(() => project.classList.add('animate-in'), 100);
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
}

/* ==================== EASTER EGG - KONAMI CODE ==================== */
function initKonamiCode() {
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                          'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                          'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            document.body.style.animation = 'rainbow 3s linear infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 10000);
            
            console.log('%c🎉 KONAMI CODE ACTIVÉ !', 'color: #00ff88; font-size: 20px; font-weight: bold;');
        }
    });
}

/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Core features
    new ThemeToggle();
    new Navigation();
    new ParticleCanvas('particleCanvas');
    new CounterAnimation();
    new ScrollAnimations();
    new SkillBarsAnimation();
    new ContactForm();
    new ScrollToTop();
    new LazyLoadImages();
    new ProjectFilter();
    
    // Enhanced features
    if (window.innerWidth > 768) {
        new CustomCursor();
    }
    
    // Utilities
    initSmoothScrolling();
    initKonamiCode();
    monitorPerformance();
    
    // Typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        new TypingEffect(typingElement, text, 80);
    }
    
    // Console messages
    console.log('%c🚀 Portfolio Ulrich Fosso', 'color: #00ff88; font-size: 24px; font-weight: bold;');
    console.log('%c💼 Développeur Full-Stack | React • C# • Node.js', 'color: #0a0a0a; font-size: 14px;');
    console.log('%c📧 ulrichdalkin@gmail.com', 'color: #a0a0a0; font-size: 12px;');
    console.log('%c💡 Astuce: Tapez le code Konami pour un easter egg !', 'color: #00ff88; font-size: 12px; font-style: italic;');
});

/* ==================== PAGE VISIBILITY ==================== */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Revenez vite ! - Ulrich Fosso';
    } else {
        document.title = 'Ulrich Fosso - Développeur Full-Stack | Portfolio 2025';
    }
});

/* ==================== SERVICE WORKER (Progressive Web App) ==================== */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
