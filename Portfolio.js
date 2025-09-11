// Simple hash "router" to switch sections
const routes = {
  '/': document.getElementById('home'),
  '/projects': document.getElementById('projects'),
  '/contact': document.getElementById('contact'),
};

function setActiveLink(path) {
  document.querySelectorAll('.nav-link').forEach(a => {
    const match = a.getAttribute('href') === `#${path}`;
    a.classList.toggle('active', match || (path === '/' && a.getAttribute('href') === '#/'));
  });
}

function navigate() {
  const path = (location.hash.slice(1) || '/');
  // Show section
  Object.entries(routes).forEach(([route, el]) => {
    el.classList.toggle('active', route === path);
  });
  // Update active link
  setActiveLink(path);
  // Move focus to main for accessibility
  document.getElementById('app').focus();
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // Close mobile nav on link click
  document.querySelectorAll('[data-link]').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = 'Copy'), 1000);
      } catch (e) {
        alert('Copy failed — you can select and copy manually.');
      }
    });
  });

  navigate();
});
