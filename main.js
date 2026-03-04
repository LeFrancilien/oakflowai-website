// ── Hero Spotlight (mouse tracking) ──
(function () {
    const hero = document.getElementById('hero');
    const spot = document.getElementById('heroSpotlight');
    if (!hero || !spot) return;
    hero.addEventListener('mousemove', (e) => {
        const r = hero.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
        const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
        spot.style.setProperty('--sx', x + '%');
        spot.style.setProperty('--sy', y + '%');
        spot.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', () => { spot.style.opacity = '0'; });
})();

// ── Hover Glow on all buttons ──
(function () {
    const btns = document.querySelectorAll('.btn-primary, .btn-ghost, .nav-cta');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            btn.style.setProperty('--gx', (e.clientX - r.left) + 'px');
            btn.style.setProperty('--gy', (e.clientY - r.top) + 'px');
        });
    });
})();


// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('v');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach((el, i) => {
    el.style.transitionDelay = (i % 5) * 0.07 + 's';
    io.observe(el);
});

// ── Navbar scroll ──
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 60) {
        nav.style.background = 'rgba(6,9,16,0.96)';
    } else {
        nav.style.background = 'rgba(6,9,16,0.75)';
    }
});

// ── Animate progress bars when in view ──
const bars = document.querySelectorAll('.prog-bar-fill');
const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.w;
            barObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });

bars.forEach(b => {
    const target = b.dataset.w;
    b.style.width = '0%';
    barObs.observe(b);
});

// ── Testimonial Shuffle Cards ──
const TESTIMONIALS = [
    {
        id: 5,
        quote: "Franchement, au début j'étais sceptique sur l'IA pour notre cabinet. Cyril a posé les bonnes questions, et en deux semaines on avait un agent qui traitait nos 400 factures mensuelles tout seul. Ma comptable m'a dit « j'ai cru que c'était une blague ». On a récupéré 30h par mois, c'est concret.",
        author: "Nathalie Dumont",
        role: "Directrice Administrative — Cabinet comptable, Levallois"
    },
    {
        id: 12,
        quote: "On perdait un temps fou à trier les leads entrants. Depuis qu'Oakflow a branché le pipeline d'enrichissement, c'est nuit et jour. Le système scrape, qualifie et planifie les RDV sans qu'on touche à rien. Notre taux de closing est passé de 8% à 22% en trois mois.",
        author: "Karim Benali",
        role: "Co-fondateur — Agence digitale B2B, Paris"
    },
    {
        id: 28,
        quote: "J'avais testé deux agences avant, ça n'avait rien donné. Avec Cyril, en une heure il avait capté le problème. Trois semaines plus tard, notre workflow n8n tournait et on économisait 20h de saisie par semaine. Le ROI était là dès le premier mois. Je le recommande à tous mes contacts.",
        author: "Estelle Maréchal",
        role: "Gérante — Studio de recrutement, Boulogne-Billancourt"
    },
    {
        id: 33,
        quote: "On recevait 80 appels par jour et on en loupait la moitié. Depuis que l'agent vocal est en place, plus un seul appel perdu. Il qualifie, prend les RDV sur Google Calendar et logge tout dans notre CRM. Mes commerciaux ne font plus que du closing maintenant.",
        author: "Julien Pascaud",
        role: "Directeur Commercial — PME industrielle, Nanterre"
    }
];

(function initTestimonials() {
    const stack = document.getElementById('testiStack');
    if (!stack) return;

    // positions array: index 0 = front, 1 = middle, 2 = back, 3 = hidden
    let positions = ['is-front', 'is-middle', 'is-back', 'is-hidden'];

    function buildCards() {
        stack.innerHTML = '';
        TESTIMONIALS.forEach((t, i) => {
            const card = document.createElement('div');
            card.className = 'testi-card ' + positions[i];
            card.dataset.index = i;
            card.innerHTML = `
        <img class="testi-avatar" src="https://i.pravatar.cc/128?img=${t.id}" alt="Photo de ${t.author}" loading="lazy"/>
        <p class="testi-quote">${t.quote}</p>
        <span class="testi-author">${t.author}</span>
        <span class="testi-role">${t.role}</span>
      `;
            stack.appendChild(card);
        });
        attachDrag();
    }

    function shuffle() {
        // rotate positions: front→back→middle, middle→front, back→middle
        const last = positions.pop();
        positions.unshift(last);
        // Re-apply classes
        const cards = stack.querySelectorAll('.testi-card');
        cards.forEach((card, i) => {
            card.className = 'testi-card ' + positions[i];
        });
    }

    function attachDrag() {
        const frontCard = () => stack.querySelector('.testi-card.is-front');

        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        function onPointerDown(e) {
            if (!e.currentTarget.classList.contains('is-front')) return;
            isDragging = true;
            startX = e.clientX ?? e.touches?.[0]?.clientX;
            e.currentTarget.classList.add('dragging');
            e.currentTarget.setPointerCapture?.(e.pointerId);
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            currentX = (e.clientX ?? e.touches?.[0]?.clientX) - startX;
            const card = frontCard();
            if (card) {
                card.style.transform = `rotate(${-6 + currentX * 0.03}deg) translateX(${currentX}px)`;
            }
        }

        function onPointerUp(e) {
            if (!isDragging) return;
            isDragging = false;
            const card = frontCard();
            if (!card) return;
            card.classList.remove('dragging');
            card.style.transform = '';

            if (currentX < -120) {
                shuffle();
            }
            currentX = 0;
        }

        const cards = stack.querySelectorAll('.testi-card');
        cards.forEach(card => {
            card.addEventListener('pointerdown', onPointerDown);
            card.addEventListener('pointermove', onPointerMove);
            card.addEventListener('pointerup', onPointerUp);
            card.addEventListener('pointercancel', onPointerUp);
            // Prevent image drag
            card.querySelectorAll('img').forEach(img => {
                img.setAttribute('draggable', 'false');
            });
        });
    }

    buildCards();
})();
