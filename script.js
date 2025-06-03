// Sample product data (customize as needed)
const products = [
  {
    id: 'script1',
    name: 'Auto Recon Script',
    description: 'Automates reconnaissance tasks in one click—save hours instantly.',
    category: 'Scripts',
  },
  {
    id: 'script2',
    name: 'Payload Generator',
    description: 'Generates custom payloads for pen‑testing, automatically obfuscated.',
    category: 'Scripts',
  },
  {
    id: 'soft1',
    name: 'PhantomScanner Pro',
    description: 'Advanced zero‑day vulnerability scanner trusted by top red teams.',
    category: 'Software',
  },
  {
    id: 'soft2',
    name: 'Stealth Encryptor',
    description: 'Military‑grade file encryption tool—no trace left behind.',
    category: 'Software',
  },
  {
    id: 'hack1',
    name: 'GhostShell Framework',
    description: 'Modular exploitation framework for professional pentesters.',
    category: 'Hacking',
  },
  {
    id: 'hack2',
    name: 'PacketSniffer X',
    description: 'Real‑time network packet analysis with deep‑packet inspection.',
    category: 'Hacking',
  }
];

document.addEventListener('DOMContentLoaded', () => {
  /*==========================
    SECTION NAVIGATION
  ==========================*/
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function showSection(pageId) {
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === pageId);
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-page') === pageId);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showSection(link.getAttribute('data-page'));
    });
  });

  // “See More” on the hero
  document.querySelectorAll('.btn-primary[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.getAttribute('data-page'));
    });
  });

  /*==========================
    POPULATE MARKETPLACE CARDS
  ==========================*/
  const grid = document.getElementById('products-grid');
  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${prod.name}</h3>
      <p>${prod.description}</p>
      <button class="btn btn-primary request-btn" data-id="${prod.id}">Request Product</button>
    `;
    grid.appendChild(card);
  });

  /*==========================
    REQUEST MODAL LOGIC
  ==========================*/
  const modal = document.getElementById('request-modal');
  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const prodDisplay = document.getElementById('modal-product-display');
  const prodNameInput = document.getElementById('modal-product-name');
  const qtyInput = document.getElementById('modal-quantity');
  const emailInput = document.getElementById('modal-email');
  const notesInput = document.getElementById('modal-notes');
  const requestForm = document.getElementById('request-form');

  // Open modal when “Request Product” clicked
  document.querySelectorAll('.request-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.id;
      const prod = products.find(p => p.id === pid);
      if (!prod) return;
      prodDisplay.value = prod.name;
      prodNameInput.value = prod.name;
      qtyInput.value = 1;
      emailInput.value = '';
      notesInput.value = '';
      modal.classList.remove('hidden');
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  backdrop.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Handle request form submission
  requestForm.addEventListener('submit', e => {
    e.preventDefault();
    const product = encodeURIComponent(prodNameInput.value.trim());
    const quantity = encodeURIComponent(qtyInput.value);
    const userEmail = encodeURIComponent(emailInput.value.trim());
    const notes = encodeURIComponent(notesInput.value.trim());

    const subject = `[Product Request] ${product}`;
    let body = `Product: ${product}%0D%0AQuantity: ${quantity}%0D%0AUser Email: ${userEmail}`;
    if (notes) body += `%0D%0AAdditional Notes: ${notes}`;

    window.location.href = `mailto:richiesmarketplace@proton.me?subject=${encodeURIComponent(subject)}&body=${body}`;
    modal.classList.add('hidden');
  });

  /*==========================
    CONTACT FORM LOGIC
  ==========================*/
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('contact-name').value.trim());
    const email = encodeURIComponent(document.getElementById('contact-email').value.trim());
    const message = encodeURIComponent(document.getElementById('contact-message').value.trim());

    const subject = `[Contact] Inquiry`;
    let body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;

    window.location.href = `mailto:richiesmarketplace@proton.me?subject=${encodeURIComponent(subject)}&body=${body}`;
  });

  /*==========================
    FEATURED SLIDESHOW LOGIC
  ==========================*/
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
    const offset = -index * 100; // each slide = 100%
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      showSlide(currentIndex);
      resetInterval();
    });
  });

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Initialize slideshow
  showSlide(currentIndex);
  slideInterval = setInterval(nextSlide, 5000);
});