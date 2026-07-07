// Password toggle function
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = passwordInput.nextElementSibling;
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleIcon.textContent = '👁️';
  }
}

// Register function
function register() {
  const fullName = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  // Basic validation
  if (!fullName || !email || !password) {
    alert('Please fill in all fields');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  // Check if user already exists
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const userExists = existingUsers.some(user => user.email === email);
  
  if (userExists) {
    alert('User with this email already exists!');
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now(), // Simple ID generation
    fullName: fullName,
    email: email,
    password: password, // In real app, this should be hashed
    registeredAt: new Date().toISOString()
  };

  // Add to users array
  existingUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // Set as logged in user
  const loggedInUser = {
    id: newUser.id,
    username: fullName,
    email: email
  };
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

  alert('Registration successful! Welcome to Quiz Maker!');
  
  // Redirect to main page
  window.location.href = 'Quiz.html';
}

// Login function
function login() {
  const userInput = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value.trim();

  // Basic validation
  if (!userInput || !password) {
    alert('Please fill in all fields');
    return;
  }

  // Get all users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Find user by email or username
  const user = users.find(u => 
    u.email.toLowerCase() === userInput.toLowerCase() || 
    u.fullName.toLowerCase() === userInput.toLowerCase()
  );

  if (!user) {
    alert('User not found! Please check your credentials or register first.');
    return;
  }

  if (user.password !== password) {
    alert('Incorrect password! Please try again.');
    return;
  }

  // Set as logged in user
  const loggedInUser = {
    id: user.id,
    username: user.fullName,
    email: user.email
  };
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

  alert(`Welcome back, ${user.fullName}!`);
  
  // Redirect to main page
  window.location.href = 'Quiz.html';
}

// Forgot password function
function forgotPassword() {
  const email = prompt('Please enter your email address:');
  
  if (!email) {
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user) {
    // In a real application, you would send a password reset email
    alert(`Password reset instructions have been sent to ${email}.\n\nFor demo purposes, your password is: ${user.password}`);
  } else {
    alert('No account found with this email address.');
  }
}

// Social login functions (demo purposes)
document.addEventListener('DOMContentLoaded', () => {
  // Google login
  const googleBtn = document.querySelector('.google');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      alert('Google login integration coming soon!');
    });
  }

  // Facebook login
  const facebookBtn = document.querySelector('.facebook');
  if (facebookBtn) {
    facebookBtn.addEventListener('click', () => {
      alert('Facebook login integration coming soon!');
    });
  }

  // Apple login
  const appleBtn = document.querySelector('.apple');
  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      alert('Apple login integration coming soon!');
    });
  }
});