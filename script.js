// MiLife Medicity Pediatric Care & Rehabilitation Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header elevation on scroll
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  function closeMobileNav() {
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (mobileBtn) {
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  function toggleMobileNav(e) {
    if (e) e.stopPropagation();
    if (navLinks && mobileBtn) {
      const isExpanding = !navLinks.classList.contains('active');
      navLinks.classList.toggle('active');
      mobileBtn.innerHTML = isExpanding ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      mobileBtn.setAttribute('aria-expanded', isExpanding ? 'true' : 'false');
    }
  }

  if (mobileBtn && navLinks) {
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.addEventListener('click', toggleMobileNav);

    // Close when clicking outside header / nav
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeMobileNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileNav();
      }
    });

    // Close if resized to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileNav();
      }
    });
  }

  // Package Calculator
  const rates = {
    SAR: { perDay: 500, symbol: 'SAR', prefix: true },
    AED: { perDay: 490, symbol: 'AED', prefix: true },
    USD: { perDay: 133, symbol: '$', prefix: true },
    KWD: { perDay: 41, symbol: 'KWD', prefix: true },
    INR: { perDay: 11200, symbol: '₹', prefix: true }
  };

  let selectedCurrency = 'SAR';
  let selectedDays = 21; // Standard recommended 3 weeks

  const daysButtons = document.querySelectorAll('.btn-calc-days');
  const currencyButtons = document.querySelectorAll('.btn-calc-curr');
  const costDisplay = document.getElementById('calcCostDisplay');
  const sessionsDisplay = document.getElementById('calcSessionsDisplay');
  const daysDisplay = document.getElementById('calcDaysDisplay');
  const calcWhatsappBtn = document.getElementById('calcWhatsappBtn');

  function updateCalculation() {
    const curr = rates[selectedCurrency] || rates['SAR'];
    const total = curr.perDay * selectedDays;
    const formattedTotal = total.toLocaleString();
    
    if (costDisplay) {
      costDisplay.textContent = `${curr.symbol} ${formattedTotal}`;
    }

    const minSessions = selectedDays * 8;
    const maxSessions = selectedDays * 12;
    if (sessionsDisplay) {
      sessionsDisplay.textContent = `${minSessions}–${maxSessions} Intensive Sessions`;
    }

    if (daysDisplay) {
      daysDisplay.textContent = `${selectedDays} Days Complete Program`;
    }

    if (calcWhatsappBtn) {
      const message = `Hello MiLife Medicity Team, I would like to inquire about the ${selectedDays}-day Pediatric Rehabilitation package estimated at ${curr.symbol} ${formattedTotal} (${curr.symbol} ${curr.perDay}/day). Please guide me.`;
      calcWhatsappBtn.href = `https://wa.me/919847000000?text=${encodeURIComponent(message)}`;
    }
  }

  daysButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      daysButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDays = parseInt(btn.dataset.days, 10);
      updateCalculation();
    });
  });

  currencyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCurrency = btn.dataset.curr;
      updateCalculation();
    });
  });

  updateCalculation();

  // Package Dashboard Interactive Tabs
  const tabButtons = document.querySelectorAll('.pkg-tab-btn');
  const tabPanes = document.querySelectorAll('.pkg-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Condition Quick Selection in Consultation Form
  const conditionTags = document.querySelectorAll('.condition-tag-select');
  const conditionInput = document.getElementById('selectedConditionInput');

  conditionTags.forEach(tag => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('selected');
      const selected = Array.from(document.querySelectorAll('.condition-tag-select.selected'))
        .map(t => t.dataset.condition);
      if (conditionInput) {
        conditionInput.value = selected.join(', ');
      }
    });
  });

  // Direct WhatsApp Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('parentName')?.value || '';
      const childAge = document.getElementById('childAge')?.value || '';
      const country = document.getElementById('countrySelect')?.value || 'Saudi Arabia';
      const concerns = document.getElementById('concernsNotes')?.value || '';
      const conditions = conditionInput?.value || 'General Pediatric Assessment';
      const duration = document.getElementById('plannedStaySelect')?.value || '3-4 Weeks';

      const waText = `*Pediatric Care Inquiry - MiLife Medicity* 🩺👶\n` +
        `• *Parent Name:* ${parentName}\n` +
        `• *Child Age:* ${childAge}\n` +
        `• *Country/City:* ${country}\n` +
        `• *Primary Concern:* ${conditions}\n` +
        `• *Proposed Stay:* ${duration}\n` +
        `• *Additional Notes:* ${concerns}\n\n` +
        `Please provide details on doctor availability, care plan, and SAR 500/day package bookings.`;

      const waUrl = `https://wa.me/919847000000?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    });
  }

  // Smooth scroll offset for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile nav if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          if (mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });
});
