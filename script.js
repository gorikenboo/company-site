'use strict';

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const globalNav = document.querySelector('.global-nav');
const navLinks = document.querySelectorAll('.global-nav a');
const yearElement = document.querySelector('#current-year');

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};

const closeMenu = () => {
  if (!menuButton || !globalNav) return;

  menuButton.setAttribute('aria-expanded', 'false');
  globalNav.classList.remove('is-open');
  header?.classList.remove('menu-active');
  document.body.classList.remove('menu-open');

  const label = menuButton.querySelector('.sr-only');
  if (label) label.textContent = 'メニューを開く';
};

const toggleMenu = () => {
  if (!menuButton || !globalNav) return;

  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  globalNav.classList.toggle('is-open', !isOpen);
  header?.classList.toggle('menu-active', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);

  const label = menuButton.querySelector('.sr-only');
  if (label) label.textContent = isOpen ? 'メニューを開く' : 'メニューを閉じる';
};

menuButton?.addEventListener('click', toggleMenu);
navLinks.forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
