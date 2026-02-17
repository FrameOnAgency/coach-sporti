// Main JavaScript - Coach Sportif Website
// Handles navigation, animations, and interactions
// Main JavaScript - Coach Sportif Website
// Handles navigation, animations, and interactions

// ============================================
// FOOTER COMPONENT
// ============================================
function renderFooter() {
    const footerHTML = `
    <footer style="background: var(--color-bg-alt); padding: var(--spacing-3xl) 0; margin-top: var(--spacing-3xl);">
        <div class="container">
            <div class="grid grid-3">
                <div>
                    <h3 class="text-gradient">COACH PRO</h3>
                    <p class="text-muted">
                        Coaching sportif professionnel à Paris.<br>
                        Transformez votre corps, dépassez vos limites.
                    </p>
                </div>

                <div>
                    <h4>Navigation</h4>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: var(--spacing-sm);"><a href="about.html" class="text-muted">À propos</a></li>
                        <li style="margin-bottom: var(--spacing-sm);"><a href="services.html" class="text-muted">Services</a></li>

                        <li style="margin-bottom: var(--spacing-sm);"><a href="blog.html" class="text-muted">Blog</a></li>
                        <li style="margin-bottom: var(--spacing-sm);"><a href="testimonials.html" class="text-muted">Témoignages</a></li>
                    </ul>
                </div>

                <div>
                    <h4>Contact</h4>
                    <p class="text-muted" style="line-height: 2;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        contact@coachpro.fr<br>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        +33 6 12 34 56 78<br>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        Paris, France
                    </p>
                    <div style="display: flex; gap: var(--spacing-md); margin-top: var(--spacing-md);">
                        <a href="#" style="color: var(--color-text); transition: color 0.3s;" onmouseover="this.style.color='var(--color-primary)'" onmouseout="this.style.color='var(--color-text)'" aria-label="Facebook">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="#" style="color: var(--color-text); transition: color 0.3s;" onmouseover="this.style.color='var(--color-primary)'" onmouseout="this.style.color='var(--color-text)'" aria-label="Instagram">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>
                        <a href="#" style="color: var(--color-text); transition: color 0.3s;" onmouseover="this.style.color='var(--color-primary)'" onmouseout="this.style.color='var(--color-text)'" aria-label="YouTube">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: var(--spacing-3xl); padding-top: var(--spacing-xl); border-top: 1px solid rgba(255,255,255,0.1);">
                <p class="text-muted">© 2026 Coach Pro. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
    `;

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
}

// Render Footer
document.addEventListener('DOMContentLoaded', () => {
    renderFooter();
});

// ============================================
// NAVIGATION
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Mobile menu toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Add scrolled class to navigation
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => observer.observe(el));

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// TAB SWITCHING (for Services page)
// ============================================
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding content
        const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ============================================
// FORM VALIDATION
// ============================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--color-error)';
            } else {
                input.style.borderColor = 'var(--color-success)';
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Merci de remplir tous les champs obligatoires');
        }
    });
});

// ============================================
// CONSOLE LOG
// ============================================
console.log('%c🏋️ Coach Pro Website ', 'background: linear-gradient(135deg, #ff6b35, #00d4ff); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('Développé avec passion 💪');

// ============================================
// PRICING TOGGLE (Services page)
// ============================================
const showPricingBtn = document.getElementById('show-pricing-btn');
const pricingSection = document.getElementById('pricing-section');

if (showPricingBtn && pricingSection) {
    showPricingBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Toggle visibility
        if (pricingSection.style.display === 'none') {
            pricingSection.style.display = 'block';
            showPricingBtn.textContent = 'Masquer les tarifs';

            // Smooth scroll to pricing
            pricingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            pricingSection.style.display = 'none';
            showPricingBtn.textContent = 'Voir les tarifs';
        }
    });
}

// ============================================
// ONLINE PRICING TOGGLE
// ============================================
const showOnlinePricingBtn = document.getElementById('show-online-pricing-btn');
const onlinePricingSection = document.getElementById('online-pricing-section');

if (showOnlinePricingBtn && onlinePricingSection) {
    showOnlinePricingBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Toggle visibility
        if (onlinePricingSection.style.display === 'none') {
            onlinePricingSection.style.display = 'block';
            showOnlinePricingBtn.textContent = 'Masquer les tarifs';

            // Smooth scroll to pricing
            onlinePricingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            onlinePricingSection.style.display = 'none';
            showOnlinePricingBtn.textContent = 'Voir les tarifs';
        }
    });
}


