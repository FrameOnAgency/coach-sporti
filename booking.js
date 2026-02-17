// Booking System JavaScript
// Handles calendar, session selection, and payment flow

// ============================================
// STATE MANAGEMENT
// ============================================
let selectedDate = null;
let selectedTime = null;
let selectedService = null;

// ============================================
// SERVICE DATA (Source of Truth)
// ============================================
const servicesData = {
    coaching: [
        {
            id: 'decouverte',
            title: 'Découverte',
            fullName: 'Séance Découverte',
            price: '40',
            subtitle: 'Séance découverte',
            features: ['✓ 1 séance d\'essai', '✓ Bilan personnalisé', '✓ Conseils gratuits'],
            style: 'card-glass',
            tag: null
        },
        {
            id: 'coaching-1',
            title: 'Séance Unique',
            fullName: 'Coaching Individuel',
            price: '60',
            subtitle: 'À la carte',
            features: ['✓ 1h de coaching', '✓ Sur mesure', '✓ Sans engagement'],
            style: 'card-glass',
            tag: null
        },
        {
            id: 'pack-performance',
            title: 'Performance',
            fullName: 'Pack Performance (5 séances)',
            price: '275',
            subtitle: 'Pack 5 séances',
            features: ['✓ 5 séances personnalisées', '✓ Programme complet', '✓ Plan nutrition basique', '✓ Support WhatsApp'],
            style: 'card-highlight',
            tag: 'POPULAIRE'
        },
        {
            id: 'pack-transformation',
            title: 'Transformation',
            fullName: 'Pack Transformation (10 séances)',
            price: '500',
            subtitle: 'Pack 10 séances',
            features: ['✓ 10 séances sur mesure', '✓ Programme complet', '✓ Nutrition personnalisée', '✓ Suivi avancé', '✓ Support prioritaire'],
            style: 'card-glass',
            tag: null
        }
    ],
    online: []
};

// ============================================
// SERVICE RENDERER
// ============================================
function renderServices() {
    const renderCards = (services, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = services.map(service => `
            <div class="card ${service.style} reveal service-card" 
                 onclick="selectService('${service.fullName}', ${service.price})"
                 data-service="${service.id}"
                 style="cursor: pointer; transition: transform 0.3s ease, border-color 0.3s ease;">
                ${service.tag ? `
                <div style="position: absolute; top: -15px; right: 20px; background: var(--color-primary); padding: 5px 15px; border-radius: var(--radius-full); font-size: var(--font-size-xs); font-weight: 700;">
                    ${service.tag}
                </div>` : ''}
                <h3>${service.title}</h3>
                <div style="font-size: var(--font-size-3xl); font-weight: 900; color: var(--color-primary); margin: var(--spacing-md) 0;">
                    ${service.price}€
                </div>
                <p class="text-muted mb-4">${service.subtitle}</p>
                <ul style="list-style: none;">
                    ${service.features.map(feature => `
                        <li class="text-muted" style="margin-bottom: var(--spacing-xs);">${feature}</li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    };

    renderCards(servicesData.coaching, 'coachingServicesGrid');
    renderCards(servicesData.online, 'onlineServicesGrid');

    // Observe newly added cards for reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.service-card.reveal').forEach(el => observer.observe(el));
}

// ============================================
// CALENDAR
// ============================================
let currentCalendarDate = new Date();

function initCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    // Set to 1st of the month to avoid edge cases when navigating
    // e.g. if today is 31st and next month has 30 days
    const currentMonth = currentCalendarDate.getMonth();
    const currentYear = currentCalendarDate.getFullYear();

    // Update Header
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    document.getElementById('currentMonthDisplay').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Update Navigation Buttons
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    // Remove old listeners to avoid duplicates (naive approach, better to add once but this is safe for re-init)
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

    newPrevBtn.addEventListener('click', () => changeMonth(-1));
    newNextBtn.addEventListener('click', () => changeMonth(1));

    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    // Adjust for Monday start (0 = Sunday, 1 = Monday, ...)
    // We want Monday = 0, Sunday = 6
    let startingDayOfWeek = firstDay.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;


    // Clear calendar
    calendarGrid.innerHTML = '';

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.style.opacity = '0.3';
        calendarGrid.appendChild(emptyCell);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const isPast = date < today;

        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        // Adjust local date string manually to avoid timezone issues
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dayStr = String(date.getDate()).padStart(2, '0');
        dayCell.dataset.date = `${year}-${month}-${dayStr}`;

        if (isPast) {
            dayCell.style.opacity = '0.3';
            dayCell.style.cursor = 'not-allowed';
        } else {
            dayCell.addEventListener('click', () => selectDate(dayCell));
        }

        // Highlight selected date if visible
        if (selectedDate === dayCell.dataset.date) {
            dayCell.style.background = 'var(--color-primary)';
            dayCell.style.color = 'white';
        }

        calendarGrid.appendChild(dayCell);
    }
}

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    initCalendar();
}

