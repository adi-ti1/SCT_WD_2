let startTime, updatedTime, difference, timerID;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);

function startPause() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerID = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timerID);
        difference = new Date().getTime() - startTime;
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerID);
    startTime = updatedTime = difference = 0;
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    display.textContent = '00:00:00.000';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapList.innerHTML = '';
    laps = [];
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours ? (hours > 9 ? hours : "0" + hours) + ":" : "") +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds) + "." +
        (milliseconds > 9 ? milliseconds : "0" + milliseconds)
    );
}

function addLap() {
    const lapTime = formatTime(updatedTime);
    laps.push(lapTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapList.appendChild(li);
}