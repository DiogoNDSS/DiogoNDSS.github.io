// main.js

// Scroll restoration manual
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.onload = function() {
    window.scrollTo(0, 0);
};

// Efeito Parallax Sensível ao Mouse
document.addEventListener('mousemove', (e) => {
    const visual = document.getElementById('interactive-visual');
    if(!visual) return;
    
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    
    visual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});

// Lógica da Navbar
const navbarParent = document.getElementById('navbar-parent');
const navInner = document.getElementById('nav-inner');

const keepNavbarDetached = () => {
    navbarParent.classList.add('pt-6');
    navInner.classList.remove('w-full', 'bg-transparent', 'xl:px-20', 'rounded-none', 'border-transparent');
    navInner.classList.add('w-[95%]', 'max-w-6xl', 'px-8', 'md:px-12', 'rounded-full', 'backdrop-blur-md', 'bg-zinc-900/80', 'border-zinc-800/50', 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]');
};

keepNavbarDetached();

// Animação de Scroll Reveal para o Contato
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-element').forEach((el) => {
    observer.observe(el);
});

// Menu Mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

// Abrir/Fechar menu
mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px';
    
    if (isOpen) {
        mobileMenu.style.maxHeight = '0px';
    } else {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    }
});

// Fechar menu ao clicar em um link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.maxHeight = '0px';
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.style.maxHeight = '0px';
    }
});