function selectDate(dayCell) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(cell => {
        cell.style.background = '';
        cell.style.color = '';
    });

    // Select new date
    dayCell.style.background = 'var(--color-primary)';
    dayCell.style.color = 'white';
    selectedDate = dayCell.dataset.date;

    // Show time slots
    document.getElementById('timeSlots').style.display = 'grid';
    generateTimeSlots();
}

function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = '<h3 style="grid-column: 1 / -1; margin-bottom: var(--spacing-md);">Créneaux disponibles</h3>';

    const slots = [
        '08:00', '09:00', '10:00', '11:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    slots.forEach(time => {
        const timeSlot = document.createElement('button');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        timeSlot.addEventListener('click', () => selectTime(timeSlot, time));
        timeSlotsContainer.appendChild(timeSlot);
    });
}

function selectTime(slot, time) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(s => {
        s.style.background = '';
        s.style.color = '';
        s.style.borderColor = '';
    });

    // Select new time
    slot.style.background = 'var(--color-primary)';
    slot.style.color = 'white';
    slot.style.borderColor = 'var(--color-primary)';
    selectedTime = time;

    // Show booking form
    document.getElementById('bookingForm').style.display = 'block';
    updateSummary();
}

// ============================================
// SERVICE SELECTION
// ============================================
function selectService(serviceType, price) {
    console.log('Selecting service:', serviceType, price); // Debug log
    selectedService = { type: serviceType, price: price };

    // Updated UI handling to support programmatic calls
    if (typeof event !== 'undefined' && event) {
        // Triggered by click
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
        const card = event.target.closest('.service-card');
        if (card) card.style.borderColor = 'var(--color-primary)';
    } else {
        // Triggered programmatically (handled by caller or just ignored here for now)
        // The caller (checkUrlParams) handles the visual selection manually
    }

    // Show calendar
    // Show calendar
    const calendarSection = document.getElementById('calendarSection');
    calendarSection.style.display = 'block';

    // Update Step 2 Title for Packs
    const step2Title = document.getElementById('step2Title');
    if (step2Title) {
        if (serviceType.toLowerCase().includes('pack')) {
            step2Title.textContent = "Étape 2 : Choisis ta date et ton créneau pour ta première séance";
        } else {
            step2Title.textContent = "Étape 2 : Choisis ta date et ton créneau";
        }
    }

    // Smooth scroll to step 2 - Adjusted offset based on user feedback to land exactly on title
    setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = calendarSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }, 100);

    initCalendar();
    updateSummary();
}

// ============================================
// BOOKING FORM
// ============================================
function updateSummary() {
    const summary = document.getElementById('bookingSummary');
    if (!summary) return;

    let html = '<h3>Récapitulatif de réservation</h3>';

    if (selectedService) {
        html += `<p><strong>Service:</strong> ${selectedService.type}</p>`;
        html += `<p><strong>Tarif:</strong> ${selectedService.price}€</p>`;
    }

    if (selectedDate) {
        const date = new Date(selectedDate);
        html += `<p><strong>Date:</strong> ${date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>`;
    }

    if (selectedTime) {
        html += `<p><strong>Heure:</strong> ${selectedTime}</p>`;
    }

    if (selectedService && selectedDate && selectedTime) {
        html += `<div style="margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid rgba(255,255,255,0.1);">`;
        html += `<p style="font-size: var(--font-size-2xl); color: var(--color-primary);"><strong>Total: ${selectedService.price}€</strong></p>`;
        html += `</div>`;
    }

    summary.innerHTML = html;
}

