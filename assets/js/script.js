/**
 * HariVerse Portfolio — Main JavaScript
 * assets/js/script.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuBtn = document.getElementById('menuBtn');
  const navlinks = document.getElementById('navlinks');

  if (menuBtn && navlinks) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navlinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking navigation links
    navlinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navlinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
      if (!navlinks.contains(e.target) && !menuBtn.contains(e.target)) {
        if (navlinks.classList.contains('open')) {
          navlinks.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.textContent = '☰';
        }
      }
    });
  }

  // 2. Dynamic Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Project Filter Tabs (on projects.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const cardCategories = (card.getAttribute('data-category') || '').split(' ');
          if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = '';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease';
              card.style.opacity = '1';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Contact Form Handler with Web3Forms (on contact.html)
  const form = document.getElementById('form') || document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append("access_key", "87e90910-c5d8-47c5-ac95-fb0a94738c1f");

      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.textContent = "Success! Your message has been sent.";
            formStatus.style.display = 'block';
          }
          alert("Success! Your message has been sent.");
          form.reset();
        } else {
          if (formStatus) {
            formStatus.className = 'form-status error';
            formStatus.textContent = "Error: " + data.message;
            formStatus.style.display = 'block';
          }
          alert("Error: " + data.message);
        }
      } catch (error) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = "Something went wrong. Please try again.";
          formStatus.style.display = 'block';
        }
        alert("Something went wrong. Please try again.");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
