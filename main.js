// ── Hero Spotlight (mouse tracking) ──
(function () {
    const hero = document.getElementById('hero');
    const spot = document.getElementById('heroSpotlight');
    if (!hero || !spot) return;
    let _spotTick = false;
    hero.addEventListener('mousemove', (e) => {
        if (_spotTick) return;
        _spotTick = true;
        requestAnimationFrame(() => {
            const r = hero.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
            const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
            spot.style.setProperty('--sx', x + '%');
            spot.style.setProperty('--sy', y + '%');
            spot.style.opacity = '1';
            _spotTick = false;
        });
    }, { passive: true });
    hero.addEventListener('mouseleave', () => { spot.style.opacity = '0'; });
})();

// ── Hover Glow on all buttons ──
(function () {
    const btns = document.querySelectorAll('.btn-primary, .btn-ghost, .nav-cta');
    btns.forEach(btn => {
        let _btnTick = false;
        btn.addEventListener('mousemove', (e) => {
            if (_btnTick) return;
            _btnTick = true;
            requestAnimationFrame(() => {
                const r = btn.getBoundingClientRect();
                btn.style.setProperty('--gx', (e.clientX - r.left) + 'px');
                btn.style.setProperty('--gy', (e.clientY - r.top) + 'px');
                _btnTick = false;
            });
        }, { passive: true });
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
let _navTicking = false;
window.addEventListener('scroll', () => {
    if (!_navTicking) {
        requestAnimationFrame(() => {
            const nav = document.getElementById('nav');
            if (nav) {
                nav.style.background = window.scrollY > 60
                    ? 'rgba(6,9,16,0.30)'
                    : 'rgba(6,9,16,0.10)';
            }
            _navTicking = false;
        });
        _navTicking = true;
    }
}, { passive: true });

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
        initials: "ND",
        color: "#00e5b0",
        quote: "Franchement, au début j'étais sceptique sur l'IA pour notre cabinet. Cyril a posé les bonnes questions, et en deux semaines on avait un agent qui traitait nos 400 factures mensuelles tout seul. Ma comptable m'a dit « j'ai cru que c'était une blague ». On a récupéré 30h par mois, c'est concret.",
        author: "Nathalie Dumont",
        role: "Directrice Administrative — Cabinet comptable, Levallois"
    },
    {
        initials: "KB",
        color: "#6366f1",
        quote: "On perdait un temps fou à trier les leads entrants. Depuis qu'Oakflow a branché le pipeline d'enrichissement, c'est nuit et jour. Le système scrape, qualifie et planifie les RDV sans qu'on touche à rien. Notre taux de closing est passé de 8% à 22% en trois mois.",
        author: "Karim Benali",
        role: "Co-fondateur — Agence digitale B2B, Paris"
    },
    {
        initials: "EM",
        color: "#f59e0b",
        quote: "J'avais testé deux agences avant, ça n'avait rien donné. Avec Cyril, en une heure il avait capté le problème. Trois semaines plus tard, notre workflow n8n tournait et on économisait 20h de saisie par semaine. Le ROI était là dès le premier mois. Je le recommande à tous mes contacts.",
        author: "Estelle Maréchal",
        role: "Gérante — Studio de recrutement, Boulogne-Billancourt"
    },
    {
        initials: "JP",
        color: "#ec4899",
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
        <div class="testi-avatar" style="background:${t.color}20;border:2px solid ${t.color}40;color:${t.color};" aria-label="${t.author}">${t.initials}</div>
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

// ── Menu Mobile ──
(function () {
    const btn = document.getElementById('navHamburger');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    function openMenu() {
        btn.classList.add('is-open');
        menu.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        btn.classList.remove('is-open');
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
        btn.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    menu.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    }, { passive: true });
})();

// ── Formulaire de qualification ──
(function () {
    const form        = document.getElementById('qualification-form');
    if (!form) return;

    const submitBtn   = document.getElementById('qual-submit-btn');
    const btnText     = document.getElementById('qual-btn-text');
    const btnLoader   = document.getElementById('qual-btn-loader');
    const successDiv  = document.getElementById('qual-success');
    const calendlyGate = document.getElementById('calendly-gate');

    function setLoading(on) {
        submitBtn.disabled = on;
        btnText.hidden     = on;
        btnLoader.hidden   = !on;
    }

    function showFieldError(el) {
        el.classList.add('field-error');
        el.addEventListener('input', () => el.classList.remove('field-error'), { once: true });
    }

    function unlockCalendly() {
        // Remplace le formulaire par le message de succès
        form.hidden         = true;
        successDiv.hidden   = false;

        // Déverrouille le Calendly avec animation CSS
        if (calendlyGate) {
            calendlyGate.classList.remove('locked');
        }

        // Scroll doux vers le message de succès puis vers le Calendly
        setTimeout(() => {
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Supprimer les erreurs précédentes
        form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
        const prevErr = form.querySelector('.qual-error-msg');
        if (prevErr) prevErr.remove();

        // Lecture des valeurs
        const full_name      = form.full_name.value.trim();
        const lead_email     = form.lead_email.value.trim();
        const company        = form.company.value.trim();
        const business_type  = form.business_type.value;
        const monthly_revenue = form.monthly_revenue.value;
        const pain_point     = form.pain_point.value.trim();

        // Validation côté client
        let hasError = false;
        if (!full_name)   { showFieldError(form.full_name);   hasError = true; }
        if (!lead_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead_email)) {
            showFieldError(form.lead_email); hasError = true;
        }
        if (!company)         { showFieldError(form.company);         hasError = true; }
        if (!business_type)   { showFieldError(form.business_type);   hasError = true; }
        if (!monthly_revenue) { showFieldError(form.monthly_revenue); hasError = true; }
        if (!pain_point)      { showFieldError(form.pain_point);      hasError = true; }
        if (hasError) return;

        // État de chargement : texte + spinner visibles
        submitBtn.disabled  = true;
        btnText.textContent = 'Analyse de votre profil par l\'IA d\'Oakflow en cours...';
        btnText.hidden      = false;
        btnLoader.hidden    = false;

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ full_name, lead_email, company, business_type, monthly_revenue, pain_point }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Erreur serveur');
            }

            unlockCalendly();

        } catch (err) {
            console.error('[qualification-form]', err.message);
            setLoading(false);
            btnText.textContent = 'Analyser mon profil par l\'IA →';
            btnText.hidden = false;
            btnLoader.hidden = true;

            const errMsg = document.createElement('p');
            errMsg.className = 'qual-error-msg';
            errMsg.textContent = 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.';
            form.querySelector('.qual-form-footer').appendChild(errMsg);
        }
    });
})();
