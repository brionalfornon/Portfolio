// Tailwind CDN Configuration (must run before Tailwind processes the DOM)
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        slate: {
          850: '#151e32',
          925: '#0b1120',
          950: '#070b14',
        }
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toastEl = document.getElementById('toast');
  const toastMsgEl = document.getElementById('toast-message');
  const yearEl = document.getElementById('current-year');
  let toastTimeout;

  // Set current year in footer
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Initialize theme from localStorage or default to dark
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      htmlEl.classList.remove('dark');
    } else {
      htmlEl.classList.add('dark');
    }
  } catch (e) {
    htmlEl.classList.add('dark');
  }

  // Toggle dark / light theme
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlEl.classList.toggle('dark');
      try {
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
      } catch (e) {}
    });
  }

  // Show toast notification
  function showToast(message) {
    if (!toastEl || !toastMsgEl) return;
    toastMsgEl.textContent = message;
    toastEl.classList.remove('translate-y-20', 'opacity-0');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.add('translate-y-20', 'opacity-0');
    }, 2800);
  }

  // Copy text to clipboard with fallback
  async function copyTextToClipboard(text, successMessage) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast(successMessage);
      } catch (fallbackErr) {
        showToast('Unable to copy automatically.');
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  // Copy Email Address
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'brion.alfornon@example.com';
      copyTextToClipboard(email, 'Email address copied!');
    });
  }
});