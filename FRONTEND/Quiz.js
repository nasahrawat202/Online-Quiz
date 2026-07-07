// Function to update UI based on login status
function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const welcomeUser = document.getElementById('welcomeUser');

  if (user) {
    // User is logged in
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
    if (welcomeUser) welcomeUser.textContent = `Welcome, ${user.username}!`;
  } else {
    // User is not logged in
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (registerBtn) registerBtn.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (welcomeUser) welcomeUser.textContent = '';
  }
}

// Logout function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('loggedInUser');
    alert('Successfully logged out!');
    updateAuthUI();
    // Optionally redirect to home page
    window.location.reload();
  }
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + (counter.parentElement.querySelector('.stat-label').textContent.includes('Rate') ? '%' : '');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + (counter.parentElement.querySelector('.stat-label').textContent.includes('Rate') ? '%' : '');
      }
    }, 40);
  });
}

// Newsletter subscription functionality
function setupNewsletter() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (!newsletterForm) return;
  
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const subscribeBtn = newsletterForm.querySelector('button');

  if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      
      if (!email) {
        alert('Please enter your email address');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Store subscription
      const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
      if (subscribers.includes(email)) {
        alert('You are already subscribed!');
        return;
      }
      
      subscribers.push(email);
      localStorage.setItem('subscribers', JSON.stringify(subscribers));
      
      alert('Thank you for subscribing! You will receive the latest updates.');
      emailInput.value = '';
    });
  }
}

// Quiz card interactions
function setupQuizCards() {
  const quizCards = document.querySelectorAll('.quiz-card');
  
  quizCards.forEach(card => {
    card.addEventListener('click', () => {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      
      if (!user) {
        alert('Please login first to take a quiz!');
        window.location.href = 'login.html';
        return;
      }
      
      const quizTitle = card.querySelector('h3').textContent;
      alert(`Starting "${quizTitle}"...\n\nThis will redirect to the quiz page in the full version.`);
      // In real implementation, redirect to quiz page:
      // window.location.href = `take-quiz.html?quiz=${encodeURIComponent(quizTitle)}`;
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// CTA buttons functionality
function setupCTAButtons() {
  const createQuizBtn = document.querySelector('a[href="create-quiz.html"]');
  const takeQuizBtn = document.querySelector('a[href="take-quiz.html"]');
  
  if (createQuizBtn) {
    createQuizBtn.addEventListener('click', (e) => {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
        e.preventDefault();
        alert('Please login first to create a quiz!');
        window.location.href = 'login.html';
      }
    });
  }
  
  if (takeQuizBtn) {
    takeQuizBtn.addEventListener('click', (e) => {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
        e.preventDefault();
        alert('Please login first to take a quiz!');
        window.location.href = 'login.html';
      }
    });
  }
}

// Smooth scroll for internal links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe feature cards and quiz cards for animation
  document.querySelectorAll('.feature-card, .quiz-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Enhanced floating icons animation
function setupFloatingIcons() {
  const floatingIcons = document.querySelectorAll('.floating-icons i');
  
  floatingIcons.forEach((icon, index) => {
    // Add random movement
    setInterval(() => {
      const randomX = Math.random() * 10 - 5;
      const randomY = Math.random() * 10 - 5;
      icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 2000 + index * 500);
  });
}

// Social media links functionality
function setupSocialLinks() {
  const socialLinks = document.querySelectorAll('.social-links a');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = link.querySelector('i').className;
      let platformName = '';
      
      if (platform.includes('facebook')) platformName = 'Facebook';
      else if (platform.includes('twitter')) platformName = 'Twitter';
      else if (platform.includes('instagram')) platformName = 'Instagram';
      else if (platform.includes('linkedin')) platformName = 'LinkedIn';
      
      alert(`Redirecting to ${platformName}...\nIn the full version, this would open ${platformName} page.`);
    });
  });
}

// Enhanced navbar scroll effect
function setupNavbarScroll() {
  const header = document.querySelector('.top-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.background = 'linear-gradient(135deg, rgba(17, 17, 17, 0.95), rgba(26, 26, 26, 0.95))';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'linear-gradient(135deg, #111, #1a1a1a)';
      header.style.backdropFilter = 'none';
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Local storage management utilities
const StorageManager = {
  // Save user data
  saveUser: (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  },
  
  // Get user data
  getUser: () => {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  },
  
  // Remove user data
  removeUser: () => {
    localStorage.removeItem('loggedInUser');
  },
  
  // Check if user is logged in
  isLoggedIn: () => {
    return localStorage.getItem('loggedInUser') !== null;
  }
};

// Enhanced error handling
function showMessage(message, type = 'info') {
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;
  
  // Style the message
  Object.assign(messageDiv.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    zIndex: '9999',
    opacity: '0',
    transform: 'translateX(100%)',
    transition: 'all 0.3s ease'
  });
  
  // Set background color based on type
  switch(type) {
    case 'success':
      messageDiv.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
      break;
    case 'error':
      messageDiv.style.background = 'linear-gradient(45deg, #f44336, #da190b)';
      break;
    case 'warning':
      messageDiv.style.background = 'linear-gradient(45deg, #ff9800, #f57c00)';
      break;
    default:
      messageDiv.style.background = 'linear-gradient(45deg, #00f7ff, #0ff)';
  }
  
  document.body.appendChild(messageDiv);
  
  // Animate in
  setTimeout(() => {
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 300);
  }, 3000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Quiz Maker - Home Page Loaded');
  
  try {
    // Core functionality
    updateAuthUI();
    animateCounters();
    setupNewsletter();
    setupQuizCards();
    setupCTAButtons();
    setupSmoothScroll();
    setupScrollAnimations();
    setupFloatingIcons();
    setupSocialLinks();
    setupNavbarScroll();
    
    // Add logout event listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logout);
    }
    
    // Welcome message for returning users
    const user = StorageManager.getUser();
    if (user) {
      setTimeout(() => {
        showMessage(`Welcome back, ${user.username}!`, 'success');
      }, 1000);
    }
    
    console.log('All functions initialized successfully');
    
  } catch (error) {
    console.error('Error initializing page:', error);
    showMessage('Some features may not work properly. Please refresh the page.', 'error');
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Page became visible, update auth UI
    updateAuthUI();
  }
});

// Handle storage changes (for multi-tab support)
window.addEventListener('storage', (e) => {
  if (e.key === 'loggedInUser') {
    updateAuthUI();
  }
});

// Global error handler
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  showMessage('An error occurred. Please refresh the page if issues persist.', 'error');
});

// Export functions for external use (if needed)
window.QuizMaker = {
  updateAuthUI,
  logout,
  StorageManager,
  showMessage
};