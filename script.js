
// ==================================
// WONDERKIDS - MAIN JAVASCRIPT
// ==================================

let stars = 0;


// STAR PROGRESS
function addStars(amount = 10) {
    stars += amount;

    const starCount = document.getElementById("starCount");
    const progressStars = document.getElementById("progressStars");
    const progressBar = document.getElementById("progressBar");

    if (starCount) {
        starCount.textContent = stars;
    }

    if (progressStars) {
        progressStars.textContent = stars;
    }

    if (progressBar) {
        const progress = Math.min(stars, 100);
        progressBar.style.width = progress + "%";
    }
}
ressBar").style.width = progress + "%";
}

// MODAL
function openModal(content) {
  const modal = document.getElementById("activityModal");
  document.getElementById("modalContent").innerHTML = content;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("activityModal");

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("activityModal").addEventListener("click", function(event) {
  if (event.target === this) closeModal();
});


// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
   const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// ==================================
// BRAIN QUIZ
// ==================================

const questions = [
  {
    question: "Which animal says Meow? 🐾",
    options: ["Dog 🐶", "Cat 🐱", "Cow 🐮"],
    answer: 1
  },
  {
    question: "What is 5 + 3? 🔢",
    options: ["6", "8", "10"],
    answer: 1
  },
  {
    question: "Which planet do we live on? 🌍",
    options: ["Mars", "Earth", "Jupiter"],
    answer: 1
  },
  {
    question: "How many legs does a spider have? 🕷️",
    options: ["6", "8", "4"],
    answer: 1
  },
  {
    question: "Which colour do you get by mixing red and yellow?",
    options: ["Green", "Orange", "Purple"],
    answer: 1
  }
];

let currentQuestion = 0;
let quizScore = 0;
let answered = false;

function startQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  showQuestion();
}

function showQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  let html = `
        <h2>🧠 WonderKids Quiz!</h2>
        <p>Question ${currentQuestion + 1} of ${questions.length}</p>
        <h3>${q.question}</h3>
        <div>
    `;

  q.options.forEach((option, index) => {
    html += `
            <button class="game-btn" onclick="checkAnswer(${index})">
                ${option}
            </button>
        `;
  });

  html += `
        </div>
        <p id="quizFeedback" class="quiz-feedback"></p>
        <button class="main-btn" id="nextQuestion"
            onclick="nextQuestion()" disabled>
            Next →
        </button>
    `;

  openModal(html);
}

function checkAnswer(selected) {
  if (answered) return;

  answered = true;

  const correct = questions[currentQuestion].answer;
  const feedback = document.getElementById("quizFeedback");
  const next = document.getElementById("nextQuestion");

  if (selected === correct) {
    quizScore++;
    feedback.textContent = "🎉 Fantastic! Correct answer!";
    feedback.style.color = "#20a365";
  } else {
    feedback.textContent = "😊 Good try! Keep learning!";
    feedback.style.color = "#e36a6a";
  }

  next.disabled = false;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    const earnedStars = quizScore * 10;
    addStars(earnedStars);

    openModal(`
            <h2>🏆 Quiz Completed!</h2>
            <div style="font-size:65px">🎉🌟</div>
            <h3>You scored ${quizScore} out of ${questions.length}!</h3>
            <p>You earned ${earnedStars} stars!</p>
            <button class="main-btn" onclick="startQuiz()">
                Play Again ↻
            </button>
        `);
  }
}

// ==================================
// STORY WORLD
// ==================================

