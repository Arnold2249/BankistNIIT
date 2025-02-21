'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' &&  !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Image Lazy Loading
const imgTargets= document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));


// Text Animation
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting){
      return;
    }
    
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver= new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Slider Functionality
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');
let currentSlide = 0;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(dot => dot.classList.remove('dots__dot--active'));
  dots[slide].classList.add('dots__dot--active');
};

const nextSlide = function () {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

// Initialize
createDots();
goToSlide(0);
activateDot(0);

// Smooth Scrolling
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Tabbed Component/Navigation
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.operations__tab');
  const contents = document.querySelectorAll('.operations__content');

  tabs.forEach(tab => {
      tab.addEventListener('click', function () {
          // Remove active class from all tabs and contents
          tabs.forEach(t => t.classList.remove('operations__tab--active'));
          contents.forEach(c => c.classList.remove('operations__content--active'));

          // Add active class to the clicked tab and corresponding content
          this.classList.add('operations__tab--active');
          const tabNumber = this.dataset.tab;
          document.querySelector(`.operations__content--${tabNumber}`).classList.add('operations__content--active');
      });
  });

  // Set the initial active tab and content
  tabs[0].click();
});
