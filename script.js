const typedText = document.getElementById('typed');
const words = [
  'Flutter Developer',
  'Web Developer',
  'Problem Solver',
  'Creative Coder'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!typedText) return;

  if (!isDeleting && charIndex < currentWord.length) {
    typedText.textContent += currentWord.charAt(charIndex);
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    typedText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = isDeleting ? 50 : 90;
  setTimeout(typeLoop, speed);
}

typeLoop();

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  if (themeIcon) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  }
};

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(current);
    localStorage.setItem('portfolio-theme', current);
  });
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

emailjs.init("jCFAFX_28-RJ3GOvN");

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formMessage.textContent = 'Sending...';

    emailjs.sendForm(
      "service_wu0vwnx",
      "template_wblb4se",
      contactForm
    )
    .then(() => {
      formMessage.textContent = 'Message sent successfully!';
      contactForm.reset();
    })
    .catch((error) => {
      formMessage.textContent = 'Failed to send message. Please try again.';
      console.log(error);
    });
  });
}