// ============================================
// PAYMENT FLOW
// ============================================
function processBooking(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!selectedService || !selectedDate || !selectedTime) {
        alert('Veuillez sélectionner un service, une date et une heure');
        return;
    }

    // Show payment section
    document.getElementById('paymentSection').style.display = 'block';
    document.getElementById('paymentSection').scrollIntoView({ behavior: 'smooth' });
}

function processPayment(event) {
    event.preventDefault();

    // Simulate payment processing
    const btn = event.target.querySelector('button[type="submit"]');
    btn.textContent = 'Traitement...';
    btn.disabled = true;

    setTimeout(() => {
        // Show confirmation
        document.body.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: var(--spacing-xl);">
        <div class="card card-glass text-center" style="max-width: 600px; padding: var(--spacing-3xl);">
          <div style="font-size: 5rem; margin-bottom: var(--spacing-lg);">✅</div>
          <h1 style="color: var(--color-success);"> Réservation confirmée !</h1>
          <p class="text-muted" style="font-size: var(--font-size-lg); margin: var(--spacing-xl) 0;">
            Votre séance de <strong>${selectedService.type}</strong><br>
            Le ${new Date(selectedDate).toLocaleDateString('fr-FR')} à ${selectedTime}
          </p>
          <p class="text-muted">
            Un email de confirmation a été envoyé à votre adresse.<br>
            Je vous contacterai prochainement pour finaliser les détails.
          </p>
          <a href="index.html" class="btn btn-primary btn-lg" style="margin-top: var(--spacing-xl);">
            Retour à l'accueil
          </a>
        </div>
      </div>
    `;
    }, 2000);
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Render services dynamically
    renderServices();

    initCalendar();

    const bookingForm = document.getElementById('bookingDetailsForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', processBooking);
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', processPayment);
    }

    // Check for service in URL
    checkUrlParams();
});

// ============================================
// URL PARAMETER HANDLING (Auto-select service)
// ============================================
function checkUrlParams() {
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        console.log('Checking URL params:', serviceParam);

        if (serviceParam) {
            // Map service params to service names and prices
            const serviceMap = {
                'decouverte': { name: 'Séance Découverte', price: 40, selector: '[data-service="decouverte"]' },
                'coaching-1': { name: 'Coaching Individuel', price: 60, selector: '[data-service="coaching-1"]' },
                'pack-performance': { name: 'Pack Performance (5 séances)', price: 275, selector: '[data-service="pack-performance"]' },
                'pack-transformation': { name: 'Pack Transformation (10 séances)', price: 500, selector: '[data-service="pack-transformation"]' },
                'online-starter': { name: 'Coaching En Ligne - Starter', price: 80, selector: '[data-service="online-starter"]' },
                'online-pro': { name: 'Coaching En Ligne - Pro', price: 120, selector: '[data-service="online-pro"]' },
                'online-elite': { name: 'Coaching En Ligne - Elite', price: 160, selector: '[data-service="online-elite"]' },
                // Map specialized programs to Pack Transformation card for visual feedback
                'programme-perte-poids': { name: 'Programme Perte de Poids', price: 297, selector: '[data-service="pack-transformation"]' },
                'programme-prise-masse': { name: 'Programme Prise de Masse', price: 397, selector: '[data-service="pack-transformation"]' }
            };

            const serviceData = serviceMap[serviceParam];

            if (serviceData) {
                // Select service logic
                selectService(serviceData.name, serviceData.price);

                // Visual selection if card exists
                if (serviceData.selector) {
                    const card = document.querySelector(serviceData.selector);
                    if (card) {
                        // Reset other cards
                        document.querySelectorAll('.service-card').forEach(c => c.style.borderColor = 'rgba(255, 255, 255, 0.1)');
                        // Highlight specific card
                        card.style.borderColor = 'var(--color-primary)';
                        // Scroll to card slightly to show selection
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        }
    }, 500);
}