const stories = [
  {
    title: "The Kind Little Rabbit",
    emoji: "🐰",
    pages: [
      "Once upon a time, there lived a little rabbit named Ruby.",
      "One day, Ruby found a tiny bird that had fallen from its nest.",
      "Ruby carefully helped the bird return to its family.",
      "The bird and its family thanked Ruby with happy songs!"
    ],
    lesson: "Always be kind and help others. 💖"
  },
  {
    title: "The Brave Little Lion",
    emoji: "🦁",
    pages: [
      "Leo was a little lion who was afraid of the dark.",
      "One night, he heard a small voice calling for help.",
      "Leo bravely followed the sound and found a lost baby monkey.",
      "He helped the monkey return safely to its mother."
    ],
    lesson: "Being brave means doing the right thing even when you feel afraid. 🦁"
  },
  {
    title: "The Hardworking Ant",
    emoji: "🐜",
    pages: [
      "A little ant named Andy wanted to collect food for winter.",
      "Other animals laughed because Andy was so small.",
      "But Andy worked a little every day and never gave up.",
      "When winter arrived, Andy had plenty of food to share!"
    ],
    lesson: "Hard work and patience bring great results. 🌱"
  },
  {
    title: "The Elephant's Friendship",
    emoji: "🐘",
    pages: [
      "Ellie was a friendly elephant who lived near a beautiful river.",
      "One day, she saw a small monkey struggling to cross a muddy path.",
      "Ellie used her strong trunk to help the monkey.",
      "From that day, they became the best of friends."
    ],
    lesson: "True friendship is about helping and caring. 💕"
  },
  {
    title: "The Little Star Who Never Gave Up",
    emoji: "⭐",
    pages: [
      "Twinkle was a tiny star who wanted to shine brightly.",
      "She tried every night, but the bigger stars always looked brighter.",
      "One cloudy night, the bigger stars disappeared behind the clouds.",
      "Twinkle shone brightly and helped a little traveller find the way home."
    ],
    lesson: "Never give up. Even small efforts can make a big difference! ✨"
  }
];

let currentStoryPage = 0;
let selectedStory = null;

function readStory() {
  let html = `
        <h2>📚 Welcome to Story World!</h2>
        <p>Choose your favourite magical story.</p>
        <div>
    `;

  stories.forEach((story, index) => {
    html += `
            <button class="game-btn"
                onclick="openStory(${index})"
                style="display:block;width:100%;margin:10px auto;">
                ${story.emoji} ${story.title} →
            </button>
        `;
  });

  html += `</div>`;

  openModal(html);
}

function openStory(index) {
  selectedStory = stories[index];
  currentStoryPage = 0;
  showStoryPage();
}

function showStoryPage() {
  const story = selectedStory;
  const page = story.pages[currentStoryPage];

  const finalPage = currentStoryPage === story.pages.length - 1;

  openModal(`
        <h2>${story.emoji} ${story.title}</h2>

        <div style="font-size:75px;margin:20px;">
            ${story.emoji}
        </div>

        <p style="font-size:18px;min-height:75px;">
            ${page}
        </p>

        <p>Page ${currentStoryPage + 1} of ${story.pages.length}</p>

        <div class="progress-track">
            <div style="
                width:${((currentStoryPage + 1) / story.pages.length) * 100}%;
                height:100%;
                background:#c9a8d6;
                border-radius:20px;">
            </div>
        </div>

        ${
    !finalPage
      ? `<button class="main-btn" onclick="nextStoryPage()">Next Page →</button>`
      : `
                <h3>🌟 The Moral of the Story</h3>
                <p>${story.lesson}</p>
                <button class="main-btn" onclick="finishStory()">
                    Finish Story ⭐
                </button>
            `
  }

        <button class="game-btn" onclick="readStory()">
            ← All Stories
        </button>
    `);
}

function nextStoryPage() {
  if (currentStoryPage < selectedStory.pages.length - 1) {
    currentStoryPage++;
    showStoryPage();
  }
}

function finishStory() {
  addStars(10);

  openModal(`
        <h2>🎉 Wonderful Reading!</h2>
        <div style="font-size:70px">🏆📚⭐</div>
        <p>You finished a beautiful story!</p>
        <p>You earned 10 stars!</p>
        <button class="main-btn" onclick="readStory()">
            Read Another Story →
        </button>
    `);
}

// ==================================
// LEARNING ACTIVITY
// ==================================

