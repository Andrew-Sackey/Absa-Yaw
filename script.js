// Slideshow logic
const slides = document.querySelectorAll('.slide');
const slideBtns = document.querySelectorAll('.slide-btn');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  slideBtns.forEach(b => b.classList.remove('active'));
  slides[index].classList.add('active');
  slideBtns[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

slideBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    currentSlide = idx;
    showSlide(idx);
  });
});

// Counter animation
const counters = document.querySelectorAll('.stat-number');

const animateCount = (el, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);

  const step = () => {
    start += increment;
    if (start >= target) {
      el.textContent = target + (el.dataset.count.includes('%') ? '%' : '+');
    } else {
      el.textContent = Math.floor(start) + (el.dataset.count.includes('%') ? '%' : '+');
      requestAnimationFrame(step);
    }
  };

  step();
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.count.replace('%', ''));
        animateCount(counter, target);
      });
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats-row'));
