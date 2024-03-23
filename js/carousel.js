let slides = document.getElementsByClassName('carousel-slide');

const showSlides = () => {
  const currentSlide = document.querySelector('[data-active]');

  let nextSlide = [...slides].indexOf(currentSlide) + 1;

  if (nextSlide >= slides.length) {
    nextSlide = 0;
  }
  if (nextSlide < 0) {
    nextSlide = slides.length - 1;
  }

  delete currentSlide.dataset.active;
  slides[nextSlide].dataset.active = true;
};

const loopSlides = () => {
  showSlides();
};

setInterval(loopSlides, 10000);