const lessons = [
  ["A", "🍎", "Apple"],
  ["B", "🐻", "Bear"],
  ["C", "🐱", "Cat"],
  ["D", "🐶", "Dog"],
  ["E", "🐘", "Elephant"],
  ["F", "🐟", "Fish"],
  ["G", "🍇", "Grapes"],
  ["H", "🏠", "House"],
  ["I", "🍦", "Ice Cream"],
  ["J", "🧃", "Juice"]
];

let currentLesson = 0;

function learnSomething() {
  currentLesson = 0;
  showLesson();
}

function showLesson() {
  const lesson = lessons[currentLesson];

  openModal(`
        <h2>🔤 Learn Your Letters!</h2>

        <div style="font-size:85px;color:#9c88bc;font-weight:900">
            ${lesson[0]}
        </div>

        <div style="font-size:65px">${lesson[1]}</div>

        <h3>${lesson[0]} is for ${lesson[2]}!</h3>
        <p>Great job, little learner!</p>

        <button class="main-btn" onclick="nextLesson()">
            Next Letter →
        </button>
    `);
}

function nextLesson() {
  addStars(5);
  currentLesson++;

  if (currentLesson < lessons.length) {
    showLesson();
  } else {
    openModal(`
            <h2>🎉 Amazing Learning!</h2>
            <div style="font-size:65px">🔤⭐🏆</div>
            <p>You learned all the letters in this lesson!</p>
            <button class="main-btn" onclick="learnSomething()">
                Learn Again →
            </button>
        `);
  }
}

// ==================================
// CREATIVE DRAWING CORNER
// ==================================

let canvas;
let ctx;
let drawing = false;
let brushColor = "#ff4f81";

function openColoring() {
  openModal(`
        <h2>🎨 My Creative Corner</h2>
        <p>Choose a colour and draw something beautiful!</p>

        <canvas id="drawingCanvas" width="430" height="230"></canvas>

        <div class="color-tools">
            <button class="color-dot" style="background:#ff4f81"
                onclick="changeColor('#ff4f81')"></button>

            <button class="color-dot" style="background:#ffb52e"
                onclick="changeColor('#ffb52e')"></button>

            <button class="color-dot" style="background:#39bb83"
                onclick="changeColor('#39bb83')"></button>

            <button class="color-dot" style="background:#568bea"
                onclick="changeColor('#568bea')"></button>

            <button class="color-dot" style="background:#9b5de5"
                onclick="changeColor('#9b5de5')"></button>

            <button class="color-dot" style="background:#222222"
                onclick="changeColor('#222222')"></button>
        </div>

        <button class="game-btn" onclick="clearDrawing()">🧹 Clear</button>
        <button class="main-btn" onclick="saveDrawing()">Save My Art ⭐</button>
    `);

  setTimeout(setupCanvas, 50);
}

function setupCanvas() {
  canvas = document.getElementById("drawingCanvas");

  if (!canvas) return;

  ctx = canvas.getContext("2d");
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  canvas.style.touchAction = "none";

  function getPosition(event) {
    const rect = canvas.getBoundingClientRect();

    return {
      x: (event.clientX - rect.left) * canvas.width / rect.width,
      y: (event.clientY - rect.top) * canvas.height / rect.height
    };
  }

  canvas.onpointerdown = function(event) {
    drawing = true;

    const pos = getPosition(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    canvas.setPointerCapture(event.pointerId);
  };

  canvas.onpointermove = function(event) {
    if (!drawing) return;

    const pos = getPosition(event);

    ctx.strokeStyle = brushColor;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  canvas.onpointerup = function() {
    drawing = false;
  };

  canvas.onpointercancel = function() {
    drawing = false;
  };
}

function changeColor(color) {
  brushColor = color;
}


function clearDrawing() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing = false;
    }
}


function saveDrawing() {
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = "my-wonderkids-art.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  addStars(10);
  alert("Amazing artwork! You earned 10 stars! 🌟");
}

console.log("WonderKids website is ready! 🌈");
