// ============================================
// 10 PPLG 1 - Website Kelas
// JavaScript Functions - LENGKAP
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
    // CURTAIN REVEAL ANIMATION
    // ============================================
    const curtainSections = document.querySelectorAll('.curtain-section');
    
    const curtainObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                curtainObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    curtainSections.forEach(section => {
        curtainObserver.observe(section);
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
    // MUSIC PLAYER WITH AUTO-PLAY
    // ============================================
    const musicToggle = document.getElementById('musicToggle');
    const musicPanel = document.getElementById('musicPanel');
    const playBtn = document.getElementById('playBtn');
    const musicStatus = document.getElementById('musicStatus');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const musicPlayer = document.getElementById('musicPlayer');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    
    let isPlaying = false;
    const songs = [
        { title: 'Lofi Study', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { title: 'Coding Vibes', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { title: 'Focus Mode', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        { title: 'Chill Beats', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
    ];
    let currentSong = 0;

    // Set initial volume
    bgMusic.volume = 0.5;

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        musicPanel.classList.toggle('active');
    });

    // Close music panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!musicPlayer.contains(e.target)) {
            musicPanel.classList.remove('active');
        }
    });

    // Prevent panel close when clicking inside
    musicPanel.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    function togglePlay() {
        if (isPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.play().catch(e => {
                console.log('Audio play failed:', e);
                musicStatus.textContent = 'Click to play';
            });
        }
    }

    playBtn.addEventListener('click', togglePlay);

    // Audio events
    bgMusic.addEventListener('play', () => {
        isPlaying = true;
        updateMusicUI();
    });

    bgMusic.addEventListener('pause', () => {
        isPlaying = false;
        updateMusicUI();
    });

    bgMusic.addEventListener('ended', () => {
        nextBtn.click();
    });

    prevBtn.addEventListener('click', () => {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        loadSong();
    });

    nextBtn.addEventListener('click', () => {
        currentSong = (currentSong + 1) % songs.length;
        loadSong();
    });

    function loadSong() {
        bgMusic.src = songs[currentSong].src;
        document.querySelector('.music-title').textContent = songs[currentSong].title;
        if (isPlaying) {
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    volumeSlider.addEventListener('input', (e) => {
        bgMusic.volume = e.target.value / 100;
    });

    function updateMusicUI() {
        const icon = playBtn.querySelector('i');
        if (isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            musicStatus.textContent = 'Playing';
            musicToggle.classList.add('playing');
            musicPanel.classList.add('playing');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            musicStatus.textContent = 'Paused';
            musicToggle.classList.remove('playing');
            musicPanel.classList.remove('playing');
        }
    }

    // Auto-play on first user interaction (browser policy)
    let autoPlayAttempted = false;
    
    function attemptAutoPlay() {
        if (!autoPlayAttempted) {
            autoPlayAttempted = true;
            bgMusic.play().then(() => {
                isPlaying = true;
                updateMusicUI();
                musicStatus.textContent = 'Playing';
            }).catch(() => {
                musicStatus.textContent = 'Click play';
            });
        }
    }

    // Try autoplay on any user interaction
    document.addEventListener('click', attemptAutoPlay, { once: true });
    document.addEventListener('scroll', attemptAutoPlay, { once: true });
    document.addEventListener('touchstart', attemptAutoPlay, { once: true });

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
    // MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
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
    // TEXT SCRAMBLE EFFECT ON HERO TITLE
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
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
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
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Apply scramble effect on hover
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach(line => {
        const originalText = line.getAttribute('data-text') || line.innerText;
        const fx = new TextScramble(line);
        
        line.addEventListener('mouseenter', () => {
            fx.setText(originalText);
        });
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c 10 PPLG 1 ', 'background: linear-gradient(135deg, #008B8B, #00CED1); color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%cWebsite kelas buatan anak PPLG 1 - SMK Negeri 1 Contoh', 'color: #008B8B; font-size: 14px; font-weight: 500;');
    console.log('%cJangan lupa follow Instagram kita! @10pplg1', 'color: #666; font-size: 12px;');

});