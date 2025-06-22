// Enhanced Slideshow functionality for 5 slides
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideButtons = document.querySelectorAll('.slide-btn');
const totalSlides = slides.length;

// Function to show specific slide
function showSlide(index) {
  // Remove active class from all slides and buttons
  slides.forEach(slide => slide.classList.remove('active'));
  slideButtons.forEach(btn => btn.classList.remove('active'));
  
  // Add active class to current slide and button
  slides[index].classList.add('active');
  slideButtons[index].classList.add('active');
  
  currentSlide = index;
}

// Function to go to next slide
function nextSlide() {
  const next = (currentSlide + 1) % totalSlides;
  showSlide(next);
}

// Function to go to previous slide
function prevSlide() {
  const prev = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(prev);
}

// Add click event listeners to slide buttons
slideButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    showSlide(index);
  });
});

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-advance when user interacts
function pauseSlideshow() {
  clearInterval(slideInterval);
  // Resume after 10 seconds of no interaction
  setTimeout(() => {
    slideInterval = setInterval(nextSlide, 5000);
  }, 10000);
}

// Add pause functionality when hovering over slideshow
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

heroSection.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 5000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
    pauseSlideshow();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
    pauseSlideshow();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Mobile hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Prevent menu from closing when clicking inside it
navMenu.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Handle window resize - close mobile menu if opened when switching to desktop view
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
      }
    }, 20);
  });
}

// Intersection Observer for counter animation
const counterObserverOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, counterObserverOptions);

// Observe the stats section
const statsRow = document.querySelector('.stats-row');
if (statsRow) {
  observer.observe(statsRow);
}

// Preload images for smoother transitions
function preloadImages() {
  const imageUrls = [
    './images/ng.jpeg',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80',
    './images/Tract.jpeg',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1566040595206-146d7667d456?auto=format&fit=crop&w=1920&q=80'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
  showSlide(0); // Ensure first slide is active
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

heroSection.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

heroSection.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      prevSlide(); // Swipe right - previous slide
    } else {
      nextSlide(); // Swipe left - next slide
    }
    pauseSlideshow();
  }
}

// Contact form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Add a simple form submission animation
  const submitBtn = document.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  
  submitBtn.textContent = 'Sending...';
  submitBtn.style.background = 'linear-gradient(135deg, #4a7c59 0%, #2d5016 100%)';
  
  // Simulate form submission
  setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)';
      
      setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)';
          this.reset();
      }, 2000);
  }, 1500);
});

// Add hover effects to contact items
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
      this.style.transition = 'transform 0.3s ease';
  });
  
  item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add hover effects to contact items
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
      this.style.transition = 'transform 0.3s ease';
  });
     
  item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click animation to social icons - FIXED VERSION
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('click', function(e) {
      // Only prevent default for placeholder links (#)
      if (this.getAttribute('href') === '#') {
          e.preventDefault();
      }
      
      // Add click animation
      this.style.transform = 'scale(0.95) translateY(-3px)';
      setTimeout(() => {
          this.style.transform = 'translateY(-3px) scale(1.1)';
          
          // Reset animation after a short delay
          setTimeout(() => {
              this.style.transform = '';
          }, 200);
      }, 150);
  });
});

// Add smooth scrolling animation when page loads
window.addEventListener('load', function() {
  const contactContainer = document.querySelector('.contact-container');
  if (contactContainer) {
      contactContainer.style.opacity = '0';
      contactContainer.style.transform = 'translateY(30px)';
         
      setTimeout(() => {
          contactContainer.style.transition = 'all 0.8s ease';
          contactContainer.style.opacity = '1';
          contactContainer.style.transform = 'translateY(0)';
      }, 100);
  }
});

// Add floating animation to contact form
const contactForm = document.querySelector('.contact-form');
const contactInfo = document.querySelector('.contact-info');

// Intersection Observer for scroll animations
const scrollObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
      }
  });
}, scrollObserverOptions);

