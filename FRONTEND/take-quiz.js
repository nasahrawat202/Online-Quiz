// Quiz Data - Sample questions for each category
const quizData = {
  math: {
    name: "Mathematics",
    time: 300, // 5 minutes in seconds
    questions: [
      {
        question: "What is 15 + 23?",
        options: ["35", "38", "40", "42"],
        correct: 1,
        hint: "Try adding the numbers step by step: 15 + 20 = 35, then add 3 more."
      },
      {
        question: "What is 12 × 7?",
        options: ["72", "84", "96", "108"],
        correct: 1,
        hint: "Think of it as 12 × 7 = (10 × 7) + (2 × 7)"
      },
      {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correct: 2,
        hint: "What number multiplied by itself equals 64?"
      },
      {
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        correct: 1,
        hint: "25% is the same as 1/4, so divide 80 by 4."
      },
      {
        question: "What is 144 ÷ 12?",
        options: ["10", "11", "12", "13"],
        correct: 2,
        hint: "How many times does 12 go into 144?"
      }
    ]
  },
  science: {
    name: "Science",
    time: 300,
    questions: [
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correct: 0,
        hint: "It contains 2 hydrogen atoms and 1 oxygen atom."
      },
      {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correct: 1,
        hint: "It's the smallest planet in our solar system."
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 2,
        hint: "This gas is what humans exhale."
      },
      {
        question: "How many bones are in an adult human body?",
        options: ["196", "206", "216", "226"],
        correct: 1,
        hint: "It's slightly more than 200."
      },
      {
        question: "What is the hardest natural substance?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        correct: 2,
        hint: "It's often used in jewelry and cutting tools."
      }
    ]
  },
  english: {
    name: "English",
    time: 240,
    questions: [
      {
        question: "Which of the following is a noun?",
        options: ["Running", "Beautiful", "House", "Quickly"],
        correct: 2,
        hint: "A noun is a person, place, or thing."
      },
      {
        question: "What is the past tense of 'go'?",
        options: ["Goed", "Gone", "Went", "Going"],
        correct: 2,
        hint: "This is an irregular verb."
      },
      {
        question: "Which sentence is grammatically correct?",
        options: ["She don't like coffee", "She doesn't like coffee", "She not like coffee", "She no like coffee"],
        correct: 1,
        hint: "Use 'doesn't' with singular subjects."
      },
      {
        question: "What is a synonym for 'happy'?",
        options: ["Sad", "Angry", "Joyful", "Tired"],
        correct: 2,
        hint: "A synonym means the same thing."
      },
      {
        question: "Which is the correct plural of 'child'?",
        options: ["Childs", "Children", "Childes", "Child's"],
        correct: 1,
        hint: "This is an irregular plural form."
      }
    ]
  },
  gk: {
    name: "General Knowledge",
    time: 360,
    questions: [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2,
        hint: "It's known as the City of Light."
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correct: 1,
        hint: "He was also an inventor and scientist from Italy."
      },
      {
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3,
        hint: "It covers more than 30% of Earth's surface."
      },
      {
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1,
        hint: "It ended in the mid-1940s."
      },
      {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: 1,
        hint: "It's located within Rome, Italy."
      }
    ]
  },
  coding: {
    name: "Programming",
    time: 420,
    questions: [
      {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"],
        correct: 0,
        hint: "It's used to create web pages."
      },
      {
        question: "Which of these is a JavaScript framework?",
        options: ["Django", "Laravel", "React", "Flask"],
        correct: 2,
        hint: "It's developed by Facebook for building user interfaces."
      },
      {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["variable x = 5;", "var x = 5;", "v x = 5;", "declare x = 5;"],
        correct: 1,
        hint: "Use the 'var', 'let', or 'const' keyword."
      },
      {
        question: "In CSS, what property is used to change the text color?",
        options: ["font-color", "text-color", "color", "foreground-color"],
        correct: 2,
        hint: "It's a simple, single word property."
      },
      {
        question: "What does SQL stand for?",
        options: ["Structured Question Language", "Simple Query Language", "Structured Query Language", "Standard Question Language"],
        correct: 2,
        hint: "It's used for managing databases."
      }
    ]
  }
};

