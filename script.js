document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // LOADER
    // ============================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 800);
    });

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = (scrollTop / scrollHeight) * 100 + '%';
    });

    // ============================================
    // NAVBAR
    // ============================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ============================================
    // BOTTOM TABS ACTIVE STATE
    // ============================================
    const bottomTabs = document.querySelectorAll('.bottom-tab');
    const allSections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        // Update bottom tabs
        bottomTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-section') === current) {
                tab.classList.add('active');
            }
        });

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // HIDE BOTTOM TABS ON SCROLL DOWN, SHOW ON SCROLL UP
    // ============================================
    let lastScroll = 0;
    const bottomTabsContainer = document.getElementById('bottomTabs');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 300) {
            bottomTabsContainer.style.transform = 'translateY(100%)';
        } else {
            bottomTabsContainer.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // ============================================
    // SCROLL REVEAL
    // ============================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
                } else {
                    entry.target.classList.add('visible');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    scrollRevealElements.forEach(el => revealObserver.observe(el));

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

    function animateCounter(element, target) {
        const duration = 2000;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.floor(easeOut * target);
            if (progress < 1) requestAnimationFrame(update);
            else element.textContent = target;
        }
        requestAnimationFrame(update);
    }
    statNumbers.forEach(stat => counterObserver.observe(stat));

    // ============================================
    // SCHEDULE TABS
    // ============================================
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
        });
    });

    // ============================================
    // LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    window.openLightbox = function(element) {
        lightboxImg.src = element.querySelector('img').src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ============================================
    // MUSIC PLAYER
    // ============================================
    const musicToggle = document.getElementById('musicToggle');
    const musicPanel = document.getElementById('musicPanel');
    const playBtn = document.getElementById('playBtn');
    const musicStatus = document.getElementById('musicStatus');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicPlayer = document.getElementById('musicPlayer');
    
    let isPlaying = false;
    const songs = [
        { title: 'Lofi Study', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { title: 'Coding Vibes', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { title: 'Focus Mode', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        { title: 'Chill Beats', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
    ];
    let currentSong = 0;

    bgMusic.volume = 0.5;

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        musicPanel.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!musicPlayer.contains(e.target)) musicPanel.classList.remove('active');
    });

    musicPanel.addEventListener('click', (e) => e.stopPropagation());

    function togglePlay() {
        if (isPlaying) bgMusic.pause();
        else bgMusic.play().catch(() => musicStatus.textContent = 'Click to play');
    }

    playBtn.addEventListener('click', togglePlay);

    bgMusic.addEventListener('play', () => { isPlaying = true; updateMusicUI(); });
    bgMusic.addEventListener('pause', () => { isPlaying = false; updateMusicUI(); });
    bgMusic.addEventListener('ended', () => document.getElementById('nextBtn').click());

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        loadSong();
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentSong = (currentSong + 1) % songs.length;
        loadSong();
    });

    function loadSong() {
        bgMusic.src = songs[currentSong].src;
        document.querySelector('.music-title').textContent = songs[currentSong].title;
        if (isPlaying) bgMusic.play().catch(() => {});
    }

    volumeSlider.addEventListener('input', (e) => bgMusic.volume = e.target.value / 100);

    function updateMusicUI() {
        const icon = playBtn.querySelector('i');
        icon.classList.toggle('fa-play', !isPlaying);
        icon.classList.toggle('fa-pause', isPlaying);
        musicStatus.textContent = isPlaying ? 'Playing' : 'Paused';
        musicToggle.classList.toggle('playing', isPlaying);
        musicPanel.classList.toggle('playing', isPlaying);
    }

    // Auto-play on first interaction
    let autoPlayAttempted = false;
    function attemptAutoPlay() {
        if (!autoPlayAttempted) {
            autoPlayAttempted = true;
            bgMusic.play().then(() => {
                isPlaying = true;
                updateMusicUI();
            }).catch(() => {});
        }
    }
    document.addEventListener('click', attemptAutoPlay, { once: true });
    document.addEventListener('scroll', attemptAutoPlay, { once: true });
    document.addEventListener('touchstart', attemptAutoPlay, { once: true });

    // ============================================
    // HERO PARTICLES
    // ============================================
    const particlesContainer = document.getElementById('heroParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add keyframes for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
            25% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
            50% { transform: translateY(-60px) translateX(-10px); opacity: 0.5; }
            75% { transform: translateY(-30px) translateX(20px); opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // TEXT SCRAMBLE ON HERO TITLE
    // ============================================
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end, char: null });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span style="color: var(--toska-light)">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) this.resolve();
            else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }

    document.querySelectorAll('.title-line').forEach(line => {
        const originalText = line.getAttribute('data-text') || line.innerText;
        const fx = new TextScramble(line);
        line.addEventListener('mouseenter', () => fx.setText(originalText));
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c 10 PPLG 1 ', 'background: linear-gradient(135deg, #008B8B, #00CED1); color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%cWebsite kelas buatan anak PPLG 1', 'color: #008B8B; font-size: 14px;');
});