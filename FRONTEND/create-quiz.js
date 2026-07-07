let currentStep = 1;
let questionCount = 0;
let quizData = {};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateProgress();
});

function setupEventListeners() {
  // Character counters
  const titleInput = document.getElementById('quizTitle');
  const descInput = document.getElementById('quizDescription');
  
  titleInput.addEventListener('input', () => updateCharCounter('titleCounter', titleInput.value.length, 100));
  descInput.addEventListener('input', () => updateCharCounter('descCounter', descInput.value.length, 250));
  
  // Form validation
  titleInput.addEventListener('input', validateQuizSetup);
  
  // Auto-save functionality
  setInterval(autoSave, 30000); // Auto-save every 30 seconds
}

function updateCharCounter(counterId, current, max) {
  const counter = document.getElementById(counterId);
  counter.textContent = current;
  
  if (current > max * 0.9) {
    counter.style.color = '#ff4757';
  } else if (current > max * 0.7) {
    counter.style.color = '#ffa502';
  } else {
    counter.style.color = '#999';
  }
}

function validateQuizSetup() {
  const title = document.getElementById('quizTitle').value.trim();
  const nextBtn = document.querySelector('.btn-next');
  
  if (title.length >= 3) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
}

function nextStep() {
  if (currentStep === 1) {
    // Validate quiz setup
    if (!validateStep1()) return;
    
    // Save quiz info
    saveQuizInfo();
    
    // Move to questions step
    document.getElementById('quizSetup').style.display = 'none';
    document.getElementById('questionsSection').style.display = 'block';
    currentStep = 2;
    
  } else if (currentStep === 2) {
    // Validate questions
    if (!validateStep2()) return;
    
    // Move to review step
    document.getElementById('questionsSection').style.display = 'none';
    document.getElementById('reviewSection').style.display = 'block';
    generateReview();
    currentStep = 3;
  }
  
  updateProgress();
}

function prevStep() {
  if (currentStep === 2) {
    document.getElementById('questionsSection').style.display = 'none';
    document.getElementById('quizSetup').style.display = 'block';
    currentStep = 1;
    
  } else if (currentStep === 3) {
    document.getElementById('reviewSection').st