// Quiz State
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timer = null;
let timeRemaining = 0;
let startTime = null;
let isPaused = false;
let hintUsed = [];

// DOM Elements
const elements = {
  categorySection: document.getElementById('categorySection'),
  quizSection: document.getElementById('quizSection'),
  resultsSection: document.getElementById('resultsSection'),
  reviewSection: document.getElementById('reviewSection'),
  quizProgress: document.getElementById('quizProgress'),
  timerContainer: document.getElementById('timerContainer'),
  currentQuestion: document.getElementById('currentQuestion'),
  totalQuestions: document.getElementById('totalQuestions'),
  progressFill: document.getElementById('progressFill'),
  timer: document.getElementById('timer'),
  categoryBadge: document.getElementById('categoryBadge'),
  questionTitle: document.getElementById('questionTitle'),
  questionContainer: document.getElementById('questionContainer'),
  nextBtn: document.getElementById('nextBtn'),
  skipBtn: document.getElementById('skipBtn'),
  hintBtn: document.getElementById('hintBtn'),
  pauseModal: document.getElementById('pauseModal')
};

// Initialize the quiz application
document.addEventListener('DOMContentLoaded', function() {
  addAnimations();
  loadCustomQuizzesData();
});

// Start a quiz for a specific category
function startQuiz(category) {
  if (!quizData[category]) {
    alert('Quiz category not available yet!');
    return;
  }

  currentQuiz = { ...quizData[category] };
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  hintUsed = [];
  timeRemaining = currentQuiz.time;
  startTime = new Date();
  isPaused = false;

  // Reset UI
  elements.categorySection.style.display = 'none';
  elements.resultsSection.style.display = 'none';
  elements.reviewSection.style.display = 'none';
  elements.quizSection.style.display = 'block';
  elements.quizProgress.style.display = 'flex';
  elements.timerContainer.style.display = 'flex';

  // Initialize quiz
  updateQuizUI();
  loadQuestion();
  startTimer();
  
  // Animate quiz entry
  elements.quizSection.style.opacity = '0';
  elements.quizSection.style.transform = 'translateY(20px)';
  setTimeout(() => {
    elements.quizSection.style.transition = 'all 0.5s ease';
    elements.quizSection.style.opacity = '1';
    elements.quizSection.style.transform = 'translateY(0)';
  }, 100);
}

// Update quiz UI elements
function updateQuizUI() {
  elements.currentQuestion.textContent = currentQuestionIndex + 1;
  elements.totalQuestions.textContent = currentQuiz.questions.length;
  elements.categoryBadge.textContent = currentQuiz.name;
  
  const progress = ((currentQuestionIndex) / currentQuiz.questions.length) * 100;
  elements.progressFill.style.width = progress + '%';
}

// Load current question
function loadQuestion() {
  if (currentQuestionIndex >= currentQuiz.questions.length) {
    finishQuiz();
    return;
  }

  const question = currentQuiz.questions[currentQuestionIndex];
  elements.questionTitle.textContent = `Question ${currentQuestionIndex + 1}`;
  
  // Create question HTML
  const questionHTML = `
    <div class="question-text">
      <h3>${question.question}</h3>
    </div>
    <div class="options-container">
      ${question.options.map((option, index) => `
        <div class="option-item" onclick="selectOption(${index})">
          <div class="option-radio">
            <div class="radio-circle" id="radio-${index}"></div>
          </div>
          <div class="option-text">${option}</div>
        </div>
      `).join('')}
    </div>
  `;
  
  elements.questionContainer.innerHTML = questionHTML;
  elements.nextBtn.disabled = true;
  elements.hintBtn.style.display = hintUsed[currentQuestionIndex] ? 'none' : 'inline-flex';
  
  addOptionStyles();
}

