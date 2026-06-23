/**
 * Manjunath Press - Core JavaScript
 * Interactions, Animations, and Dynamic Previews
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initServiceTabs();
  initCardCustomizer();
  initInquiryForm();
});

/**
 * 1. Sticky Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Run once on load in case page is already scrolled
  handleScroll();
}

/**
 * 2. Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Toggle body scroll to prevent background scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/**
 * 3. Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed to optimize performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * 4. Service Page Tabs Switcher
 */
function initServiceTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.service-tab-content');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active states from buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Remove active states from content tabs
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none'; // Ensure hidden layout
      });

      // Add active state to clicked button
      button.classList.add('active');

      // Add active state to matching content panel
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.style.display = 'grid'; // Set flex/grid display before transition
        // Force reflow for CSS animation to trigger properly
        activeContent.offsetHeight;
        activeContent.classList.add('active');
      }
    });
  });
}

/**
 * 5. Interactive Wedding Card Customizer (Home Page Feature)
 */
function initCardCustomizer() {
  const paperBtns = document.querySelectorAll('[data-opt="paper"]');
  const printBtns = document.querySelectorAll('[data-opt="print"]');
  const previewCard = document.querySelector('.preview-card-item');
  const previewTitle = document.querySelector('.preview-card-title');
  const previewDesc = document.querySelector('.preview-card-desc');
  const previewInk = document.querySelector('.preview-card-ink');

  if (!previewCard) return;

  let currentPaper = 'traditional';
  let currentPrint = 'gold';

  const updateCardPreview = () => {
    // Reset classes
    previewCard.className = 'preview-card-item';

    // Apply paper style class
    previewCard.classList.add(`style-${currentPaper}`);

    // Update typography details based on options
    if (currentPaper === 'traditional') {
      previewTitle.textContent = 'Manjunath & Devika';
      previewDesc.textContent = 'Traditional Wedding Invitation';
    } else if (currentPaper === 'modern') {
      previewTitle.textContent = 'M & D • 2026';
      previewDesc.textContent = 'Sleek Modern Evening Invite';
    } else {
      previewTitle.textContent = 'MANJUNATH + DEVIKA';
      previewDesc.textContent = 'Elegant Minimalist Announcement';
    }

    // Update print dynamic ink message
    let inkText = '';
    if (currentPrint === 'gold') {
      inkText = '✦ Finished with Gold Foil Stamping ✦';
    } else if (currentPrint === 'silver') {
      inkText = '✧ Finished with Silver Foil Stamping ✧';
    } else {
      inkText = '▩ Finished with Premium Screen Printed Red Ink ▩';
    }
    previewInk.textContent = inkText;
  };

  // Paper button click handlers
  paperBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paperBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPaper = btn.getAttribute('data-val');
      updateCardPreview();
    });
  });

  // Print technique button click handlers
  printBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      printBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPrint = btn.getAttribute('data-val');
      updateCardPreview();
    });
  });

  // Initial render
  updateCardPreview();
}

/**
 * 6. Contact Inquiry Form Handler
 */
function initInquiryForm() {
  const form = document.querySelector('.inquiry-form');
  const formStatus = document.querySelector('.form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset status
    formStatus.style.display = 'none';
    formStatus.className = 'form-status';

    // Form values
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Validation checks
    let isValid = true;
    let errorMessage = '';

    if (!nameInput.value.trim()) {
      isValid = false;
      errorMessage = 'Please enter your full name.';
    } else if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    } else if (!messageInput.value.trim()) {
      isValid = false;
      errorMessage = 'Please tell us about your requirements.';
    }

    if (!isValid) {
      formStatus.textContent = errorMessage;
      formStatus.style.display = 'block';
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    // Success response simulation
    formStatus.textContent = 'Thank you! Your printing inquiry has been sent successfully. Our team will contact you within 24 hours.';
    formStatus.classList.add('success');
    formStatus.style.display = 'block';
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Reset form fields
    form.reset();
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
