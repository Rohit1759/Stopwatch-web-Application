let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function timeToString(time) {
  const hrs = String(Math.floor(time / 3600000)).padStart(2, '0');
  const mins = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
  const secs = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  display.textContent = timeToString(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 1000);
  isRunning = true;
  startStopBtn.textContent = "Pause";
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startStopBtn.textContent = "Start";
}

startStopBtn.addEventListener("click", () => {
  isRunning ? stopTimer() : startTimer();
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = timeToString(elapsedTime);
    lapsList.appendChild(li);
  }
});

updateDisplay();
