// ==========================================================================
// GÉNÉRAL & INITIALISATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser toutes les fonctionnalités
    initNavigation();
    initScrollAnimations();
    initBannerEffects();
    initSkillsSection();
    initProjects();
    initContactForm();
    initAdvancedSkills();
    initScrollEvents();
});

// ==========================================================================
// NAVIGATION RESPONSIVE
// ==========================================================================

function initNavigation() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle menu burger
    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu au clic sur un lien
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Changement d'opacité du header au scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// ANIMATIONS AU DÉFILEMENT
// ==========================================================================

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    // Fonction pour vérifier si un élément est visible
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    // Fonction pour animer les éléments
    function handleScrollAnimation() {
        animateElements.forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('animated')) {
                const animationType = el.getAttribute('data-animate');
                
                if (animationType === 'from-left') {
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                } else if (animationType === 'from-right') {
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                } else {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
                
                el.classList.add('animated');
            }
        });
    }
    
    // Initialiser les styles pour l'animation
    animateElements.forEach(el => {
        const animationType = el.getAttribute('data-animate');
        
        if (animationType === 'from-left') {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        } else if (animationType === 'from-right') {
            el.style.opacity = '0';
            el.style.transform = 'translateX(50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
    });
    
    // Écouter l'événement scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Vérifier les éléments visibles au chargement
    handleScrollAnimation();
}

// ==========================================================================
// EFFETS DE LA BANNIÈRE
// ==========================================================================

function initBannerEffects() {
    // Animation du texte rotatif
    const words = document.querySelectorAll('.rotator-word');
    let currentWordIndex = 0;
    
    function rotateWords() {
        // Retirer la classe active du mot actuel
        words[currentWordIndex].classList.remove('active');
        
        // Passer au mot suivant
        currentWordIndex = (currentWordIndex + 1) % words.length;
        
        // Ajouter la classe active au nouveau mot
        words[currentWordIndex].classList.add('active');
    }
    
    // Démarrer la rotation des mots toutes les 3 secondes
    setInterval(rotateWords, 3000);
    
    // Animation des statistiques en temps réel
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 secondes
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.round(current);
        }, 16);
    });
    
    // Animation des icônes quantiques
    const quantumIcons = document.querySelectorAll('.icon-float');
    
    quantumIcons.forEach(icon => {
        // Animation de flottement aléatoire
        setInterval(() => {
            const x = Math.random() * 20 - 10; // -10px à +10px
            const y = Math.random() * 20 - 10;
            
            icon.style.transform = `translate(${x}px, ${y}px)`;
        }, 3000);
    });
    
    // Animation du cube 3D
    const cube = document.querySelector('.cube-3d');
    let rotationX = 0;
    let rotationY = 0;
    
    // Rotation automatique
    setInterval(() => {
        rotationX += 0.5;
        rotationY += 0.5;
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }, 50);
    
    // Rotation au mouvement de la souris
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        
        cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
}

// ==========================================================================
// SECTION COMPÉTENCES
// ==========================================================================

function initSkillsSection() {
    const scrollContainer = document.querySelector('.skills-scroll-wrapper');
    const scrollContent = document.querySelector('.skills-scroll-content');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    const scrollDots = document.querySelector('.scroll-dots');
    
    // Créer les indicateurs de défilement
    const cardCount = document.querySelectorAll('.skill-scroll-card').length;
    const cardsPerView = Math.floor(scrollContainer.clientWidth / 230); // 230px = largeur de carte + gap
    
    for (let i = 0; i < Math.ceil(cardCount / cardsPerView); i++) {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        scrollDots.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.scroll-dots span');
    
    // Mettre à jour les indicateurs
    function updateDots() {
        const scrollPosition = scrollContainer.scrollLeft;
        const cardWidth = 230; // Largeur approximative d'une carte avec gap
        const currentIndex = Math.round(scrollPosition / (cardWidth * cardsPerView));
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Défilement avec les boutons
    scrollLeftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -scrollContainer.clientWidth, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: 'smooth' });
    });
    
    // Mettre à jour les indicateurs au défilement
    scrollContainer.addEventListener('scroll', updateDots);
    
    // Animation des barres de progression
    const progressBars = document.querySelectorAll('.skill-progress');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.setProperty('--level', `${level}%`);
        });
    }
    
    // Animer les barres quand elles sont visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// ==========================================================================
// SECTION PROJETS
// ==========================================================================

function initProjects() {
    const projects = document.querySelectorAll('.projet');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            // Effet de profondeur
            this.style.zIndex = '10';
        });
        
        project.addEventListener('mouseleave', function() {
            // Réinitialiser l'effet de profondeur
            setTimeout(() => {
                this.style.zIndex = '1';
            }, 300);
        });
    });
}

// ==========================================================================
// SECTION CONTACT
// ==========================================================================

function initContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // Ici, normalement, on enverrait les données à un serveur
            // Pour l'exemple, on simule un envoi réussi
            
            // Animation de succès
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff9d, #00cc7a)';
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Réinitialiser le bouton après 3 secondes
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, var(--primary-dark), var(--primary))';
            }, 3000);
            
            console.log('Formulaire soumis:', formValues);
        });
    }
}

// ==========================================================================
// COMPÉTENCES TECHNIQUES AVANCÉES
// ==========================================================================

