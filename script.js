document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
      menuToggle.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          this.classList.toggle('active');
      });
  }
  
  // Countdown timer for promotion
  const countdownElement = document.getElementById('countdown');
  if (countdownElement) {
      // Set a specific end date for the promotion (e.g., April 1, 2025)
      const endDate = new Date('April 1, 2025 23:59:59');
      
      function updateCountdown() {
          const now = new Date();
          const distance = endDate - now;
          
          // Calculate days, hours, minutes and seconds
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          // Update HTML elements
          document.getElementById('days').innerText = String(days).padStart(2, '0');
          document.getElementById('hours').innerText = String(hours).padStart(2, '0');
          document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
          document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
          
          // If the countdown is over, reset it to show zeros
          if (distance < 0) {
              document.getElementById('days').innerText = '00';
              document.getElementById('hours').innerText = '00';
              document.getElementById('minutes').innerText = '00';
              document.getElementById('seconds').innerText = '00';
          }
      }
      
      // Update countdown every second
      updateCountdown();
      setInterval(updateCountdown, 1000);
  }
  
  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  let currentTestimonial = 0;
  
  if (testimonials.length > 0 && prevButton && nextButton) {
      function showTestimonial(index) {
          testimonials.forEach(testimonial => testimonial.classList.remove('active'));
          testimonials[index].classList.add('active');
      }
      
      function nextTestimonial() {
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
          showTestimonial(currentTestimonial);
      }
      
      function prevTestimonial() {
          currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
          showTestimonial(currentTestimonial);
      }
      
      nextButton.addEventListener('click', nextTestimonial);
      prevButton.addEventListener('click', prevTestimonial);
      
      // Auto slide every 5 seconds
      setInterval(nextTestimonial, 5000);
  }
  
  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get the email input value
          const emailInput = this.querySelector('input[type="email"]');
          const email = emailInput.value;
          
          // Here you would typically send this to your server
          // For demo purposes, we'll just show an alert
          alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
          
          // Clear the input
          emailInput.value = '';
      });
  }
  
  // Promotional popup
  const popup = document.getElementById('popup');
  const closePopup = document.querySelector('.close-popup');
  
  if (popup && closePopup) {
      // Show popup after 5 seconds on the page
      setTimeout(function() {
          popup.classList.add('show');
      }, 5000);
      
      // Close popup when clicking the X
      closePopup.addEventListener('click', function() {
          popup.classList.remove('show');
      });
      
      // Close popup when clicking outside the content
      popup.addEventListener('click', function(e) {
          if (e.target === popup) {
              popup.classList.remove('show');
          }
      });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          if (this.getAttribute('href') !== '#') {
              e.preventDefault();
              
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                  target.scrollIntoView({
                      behavior: 'smooth'
                  });
              }
          }
      });
  });
  
  // Add to cart animation for product buttons
  document.querySelectorAll('.secondary-cta').forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Create an animated notification
          const notification = document.createElement('div');
          notification.className = 'cart-notification';
          notification.innerText = 'Item added to cart!';
          document.body.appendChild(notification);
          
          // Add animation class
          setTimeout(() => {
              notification.classList.add('show');
          }, 10);
          
          // Remove after animation completes
          setTimeout(() => {
              notification.classList.remove('show');
              setTimeout(() => {
                  document.body.removeChild(notification);
              }, 300);
          }, 2000);
          
          // Update cart count (simulated)
          const cartCount = localStorage.getItem('cartCount') || '0';
          localStorage.setItem('cartCount', parseInt(cartCount) + 1);
      });
  });
  
  // Initialize cart count from localStorage (if any)
  function initCartCount() {
      const cartCount = localStorage.getItem('cartCount');
      if (cartCount && parseInt(cartCount) > 0) {
          // You could update a cart icon or badge here
          console.log(`Cart has ${cartCount} items`);
      }
  }
  
  initCartCount();
  
  // Track CTA click events
  const trackCTAClick = function(ctaType) {
      // This would typically send data to your analytics platform
      console.log(`CTA clicked: ${ctaType}`);
      
      // For store links, redirect to actual Shopify store
      if (ctaType === 'store') {
          window.location.href = 'https://novaiwear.myshopify.com';
      }
  };
  
  // Add tracking to primary CTAs
  document.querySelectorAll('.primary-cta').forEach(cta => {
      cta.addEventListener('click', function(e) {
          // Prevent default for processing
          e.preventDefault();
          trackCTAClick('primary-' + this.innerText.trim().toLowerCase().replace(/\s+/g, '-'));
          
          // Redirect to the Shopify store
          window.location.href = 'https://novaiwear.myshopify.com';
      });
  });
  
  // Add tracking to store links
  document.querySelectorAll('.store-link, .category-link').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          trackCTAClick('store');
          
          // Redirect directly to the store without alert
          window.location.href = 'https://novaiwear.myshopify.com';
      });
  });
  
  // Exit intent detection (show popup when user moves mouse to top of page)
  document.addEventListener('mouseleave', function(e) {
      if (e.clientY < 5 && !sessionStorage.getItem('exitShown')) {
          // Show exit intent popup
          popup.classList.add('show');
          
          // Only show once per session
          sessionStorage.setItem('exitShown', 'true');
      }
  });
  
  // Add additional CSS for cart notification
  const style = document.createElement('style');
  style.textContent = `
      .cart-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.3s ease;
          z-index: 1000;
      }
      
      .cart-notification.show {
          opacity: 1;
          transform: translateY(0);
      }
      
      .nav-links.active {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 70px;
          right: 0;
          background-color: rgba(0, 0, 0, 0.9);
          padding: 20px;
          border-radius: 5px;
      }
      
      .nav-links.active a {
          margin: 10px 0;
      }
  `;
  document.head.appendChild(style);
});