// Observe elements for animation
[contactForm, contactInfo].forEach(element => {
  if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(50px)';
      element.style.transition = 'all 0.6s ease';
      scrollObserver.observe(element);
  }
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
      ripple.remove();
  }

  button.appendChild(circle);
}

// Apply ripple effect to submit button
document.querySelector('.submit-btn').addEventListener('click', createRipple);

// Add typing effect for form placeholders (optional enhancement)
function typeEffect(element, text, speed = 100) {
  let i = 0;
  element.placeholder = '';
  
  function type() {
      if (i < text.length) {
          element.placeholder += text.charAt(i);
          i++;
          setTimeout(type, speed);
      }
  }
  type();
}

// Enhanced form validation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('blur', function() {
      if (this.value.trim() === '' && this.hasAttribute('required')) {
          this.style.borderColor = '#e74c3c';
          this.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.3)';
      } else {
          this.style.borderColor = '#4a7c59';
          this.style.boxShadow = '0 0 10px rgba(74, 124, 89, 0.2)';
      }
  });
  
  input.addEventListener('focus', function() {
      this.style.borderColor = '#4a7c59';
      this.style.boxShadow = '0 0 10px rgba(74, 124, 89, 0.2)';
  });
});

// Add pulse animation to contact icons
setInterval(() => {
  document.querySelectorAll('.contact-icon').forEach((icon, index) => {
      setTimeout(() => {
          icon.style.transform = 'scale(1.1)';
          setTimeout(() => {
              icon.style.transform = 'scale(1)';
          }, 200);
      }, index * 100);
  });
}, 5000);

// Map interaction enhancements
const mapSection = document.querySelector('.map-section');
if (mapSection) {
  mapSection.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'transform 0.3s ease';
  });
  
  mapSection.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
  });
}

// Testimonial Slider Class
class TestimonialSlider {
  constructor() {
    this.track = document.getElementById('testimonialTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.dotsContainer = document.getElementById('sliderDots');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.currentSlide = 0;
    this.totalSlides = this.cards.length;
    this.isAnimating = false;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    if (this.totalSlides === 0) return;
    
    this.createDots();
    this.updateSlider();
    this.bindEvents();
    this.startAutoPlay();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateSlider() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;

    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });

    // Update navigation buttons
    if (this.prevBtn && this.nextBtn) {
      this.prevBtn.disabled = this.currentSlide === 0;
      this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    // Reset animation flag
    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlider();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlider();
    }
  }

  goToSlide(index) {
    if (index !== this.currentSlide && !this.isAnimating && index >= 0 && index < this.totalSlides) {
      this.currentSlide = index;
      this.updateSlider();
    }
  }

  bindEvents() {
    // Navigation button events
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoPlay();
      }
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = Math.abs(startY - endY);
      
      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
        this.resetAutoPlay();
      }
    }, { passive: true });

    // Pause autoplay on hover
    const testimonialSection = document.querySelector('.testimonial-section');
    if (testimonialSection) {
      testimonialSection.addEventListener('mouseenter', () => this.pauseAutoPlay());
      testimonialSection.addEventListener('mouseleave', () => this.resumeAutoPlay());
    }

    // Pause autoplay when user interacts with dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => this.resetAutoPlay());
    });
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      if (this.currentSlide < this.totalSlides - 1) {
        this.nextSlide();
      } else {
        this.currentSlide = 0;
        this.updateSlider();
      }
    }, 5000); // 5 seconds interval
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resumeAutoPlay() {
    if (!this.autoPlayInterval) {
      this.startAutoPlay();
    }
  }

  resetAutoPlay() {
    this.pauseAutoPlay();
    // Restart autoplay after 3 seconds of no interaction
    setTimeout(() => {
      if (!this.autoPlayInterval) {
        this.startAutoPlay();
      }
    }, 3000);
  }

  destroy() {
    this.pauseAutoPlay();
    // Remove event listeners if needed
  }
}

// Initialize testimonial slider
let testimonialSlider = null;