// Add CSS styles for options
function addOptionStyles() {
  if (!document.getElementById('quiz-options-style')) {
    const style = document.createElement('style');
    style.id = 'quiz-options-style';
    style.textContent = `
      .question-text { margin-bottom: 2rem; }
      .question-text h3 { font-size: 1.4rem; color: #fff; line-height: 1.5; }
      .options-container { display: flex; flex-direction: column; gap: 1rem; }
      .option-item { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; background: rgba(255, 255, 255, 0.05); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 12px; cursor: pointer; transition: all 0.3s ease; }
      .option-item:hover { background: rgba(0, 247, 255, 0.1); border-color: rgba(0, 247, 255, 0.3); transform: translateX(5px); }
      .option-item.selected { background: rgba(0, 247, 255, 0.2); border-color: #00f7ff; }
      .option-radio { width: 20px; height: 20px; position: relative; }
      .radio-circle { width: 100%; height: 100%; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 50%; transition: all 0.3s ease; }
      .option-item.selected .radio-circle { border-color: #00f7ff; background: #00f7ff; }
      .option-item.selected .radio-circle::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background: #000; border-radius: 50%; }
      .option-text { font-size: 1.1rem; color: #fff; flex: 1; }
    `;
    document.head.appendChild(style);
  }
}

// Select an option
function selectOption(optionIndex) {
  document.querySelectorAll('.option-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  const selectedOption = document.querySelectorAll('.option-item')[optionIndex];
  selectedOption.classList.add('selected');
  
  elements.nextBtn.disabled = false;
  userAnswers[currentQuestionIndex] = optionIndex;
}

// Show hint for current question
function showHint() {
  const question = currentQuiz.questions[currentQuestionIndex];
  if (question.hint) {
    alert(`💡 Hint: ${question.hint}`);
    hintUsed[currentQuestionIndex] = true;
    elements.hintBtn.style.display = 'none';
  }
}

// Skip current question
function skipQuestion() {
  userAnswers[currentQuestionIndex] = -1;
  nextQuestion();
}

// Move to next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= currentQuiz.questions.length) {
    finishQuiz();
  } else {
    updateQuizUI();
    loadQuestion();
    
    elements.questionContainer.style.opacity = '0';
    elements.questionContainer.style.transform = 'translateX(20px)';
    setTimeout(() => {
      elements.questionContainer.style.transition = 'all 0.3s ease';
      elements.questionContainer.style.opacity = '1';
      elements.questionContainer.style.transform = 'translateX(0)';
    }, 100);
  }
}

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    if (!isPaused) {
      timeRemaining--;
      updateTimerDisplay();
      
      if (timeRemaining <= 30) {
        elements.timerContainer.classList.add('warning');
      }
      
      if (timeRemaining <= 0) {
        finishQuiz();
      }
    }
  }, 1000);
}

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Pause the quiz
function pauseQuiz() {
  isPaused = true;
  elements.pauseModal.style.display = 'flex';
}

// Resume the quiz
function resumeQuiz() {
  isPaused = false;
  elements.pauseModal.style.display = 'none';
}

// Quit the quiz
function quitQuiz() {
  if (confirm('Are you sure you want to quit the quiz? All progress will be lost.')) {
    clearInterval(timer);
    backToCategories();
  }
}

// Finish the quiz and show results
function finishQuiz() {
  clearInterval(timer);
  
  score = 0;
  for (let i = 0; i < currentQuiz.questions.length; i++) {
    if (userAnswers[i] === currentQuiz.questions[i].correct) {
      score++;
    }
  }
  
  const endTime = new Date();
  const timeTaken = Math.floor((endTime - startTime) / 1000);
  
  showResults(timeTaken);
}

