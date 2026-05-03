// ============================================
// 10 PPLG 1 - Website Kelas
// JavaScript Functions
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // LOADER
    // ============================================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('visible');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    function animateCounter(element, target) {
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }

    // ============================================
    // SCHEDULE TABS
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ============================================
    // LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // ============================================
    // MUSIC PLAYER (Simulated)
    // ============================================
    const musicToggle = document.getElementById('musicToggle');
    const musicPanel = document.getElementById('musicPanel');
    const playBtn = document.getElementById('playBtn');
    const musicStatus = document.getElementById('musicStatus');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const musicPlayer = document.getElementById('musicPlayer');
    
    let isPlaying = false;
    const songs = ['Lofi Study', 'Coding Vibes', 'Focus Mode', 'Chill Beats'];
    let currentSong = 0;

    musicToggle.addEventListener('click', () => {
        musicPanel.classList.toggle('active');
    });

    // Close music panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!musicPlayer.contains(e.target)) {
            musicPanel.classList.remove('active');
        }
    });

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        updateMusicUI();
    });

    prevBtn.addEventListener('click', () => {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        updateSongInfo();
    });

    nextBtn.addEventListener('click', () => {
        currentSong = (currentSong + 1) % songs.length;
        updateSongInfo();
    });

    function updateMusicUI() {
        const icon = playBtn.querySelector('i');
        if (isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            musicStatus.textContent = 'Playing';
            musicToggle.classList.add('playing');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            musicStatus.textContent = 'Paused';
            musicToggle.classList.remove('playing');
        }
    }

    function updateSongInfo() {
        document.querySelector('.music-title').textContent = songs[currentSong];
        if (isPlaying) {
            musicStatus.textContent = 'Playing';
        }
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ============================================
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c 10 PPLG 1 ', 'background: linear-gradient(135deg, #008B8B, #00CED1); color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%cWebsite kelas buatan anak PPLG 1 - SMK Negeri 1 Contoh', 'color: #008B8B; font-size: 14px; font-weight: 500;');
    console.log('%cJangan lupa follow Instagram kita! @10pplg1', 'color: #666; font-size: 12px;');

});