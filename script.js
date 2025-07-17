/* Target the two elements and either add or remove the class */

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Typewriter Effect
const typedText = document.querySelector(".section__text__p2");
const phrases = ["Developer", "Product Manager", "Entrepreneur", "Data Scientist"];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeLoop() {
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

  const delay = isDeleting ? 50 : 150;
  setTimeout(typeLoop, delay);
}

typeLoop();

// Fade-in on scroll
const sections = document.querySelectorAll("section");

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