// Show quiz results
function showResults(timeTaken) {
  elements.quizSection.style.display = 'none';
  elements.quizProgress.style.display = 'none';
  elements.timerContainer.style.display = 'none';
  elements.resultsSection.style.display = 'block';
  
  const totalQuestions = currentQuiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const wrongCount = totalQuestions - score;
  
  document.getElementById('finalScore').textContent = score;
  document.getElementById('totalScore').textContent = totalQuestions;
  document.getElementById('scorePercentage').textContent = percentage + '%';
  document.getElementById('correctCount').textContent = score;
  document.getElementById('wrongCount').textContent = wrongCount;
  document.getElementById('timeTaken').textContent = formatTime(timeTaken);
  document.getElementById('accuracy').textContent = percentage + '%';
  
  const performanceMessage = getPerformanceMessage(percentage);
  document.getElementById('performanceMessage').innerHTML = performanceMessage;
  
  animateScore();
}

// Get performance message based on score
function getPerformanceMessage(percentage) {
  if (percentage >= 90) {
    return `<div class="performance excellent"><i class="fas fa-star"></i><h3>Excellent!</h3><p>Outstanding performance! You're a quiz master!</p></div>`;
  } else if (percentage >= 70) {
    return `<div class="performance good"><i class="fas fa-thumbs-up"></i><h3>Great Job!</h3><p>Well done! You have a good grasp of the subject.</p></div>`;
  } else if (percentage >= 50) {
    return `<div class="performance average"><i class="fas fa-hand-peace"></i><h3>Good Effort!</h3><p>Not bad! With a little more practice, you'll do even better.</p></div>`;
  } else {
    return `<div class="performance needs-improvement"><i class="fas fa-book"></i><h3>Keep Learning!</h3><p>Don't worry! Every quiz is a learning opportunity. Try again!</p></div>`;
  }
}

// Animate the score display
function animateScore() {
  const scoreElement = document.getElementById('finalScore');
  const targetScore = parseInt(scoreElement.textContent);
  let currentScore = 0;
  
  const interval = setInterval(() => {
    if (currentScore < targetScore) {
      currentScore++;
      scoreElement.textContent = currentScore;
    } else {
      clearInterval(interval);
    }
  }, 100);
}

// Format time in minutes:seconds
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Retake the current quiz
function retakeQuiz() {
  const category = Object.keys(quizData).find(key => quizData[key].name === currentQuiz.name);
  if (category) {
    startQuiz(category);
  }
}

// Review answers
function reviewAnswers() {
  elements.resultsSection.style.display = 'none';
  elements.reviewSection.style.display = 'block';
  
  let reviewHTML = '';
  currentQuiz.questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === question.correct;
    const wasSkipped = userAnswer === -1;
    
    reviewHTML += `
      <div class="review-item ${isCorrect ? 'correct' : wasSkipped ? 'skipped' : 'wrong'}">
        <div class="review-header">
          <h4>Question ${index + 1}</h4>
          <div class="review-status">
            ${isCorrect ? '<i class="fas fa-check-circle"></i> Correct' : 
              wasSkipped ? '<i class="fas fa-minus-circle"></i> Skipped' : 
              '<i class="fas fa-times-circle"></i> Wrong'}
          </div>
        </div>
        <div class="review-question">
          <p><strong>${question.question}</strong></p>
        </div>
        <div class="review-answers">
          <div class="answer-row">
            <span class="answer-label">Your Answer:</span>
            <span class="answer-value ${isCorrect ? 'correct' : wasSkipped ? 'skipped' : 'wrong'}">
              ${wasSkipped ? 'Skipped' : question.options[userAnswer]}
            </span>
          </div>
          ${!isCorrect ? `
            <div class="answer-row">
              <span class="answer-label">Correct Answer:</span>
              <span class="answer-value correct">${question.options[question.correct]}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  });
  
  document.getElementById('reviewContent').innerHTML = reviewHTML;
  addReviewStyles();
}

