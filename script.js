/* Target the two elements and either add or remove the class */

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const isOpen = menu.classList.contains("open");
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  
  // Update ARIA attributes
  icon.setAttribute("aria-expanded", !isOpen);
  menu.setAttribute("aria-hidden", isOpen);
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

// Dark mode toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const themeIcon = document.querySelector('.theme-toggle-icon');
  const themeIconMobile = document.querySelector('#theme-toggle-mobile .theme-toggle-icon');
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update icon based on current theme
  function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    if (themeIcon) themeIcon.textContent = icon;
    if (themeIconMobile) themeIconMobile.textContent = icon;
  }
  
  updateThemeIcon(currentTheme);
  
  // Toggle theme function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update ARIA pressed state
    const isDark = newTheme === 'dark';
    if (themeToggle) themeToggle.setAttribute('aria-pressed', isDark);
    if (themeToggleMobile) themeToggleMobile.setAttribute('aria-pressed', isDark);
  }
  
  // Add event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }
}

// Scroll Progress Indicator
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / documentHeight) * 100;
  const progressBar = document.querySelector('.scroll-progress-bar');
  const scrollProgress = document.querySelector('.scroll-progress');
  
  progressBar.style.width = progress + '%';
  scrollProgress.setAttribute('aria-valuenow', Math.round(progress));
}

// Navigation Dots Functionality
function initNavigationDots() {
  const navDots = document.querySelectorAll('.nav-dot');
  const sections = document.querySelectorAll('section');
  
  // Add click and keyboard listeners to nav dots
  navDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetSection = document.getElementById(dot.dataset.section);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    // Add keyboard support
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dot.click();
      }
    });
  });
  
  // Update active nav dot on scroll
  function updateActiveNavDot() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.dataset.section === current) {
        dot.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavDot);
}

// Parallax Effect
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.section__pic-container img');
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
      element.style.transform = `translateY(${rate}px)`;
    });
  }
  
  window.addEventListener('scroll', updateParallax);
}

// Enhanced Scroll Animations
function initEnhancedScrollAnimations() {
  const animatedElements = document.querySelectorAll('.details-container, .project-img, .btn');
  
  const animationObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = Math.random() * 0.3 + 's';
          entry.target.classList.add('animate-in');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigationDots();
  initParallaxEffect();
  initEnhancedScrollAnimations();
  initSkillsProgress();
  initProjectFiltering();
  initContactForm();
  initMobileEnhancements();
  optimizePerformance();
});

// Skills Progress Animation
function initSkillsProgress() {
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  
  const skillsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillLevel = entry.target.dataset.skill;
          entry.target.style.width = skillLevel + '%';
        }
      });
    },
    { threshold: 0.5 }
  );
  
  skillBars.forEach(bar => {
    skillsObserver.observe(bar);
  });
}

// Project Filtering
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Contact Form Validation
function initContactForm() {
  const form = document.getElementById('contact-form');
  const inputs = form.querySelectorAll('input, textarea');
  
  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearErrors(input));
  });
  
  // Form submission
  form.addEventListener('submit', handleFormSubmit);
  
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
          isValid = false;
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;
        
      case 'subject':
        if (!value) {
          errorMessage = 'Subject is required';
          isValid = false;
        } else if (value.length < 5) {
          errorMessage = 'Subject must be at least 5 characters';
          isValid = false;
        }
        break;
        
      case 'message':
        if (!value) {
          errorMessage = 'Message is required';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters';
          isValid = false;
        }
        break;
    }
    
    if (isValid) {
      field.classList.remove('error');
      errorElement.classList.remove('show');
    } else {
      field.classList.add('error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('show');
    }
    
    return isValid;
  }
  
  function clearErrors(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.name}-error`);
    errorElement.classList.remove('show');
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (isFormValid) {
      // Show loading state
      const btnText = document.querySelector('.btn-text');
      const btnLoading = document.querySelector('.btn-loading');
      const submitBtn = form.querySelector('button[type="submit"]');
      
      btnText.style.display = 'none';
      btnLoading.style.display = 'block';
      submitBtn.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
        
        // Reset button state
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      }, 2000);
    }
  }
}

// Touch/Mobile Enhancements
function initMobileEnhancements() {
  // Add touch feedback for buttons
  const touchElements = document.querySelectorAll('.btn, .icon, .nav-dot, .filter-btn, .theme-toggle');
  
  touchElements.forEach(element => {
    element.addEventListener('touchstart', () => {
      element.style.transform = 'scale(0.95)';
    });
    
    element.addEventListener('touchend', () => {
      element.style.transform = '';
    });
  });
  
  // Swipe gesture for project navigation
  let startX = 0;
  let startY = 0;
  const projectSection = document.getElementById('projects');
  
  if (projectSection) {
    projectSection.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });
    
    projectSection.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // Only process horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const activeBtn = document.querySelector('.filter-btn.active');
        const currentIndex = Array.from(filterBtns).indexOf(activeBtn);
        
        if (diffX > 0 && currentIndex < filterBtns.length - 1) {
          // Swipe left - next filter
          filterBtns[currentIndex + 1].click();
        } else if (diffX < 0 && currentIndex > 0) {
          // Swipe right - previous filter
          filterBtns[currentIndex - 1].click();
        }
      }
    });
  }
  
  // Enhanced scroll performance for mobile
  let ticking = false;
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

// Viewport height fix for mobile browsers
function setVHFix() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVHFix);
setVHFix();

// Performance Optimizations
function optimizePerformance() {
  // Debounce scroll events for better performance
  let scrollTimeout;
  let scrollTicking = false;
  
  function handleScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }
  
  // Debounce resize events
  function handleResize() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setVHFix();
    }, 100);
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
  
  // Preload critical images
  const criticalImages = [
    './assets/profile-pic.png'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  // Intersection Observer for lazy loading non-critical elements
  const lazyElements = document.querySelectorAll('[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          lazyImageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });
    
    lazyElements.forEach(img => {
      lazyImageObserver.observe(img);
    });
  }
}

// Add scroll event listeners
window.addEventListener('scroll', () => {
  updateScrollProgress();
});

