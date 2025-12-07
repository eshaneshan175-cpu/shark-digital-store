document.addEventListener('DOMContentLoaded', () => {
  /* ========= AOS (fancy animations) ========= */
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  /* ========= Surfshark Popup ========= */
  const salePopup = document.getElementById('salePopup');
  const popupClose = document.getElementById('popupClose');
  const pageWrapper = document.getElementById('pageWrapper');

  function openPopup() {
    if (!salePopup || !pageWrapper) return;
    salePopup.classList.add('show');
    pageWrapper.classList.add('blurred');
    document.body.classList.add('no-scroll');
  }

  function closePopup() {
    if (!salePopup || !pageWrapper) return;
    salePopup.classList.remove('show');
    pageWrapper.classList.remove('blurred');
    document.body.classList.remove('no-scroll');
  }

  // Show popup after slight delay on load
  setTimeout(openPopup, 700);

  if (popupClose) {
    popupClose.addEventListener('click', closePopup);
  }

  if (salePopup) {
    salePopup.addEventListener('click', (e) => {
      if (e.target === salePopup) {
        closePopup();
      }
    });
  }

  /* ========= Mobile Nav ========= */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ========= Smooth scroll for header links (Home / Offers / Reviews / FAQs / Contact) ========= */
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const top =
        targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });

  /* ========= FAQ Accordion ========= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      // Close others
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) {
            otherAns.style.maxHeight = null;
          }
        }
      });

      // Toggle this one
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ========= Fake Review Form Logic ========= */
  document.querySelectorAll('.review-form-card').forEach((card) => {
    const toggleBtn = card.querySelector('.review-form-toggle');
    const form = card.querySelector('.review-form');
    const messageEl = card.querySelector('.review-form-message');

    if (!toggleBtn || !form) return;

    // Toggle open / close
    toggleBtn.addEventListener('click', () => {
      card.classList.toggle('open');
    });

    // Star rating
    const starButtons = form.querySelectorAll('.stars-input button');
    const ratingInput = form.querySelector('input[name="rating"]');

    starButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value') || '5';
        ratingInput.value = value;

        starButtons.forEach((b) => {
          b.classList.toggle(
            'active',
            Number(b.getAttribute('data-value')) <= Number(value)
          );
        });
      });
    });

    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // fake “submit”
      form.reset();
      ratingInput.value = '5';
      starButtons.forEach((b) => {
        b.classList.toggle(
          'active',
          Number(b.getAttribute('data-value')) <= 5
        );
      });

      if (messageEl) {
        messageEl.textContent = 'Thank you! Your review will be live soon.';
      }
    });
  });
});
