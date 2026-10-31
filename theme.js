document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hero-content > *').forEach((el, i) => el.style.setProperty('--i', i));
    const bg = document.querySelector('.hero-bg-image');
    if (bg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        addEventListener('scroll', () => {
            bg.style.transform = 'translateY(' + Math.min(scrollY, 600) * 0.25 + 'px)';
        }, { passive: true });
    }
});