function initTestimonialSlider() {
  const testimonialSection = document.querySelector('.testimonial-section');
  if (testimonialSection && !testimonialSlider) {
    testimonialSlider = new TestimonialSlider();
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTestimonialSlider);
} else {
  initTestimonialSlider();
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0.2s';
        entry.target.style.animation = 'slideInRight 0.8s ease-out forwards';
      }
    });
  }, observerOptions);

  // Observe testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
    observer.observe(card);
  });

  // Observe main testimonial card
  const mainCard = document.querySelector('.testimonial-main-card');
  if (mainCard) {
    observer.observe(mainCard);
  }
}

// Initialize scroll animations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// Handle window resize
window.addEventListener('resize', () => {
  if (testimonialSlider) {
    testimonialSlider.updateSlider();
  }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TestimonialSlider };
}


// Footer Section JavaScript

// Newsletter Form Handling
function initNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const submitButton = this.querySelector('button');
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    // Simulate API call (replace with actual subscription logic)
    setTimeout(() => {
      // Reset form
      emailInput.value = '';
      submitButton.textContent = 'Subscribed!';
      submitButton.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      
      showNotification('Thank you for subscribing to our newsletter!', 'success');
      
      // Reset button after 2 seconds
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.background = '';
      }, 2000);
    }, 1500);
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.footer-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `footer-notification ${type}`;
  notification.textContent = message;
  
  // Notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  
  // Set background color based on type
  switch(type) {
    case 'success':
      notification.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      break;
    case 'error':
      notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      break;
    default:
      notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
  }
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Smooth scrolling for footer links
function initSmoothScrolling() {
  const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
  
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Social media links handling
function initSocialLinks() {
  const socialIcons = document.querySelectorAll('.social-icon');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      this.style.transform = 'translateY(-3px) scale(0.95)';
      
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      // Here you would typically redirect to actual social media pages
      // For demo purposes, we'll show a notification
      const platform = this.getAttribute('aria-label');
      showNotification(`Opening ${platform} page...`, 'info');
    });
  });
}

// Contact item interactions
function initContactInteractions() {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    const icon = item.querySelector('i');
    const text = item.querySelector('span').textContent;
    
    item.addEventListener('click', function() {
      // Copy to clipboard functionality
      if (icon.classList.contains('fa-phone') || icon.classList.contains('fa-envelope')) {
        copyToClipboard(text);
        showNotification(`${text} copied to clipboard!`, 'success');
      }
      
      // WhatsApp link
      if (icon.classList.contains('fa-whatsapp')) {
        const phoneNumber = text.replace(/\s+/g, '');
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
      }
    });
    
    // Add hover cursor for interactive items
    if (icon.classList.contains('fa-phone') || 
        icon.classList.contains('fa-envelope') || 
        icon.classList.contains('fa-whatsapp')) {
      item.style.cursor = 'pointer';
    }
  });
}

// Copy to clipboard utility
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
}

// Animate elements on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe footer columns
  const footerColumns = document.querySelectorAll('.footer-column');
  footerColumns.forEach((column, index) => {
    column.style.opacity = '0';
    column.style.transform = 'translateY(30px)';
    column.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(column);
  });

  // Observe newsletter section
  const newsletterSection = document.querySelector('.newsletter-section');
  if (newsletterSection) {
    newsletterSection.style.opacity = '0';
    newsletterSection.style.transform = 'translateY(30px)';
    newsletterSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(newsletterSection);
  }
}

// Back to top functionality
function initBackToTop() {
  // Create back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '↑';
  backToTopButton.className = 'back-to-top';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  
  // Button styles
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  `;
  
  document.body.appendChild(backToTopButton);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.visibility = 'visible';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top on click
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect
  backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0) scale(1)';
  });
}

// Initialize all footer functionality
function initFooter() {
  initNewsletterForm();
  initSmoothScrolling();
  initSocialLinks();
  initContactInteractions();
  initScrollAnimations();
  initBackToTop();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooter);
} else {
  initFooter();
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initFooter };
}