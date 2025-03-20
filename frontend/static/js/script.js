document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('waitlistModal');
  const openWaitlist = document.getElementById('openWaitlist');
  const closeModal = document.querySelector('.modal-close');

  if (openWaitlist) {
    openWaitlist.addEventListener('click', () => {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      modal.classList.add('modal-active');
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('modal-active');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 300);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const waitlistForm = document.getElementById("waitlistForm");

    waitlistForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            wallet_address: "0x1234ABCD",  // Replace with actual wallet input
            email: document.getElementById("email").value,
            username: document.getElementById("name").value,
            company: document.getElementById("company").value,
            businessSize: document.getElementById("businessSize").value
        };

        console.log("Sending data:", formData);

        try {
            const response = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Server Response:", data);
            alert(data.message);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    });
});

  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
          <i class="fas fa-${
            type === 'success' ? 'check-circle' : 'exclamation-circle'
          }"></i>
          <span>${message}</span>
        </div>
      `;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll('.feature-card, .step, .benefit-card')
    .forEach((el) => {
      observer.observe(el);
    });

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(
        progress * (end - start) + start
      ).toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = parseInt(entry.target.getAttribute('data-value'));
          if (value) {
            animateValue(entry.target, 0, value, 2000);
            statsObserver.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-number').forEach((stat) => {
    statsObserver.observe(stat);
  });
});

const themeToggler = document.querySelector('.theme-toggler');

const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
};

const toggleTheme = () => {
  const currentTheme = document.body.classList.contains('dark-theme')
    ? 'dark'
    : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
};
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggler.addEventListener('click', toggleTheme);
