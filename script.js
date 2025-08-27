/* Target the two elements and either add or remove the class */

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;
  const isOpen = menu.classList.toggle("open");
  icon.classList.toggle("open");
  icon.setAttribute("aria-expanded", String(isOpen));
}

// Theme toggle using alternate stylesheet
(function initThemeToggle() {
  const themeLink = document.querySelector('#theme-link');
  if (!themeLink) return;

  const THEME_KEY = 'preferred-theme';
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(THEME_KEY);
  let current = saved || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    if (!themeLink) return;
    if (theme === 'dark') {
      themeLink.setAttribute('href', 'style_dark.css');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      themeLink.setAttribute('href', 'style.css');
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function toggleTheme() {
    current = current === 'dark' ? 'light' : 'dark';
    applyTheme(current);
    try { localStorage.setItem(THEME_KEY, current); } catch (_) {}
  }

  applyTheme(current);

  const desktopBtn = document.getElementById('theme-toggle');
  const mobileBtn = document.getElementById('theme-toggle-mobile');
  if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
  if (mobileBtn) mobileBtn.addEventListener('click', toggleTheme);
})();

// Enhance hamburger icon accessibility
(function initHamburgerA11y() {
  const icon = document.querySelector('.hamburger-icon');
  if (!icon) return;
  icon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
})();

// Typewriter Effect
const typedText = document.querySelector(".section__text__p2");
const phrases = ["CS Student", "Problem Solver", "Entrepreneur", "Data Scientist"];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedText) return;
  const current = phrases[currentPhrase];
  typedText.textContent = current.substring(0, currentChar);

  if (!isDeleting && currentChar < current.length) {
    currentChar++;
  } else if (isDeleting && currentChar > 0) {
    currentChar--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }
  }

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delay = reduceMotion ? 0 : (isDeleting ? 50 : 150);
  setTimeout(typeLoop, delay);
}

typeLoop();

// Fade-in on scroll
const sections = document.querySelectorAll("section");

if (typeof IntersectionObserver === 'function') {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 1s ease";
    observer.observe(section);
  });
} else {
  // Fallback: show sections immediately
  sections.forEach(section => {
    section.style.opacity = 1;
    section.style.transform = "none";
  });
}