// Add CSS for review section
function addReviewStyles() {
  if (!document.getElementById('review-styles')) {
    const style = document.createElement('style');
    style.id = 'review-styles';
    style.textContent = `
      .review-item { background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; border-left: 4px solid; }
      .review-item.correct { border-left-color: #00ff88; }
      .review-item.wrong { border-left-color: #ff4757; }
      .review-item.skipped { border-left-color: #ffc107; }
      .review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
      .review-header h4 { color: #00f7ff; margin: 0; }
      .review-status { font-weight: 600; }
      .review-status.correct, .correct { color: #00ff88; }
      .review-status.wrong, .wrong { color: #ff4757; }
      .review-status.skipped, .skipped { color: #ffc107; }
      .review-question { margin-bottom: 1rem; }
      .review-question p { font-size: 1.1rem; line-height: 1.5; }
      .review-answers { display: flex; flex-direction: column; gap: 0.5rem; }
      .answer-row { display: flex; gap: 1rem; }
      .answer-label { font-weight: 600; min-width: 120px; color: #ccc; }
      .answer-value { font-weight: 600; }
    `;
    document.head.appendChild(style);
  }
}

// Close review and go back to results
function closeReview() {
  elements.reviewSection.style.display = 'none';
  elements.resultsSection.style.display = 'block';
}

// Share results
function shareResults() {
  const percentage = Math.round((score / currentQuiz.questions.length) * 100);
  const shareText = `I just scored ${score}/${currentQuiz.questions.length} (${percentage}%) on the ${currentQuiz.name} quiz! 🎯`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Quiz Results',
      text: shareText,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Results copied to clipboard! You can paste it anywhere to share.');
    });
  }
}

// Go back to categories
function backToCategories() {
  elements.quizSection.style.display = 'none';
  elements.resultsSection.style.display = 'none';
  elements.reviewSection.style.display = 'none';
  elements.quizProgress.style.display = 'none';
  elements.timerContainer.style.display = 'none';
  elements.pauseModal.style.display = 'none';
  elements.categorySection.style.display = 'block';
  
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  
  elements.timerContainer.classList.remove('warning');
}

// Load custom quizzes (placeholder function)
function loadCustomQuizzes() {
  alert('Custom quizzes feature coming soon! 🚀\n\nThis will allow you to:\n• Take quizzes created by other users\n• Browse different topics\n• Save your favorite quizzes');
}

// Load custom quizzes data (placeholder)
function loadCustomQuizzesData() {
  // Placeholder for loading custom quiz data
}

// Add animations and smooth transitions
function addAnimations() {
  if (!document.getElementById('quiz-animations')) {
    const style = document.createElement('style');
    style.id = 'quiz-animations';
    style.textContent = `
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes timerWarning { 0% { background: rgba(255, 77, 87, 0.1); } 100% { background: rgba(255, 77, 87, 0.3); } }
      .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); justify-content: center; align-items: center; z-index: 2000; }
      .modal-content { background: linear-gradient(135deg, #111, #1a1a1a); border: 1px solid rgba(0, 247, 255, 0.3); border-radius: 20px; padding: 2rem; text-align: center; max-width: 400px; width: 90%; }
      .modal-content h3 { color: #00f7ff; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
      .modal-actions { display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; }
      .performance { text-align: center; padding: 1.5rem; border-radius: 12px; margin: 1rem 0; }
      .performance.excellent { background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); color: #00ff88; }
      .performance.good { background: rgba(0, 247, 255, 0.1); border: 1px solid rgba(0, 247, 255, 0.3); color: #00f7ff; }
      .performance.average { background: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.3); color: #ffc107; }
      .performance.needs-improvement { background: rgba(255, 71, 87, 0.1); border: 1px solid rgba(255, 71, 87, 0.3); color: #ff4757; }
      .performance i { font-size: 2rem; margin-bottom: 0.5rem; display: block; }
      .performance h3 { margin: 0.5rem 0; font-size: 1.3rem; }
      .performance p { margin: 0; opacity: 0.9; }
    `;
    document.head.appendChild(style);
  }
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (elements.quizSection.style.display === 'block' && !isPaused) {
    switch(e.key) {
      case '1':
      case '2':
      case '3':
      case '4':
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option-item');
        if (options[optionIndex]) {
          selectOption(optionIndex);
        }
        break;
      case 'Enter':
        if (!elements.nextBtn.disabled) {
          nextQuestion();
        }
        break;
      case ' ':
        e.preventDefault();
        pauseQuiz();
        break;
    }
  }
});