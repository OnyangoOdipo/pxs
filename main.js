// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  disable: 'mobile'
});

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smartphone: {
    smooth: true
  },
  tablet: {
    smooth: true
  }
});

// GSAP Animations
gsap.from('.hero-title', {
  duration: 1,
  y: 100,
  opacity: 0,
  ease: 'power4.out',
  delay: 0.5
});

gsap.from('.hero-subtitle', {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: 'power4.out',
  delay: 0.8
});

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
}); 

// Page Transitions
Barba.Pjax.start();

Barba.Dispatcher.on('transitionCompleted', function() {
  // Reinitialize animations and scripts after page transition
  initializeScripts();
});

// Theme Switching
const themeSwitch = document.querySelector('.theme-switch');
let isDark = true;

const themes = {
  dark: {
    background: '#0a192f',
    text: '#8892b0',
    primary: '#64ffda'
  },
  light: {
    background: '#f5f5f5',
    text: '#2d3436',
    primary: '#0984e3'
  }
};

themeSwitch.addEventListener('click', () => {
  isDark = !isDark;
  const theme = isDark ? themes.dark : themes.light;
  
  document.documentElement.style.setProperty('--background', theme.background);
  document.documentElement.style.setProperty('--text', theme.text);
  document.documentElement.style.setProperty('--primary', theme.primary);
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}); 