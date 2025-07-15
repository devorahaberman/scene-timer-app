let timer;
let timeLeft = 900;

const display = document.getElementById("time-display");
const buttons = document.querySelectorAll("[data-time]");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const message = document.getElementById("message");
const themeToggle = document.getElementById("toggle-theme");

// Toggle dark mode
document.body.classList.toggle(
  "dark",
  localStorage.getItem("theme") === "dark"
);
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

const messages = [
  "You got this! 💪",
  "Keep going! 📝",
  "Let the words flow! ✍️",
  "Just write—no editing! 🧠",
  "Almost there! 🕒",
];

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
      if (timeLeft % 60 === 0) showMessage(); // every minute
    } else {
      clearInterval(timer);
      timer = null;
      showMessage("Time’s up! Great work! 🎉");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  stopTimer();
  timeLeft = 900;
  updateDisplay();
  showMessage("Reset and ready! 🌀");
}

buttons.forEach((btn) =>
  btn.addEventListener("click", () => {
    timeLeft = parseInt(btn.dataset.time);
    updateDisplay();
    stopTimer();
    showMessage("Ready when you are! ✅");
  })
);

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

themeToggle.addEventListener("click", () =>
  document.body.classList.toggle("dark")
);

function showMessage(text = null) {
  const msg = text || messages[Math.floor(Math.random() * messages.length)];
  message.textContent = msg;
}

updateDisplay();