function initAdvancedSkills() {
    // Animation des graphiques 3D
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        const fill = bar.querySelector('.bar-fill');
        
        // Définir la hauteur de la barre après un délai
        setTimeout(() => {
            fill.style.height = `${value}%`;
        }, 500);
    });
    
    // Animation des cubes de compétences
    const skillCubes = document.querySelectorAll('.skill-cube');
    
    skillCubes.forEach(cube => {
        cube.addEventListener('mouseenter', function() {
            const skill = this.getAttribute('data-skill');
            console.log(`Compétence survolée: ${skill}`);
        });
    });
    
    // Animation de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const year = item.getAttribute('data-year');
        const dot = item.querySelector('.timeline-dot');
        
        // Ajouter l'année comme tooltip
        dot.setAttribute('title', year);
    });
    
    // Animation des indicateurs de progression
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Observer les étapes de progression
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Activer les étapes une par une
                progressSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('active');
                    }, index * 500);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const progressIndicator = document.querySelector('.skills-progress-indicator');
    if (progressIndicator) {
        progressObserver.observe(progressIndicator);
    }
}

// ==========================================================================
// GESTION DU DÉFILEMENT
// ==========================================================================

function initScrollEvents() {
    // Animation des caractères de défilement
    const scrollChars = document.querySelectorAll('.scroll-char');
    
    // Ajouter une animation de vague continue
    setInterval(() => {
        scrollChars.forEach(char => {
            char.style.animation = 'none';
            setTimeout(() => {
                char.style.animation = '';
            }, 10);
        });
    }, 1500);
    
    // Effet de parallaxe sur les sections
    const parallaxSections = document.querySelectorAll('.banner, .about, .skills-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const rate = scrolled * -0.5;
            section.style.backgroundPositionY = `${rate}px`;
        });
    });
    
    // Highlight du lien de navigation actif
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Lancer l'highlight au chargement
    highlightNavLink();
}

// ==========================================================================
// CANVAS ANIMATIONS
// ==========================================================================

// Initialiser les animations Canvas
function initCanvasAnimations() {
    // Canvas pour le réseau neuronal
    const neuralCanvas = document.getElementById('neuralCanvas');
    const webCanvas = document.getElementById('webCanvas');
    const radarCanvas = document.getElementById('radarCanvas');
    
    if (neuralCanvas) initNeuralNetwork(neuralCanvas);
    if (webCanvas) initConnectionWeb(webCanvas);
    if (radarCanvas) initRadarChart(radarCanvas);
}

// Réseau neuronal
function initNeuralNetwork(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Définir la taille du canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Nœuds du réseau
    const nodes = [];
    const nodeCount = 15;
    
    // Créer les nœuds
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
    
    // Fonction de dessin
    function draw() {
        // Effacer le canvas avec un fond semi-transparent pour l'effet de traînée
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Mettre à jour et dessiner les nœuds
        nodes.forEach(node => {
            // Mettre à jour la position
            node.x += node.speedX;
            node.y += node.speedY;
            
            // Rebond sur les bords
            if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
            if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
            
            // Dessiner le nœud
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4ff';
            ctx.fill();
        });
        
        // Dessiner les connexions
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Dessiner une ligne si les nœuds sont proches
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * (1 - distance/100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        // Continuer l'animation
        requestAnimationFrame(draw);
    }
    
    // Démarrer l'animation
    draw();
    
    // Redimensionner le canvas avec la fenêtre
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Web de connexions
function initConnectionWeb(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Définir la taille du canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Points fixes pour la toile
    const points = [];
    const pointCount = 8;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 3;
    
    // Créer les points en cercle
    for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 2;
        points.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            baseX: centerX + Math.cos(angle) * radius,
            baseY: centerY + Math.sin(angle) * radius,
            offsetX: 0,
            offsetY: 0,
            speed: Math.random() * 0.05 + 0.02,
            angle: Math.random() * Math.PI * 2
        });
    }
    
    // Fonction de dessin
    function draw() {
        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Mettre à jour les positions
        points.forEach(point => {
            point.angle += point.speed;
            point.offsetX = Math.sin(point.angle) * 10;
            point.offsetY = Math.cos(point.angle * 0.7) * 10;
            
            point.x = point.baseX + point.offsetX;
            point.y = point.baseY + point.offsetY;
        });
        
        // Dessiner les connexions
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // Dessiner le point
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4ff';
            ctx.fill();
        }
        
        // Continuer l'animation
        requestAnimationFrame(draw);
    }
    
    // Démarrer l'animation
    draw();
    
    // Redimensionner le canvas avec la fenêtre
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Graphique radar
function initRadarChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Définir la taille du canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 20;
    
    // Compétences à afficher
    const skills = [
        { name: 'Frontend', value: 95 },
        { name: 'Backend', value: 85 },
        { name: 'Mobile', value: 90 },
        { name: 'Database', value: 88 },
        { name: 'DevOps', value: 75 },
        { name: 'UI/UX', value: 82 }
    ];
    
    // Fonction de dessin
    function draw() {
        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner les cercles concentriques
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * i/5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Dessiner les lignes radiales
        const angleStep = (Math.PI * 2) / skills.length;
        
        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Ajouter les noms des compétences
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Poppins';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                skills[i].name,
                centerX + Math.cos(angle) * (radius + 20),
                centerY + Math.sin(angle) * (radius + 20)
            );
        }
        
        // Dessiner le polygone des compétences
        ctx.beginPath();
        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep;
            const value = skills[i].value / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        
        // Remplir le polygone
        ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.fill();
        
        // Contour du polygone
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Dessiner initialement
    draw();
    
    // Redessiner au redimensionnement
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        draw();
    });
}

// Initialiser les animations Canvas quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initCanvasAnimations);
