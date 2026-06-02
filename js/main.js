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
(function() {
        const steps = [
            {
                prompt: 'term-line-1',
                cmd: 'whoami',
                outId: 'term-out-1',
                outHTML: '<div class="text-cyan-300">diogo_neves <span class="text-zinc-500">// full-stack dev</span></div>'
            },
            {
                prompt: 'term-line-2',
                promptWrap: 'term-prompt-2',
                cmd: 'cat skills.json',
                outId: 'term-out-2',
                outHTML: `<div class="text-yellow-300">{</div>
<div class="pl-4"><span class="text-cyan-300">"frontend"</span><span class="text-zinc-400">:</span> <span class="text-green-300">["React", "Next.js", "TypeScript"]</span><span class="text-zinc-500">,</span></div>
<div class="pl-4"><span class="text-cyan-300">"backend"</span><span class="text-zinc-400">:</span> <span class="text-green-300">["Node.js", "Laravel", "PHP"]</span><span class="text-zinc-500">,</span></div>
<div class="pl-4"><span class="text-cyan-300">"cloud"</span><span class="text-zinc-400">:</span> <span class="text-green-300">["AWS", "Azure", "GCP"]</span></div>
<div class="text-yellow-300">}</div>`
            },
            {
                prompt: 'term-line-3',
                promptWrap: 'term-prompt-3',
                cmd: 'git log --oneline -1',
                outId: 'term-out-3',
                outHTML: '<div><span class="text-yellow-400">a3f9c12</span> <span class="text-zinc-300">feat: portfolio v2 launched 🚀</span></div>'
            }
        ];

        function typeText(elId, text, speed, cb) {
            const el = document.getElementById(elId);
            if (!el) return cb && cb();
            let i = 0;
            const t = setInterval(() => {
                el.textContent += text[i++];
                if (i >= text.length) { clearInterval(t); cb && cb(); }
            }, speed);
        }

        function showOutput(outId, html, cb) {
            const el = document.getElementById(outId);
            if (!el) return cb && cb();
            el.innerHTML = html;
            el.classList.remove('hidden');
            cb && setTimeout(cb, 600);
        }

        function showPrompt(wrapId) {
            if (!wrapId) return;
            const el = document.getElementById(wrapId);
            if (el) el.classList.remove('hidden'), el.style.display = 'flex';
        }

        function runStep(i) {
            if (i >= steps.length) {
                const cur = document.getElementById('term-cursor-line');
                if (cur) { cur.classList.remove('hidden'); cur.style.display = 'flex'; }
                return;
            }
            const s = steps[i];
            if (s.promptWrap) showPrompt(s.promptWrap);
            setTimeout(() => {
                typeText(s.prompt, s.cmd, 60, () => {
                    setTimeout(() => {
                        showOutput(s.outId, s.outHTML, () => runStep(i + 1));
                    }, 300);
                });
            }, 400);
        }

        window.addEventListener('load', () => setTimeout(() => runStep(0), 800));
    })();