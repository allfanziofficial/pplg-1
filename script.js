document.addEventListener('DOMContentLoaded', function() {

    // ========== LOADER ==========
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 800);
    });

    // ========== SCROLL PROGRESS ==========
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight > 0) {
            scrollProgress.style.width = (scrollTop / scrollHeight) * 100 + '%';
        }
    });

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ========== MOBILE MENU ==========
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

    // ========== PAGE SYSTEM - SPA Navigation ==========
    const pages = document.querySelectorAll('.page');
    const bottomTabs = document.querySelectorAll('.bottom-tab');
    const navLinks = document.querySelectorAll('.nav-link');

    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById('page-' + pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update bottom tabs
        bottomTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-page') === pageId) {
                tab.classList.add('active');
            }
        });

        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Bottom tabs click
    bottomTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = tab.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Nav links click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Hero buttons click
    document.querySelectorAll('.hero-buttons a[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = btn.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Footer links click
    document.querySelectorAll('.footer-links a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== HIDE BOTTOM TABS ON SCROLL DOWN ==========
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

    // ========== SCROLL REVEAL ==========
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

    // ========== COUNTER - termasuk Hari Bersama yang dihitung otomatis ==========
    const statNumbers = document.querySelectorAll('.stat-number');

    // Hitung hari bersama dari awal kelas 10 (tahun lalu, Juli 2025)
    function hitungHariBersama() {
        const mulaiKelas10 = new Date('2025-07-15');
        const sekarang = new Date();
        const diffTime = Math.abs(sekarang - mulaiKelas10);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const heroHariBersama = document.getElementById('heroHariBersama');
    const heroSiswa = document.getElementById('heroSiswa');
    const hariBersama = hitungHariBersama();

    // Populate hero stats immediately
    if (heroHariBersama) {
        heroHariBersama.textContent = hariBersama;
    }
    if (heroSiswa) {
        heroSiswa.textContent = '30';
    }

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

    // ========== SCHEDULE TABS ==========
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ========== LIGHTBOX ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ========== MUSIC PLAYER ==========
    const musicPill = document.getElementById('musicPill');
    const musicPanel = document.getElementById('musicPanel');
    const playBtn = document.getElementById('playBtn');
    const musicSongTitle = document.getElementById('musicSongTitle');
    const panelTitle = document.getElementById('panelTitle');
    const panelStatus = document.getElementById('panelStatus');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicIcon = document.getElementById('musicIcon');

    let isPlaying = false;

    // Daftar lagu dari folder lokal music/
    const songs = [
        { title: 'Kaweni Merry', src: 'music/lofi-study.mp3' },
        { title: 'Coding Vibes', src: 'music/coding-vibes.mp3' },
        { title: 'Breakbeat', src: 'music/focus-mode.mp3' },
        { title: 'Chill Beats', src: 'music/chill-beats.mp3' }
    ];
    let currentSong = 0;

    bgMusic.volume = 0.5;

    // Toggle panel saat pill diklik
    musicPill.addEventListener('click', (e) => {
        e.stopPropagation();
        musicPanel.classList.toggle('active');
    });

    // Tutup panel saat klik di luar
    document.addEventListener('click', (e) => {
        const musicPlayer = document.getElementById('musicPlayer');
        if (musicPlayer && !musicPlayer.contains(e.target)) {
            musicPanel.classList.remove('active');
        }
    });

    musicPanel.addEventListener('click', (e) => e.stopPropagation());

    function togglePlay() {
        if (isPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.play().catch(err => {
                console.log('Audio play failed:', err);
                panelStatus.textContent = 'Click to play';
            });
        }
    }

    playBtn.addEventListener('click', togglePlay);

    bgMusic.addEventListener('play', () => { 
        isPlaying = true; 
        updateMusicUI(); 
    });

    bgMusic.addEventListener('pause', () => { 
        isPlaying = false; 
        updateMusicUI(); 
    });

    bgMusic.addEventListener('ended', () => {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.click();
    });

    bgMusic.addEventListener('error', (e) => {
        console.log('Audio error:', e);
        panelStatus.textContent = 'File not found';
        isPlaying = false;
        updateMusicUI();
    });

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSong = (currentSong - 1 + songs.length) % songs.length;
            loadSong();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSong = (currentSong + 1) % songs.length;
            loadSong();
        });
    }

    function loadSong() {
        const wasPlaying = isPlaying;
        bgMusic.src = songs[currentSong].src;
        if (musicSongTitle) musicSongTitle.textContent = songs[currentSong].title;
        if (panelTitle) panelTitle.textContent = songs[currentSong].title;

        if (wasPlaying) {
            bgMusic.play().catch(() => {
                if (panelStatus) panelStatus.textContent = 'Click to play';
            });
        }
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            bgMusic.volume = e.target.value / 100;
        });
    }

    function updateMusicUI() {
        const icon = playBtn.querySelector('i');

        if (isPlaying) {
            if (icon) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }
            if (musicSongTitle) musicSongTitle.textContent = songs[currentSong].title;
            if (panelStatus) panelStatus.textContent = 'Now Playing';
            musicPill.classList.add('playing');
            musicPanel.classList.add('playing');
            if (musicIcon) {
                musicIcon.classList.remove('fa-compact-disc');
                musicIcon.classList.add('fa-pause');
            }
        } else {
            if (icon) {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
            if (panelStatus) panelStatus.textContent = 'Paused';
            musicPill.classList.remove('playing');
            musicPanel.classList.remove('playing');
            if (musicIcon) {
                musicIcon.classList.remove('fa-pause');
                musicIcon.classList.add('fa-compact-disc');
            }
        }
    }

    // Auto-play on first interaction (browser policy)
    let autoPlayAttempted = false;
    function attemptAutoPlay() {
        if (!autoPlayAttempted) {
            autoPlayAttempted = true;
            bgMusic.play().then(() => {
                isPlaying = true;
                updateMusicUI();
            }).catch(() => {
                if (panelStatus) panelStatus.textContent = 'Click to play';
            });
        }
    }

    document.addEventListener('click', attemptAutoPlay, { once: true });
    document.addEventListener('scroll', attemptAutoPlay, { once: true });
    document.addEventListener('touchstart', attemptAutoPlay, { once: true });

    // ========== HERO PARTICLES ==========
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 8 + 12}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            25% { transform: translateY(-25px) translateX(8px); opacity: 0.7; }
            50% { transform: translateY(-50px) translateX(-8px); opacity: 0.4; }
            75% { transform: translateY(-25px) translateX(15px); opacity: 0.6; }
        }
    `;
    document.head.appendChild(particleStyle);

    // ========== MAGNETIC BUTTONS ==========
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ========== CONSOLE EASTER EGG ==========
    console.log('%c 10 PPLG 1 ', 'background: linear-gradient(135deg, #008B8B, #00CED1); color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%cSMK Negeri 1 Kota Gorontalo', 'color: #008B8B; font-size: 14px;');
    console.log('%cHari Bersama: ' + hariBersama + ' hari', 'color: #00CED1; font-size: 12px;');
    console.log('%cWebsite dibuat oleh anggota PKS Polresta Gorontalo', 'color: #008B8B; font-size: 11px; font-style: italic;');
});