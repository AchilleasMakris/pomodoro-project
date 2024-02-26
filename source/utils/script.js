const pomodoroTimer = () => {
    const pomodoroBtn = document.getElementById('pomodoro-btn');
    const shortBreakBtn = document.getElementById('short-break-btn');
    const longBreakBtn = document.getElementById('long-break-btn');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    let timer;
    let isRunning = false;
    let currentTimer = 'pomodoro'; // Default timer

    // Object to store time left for each type of timer
    let timeLeft = {
        pomodoro: 25 * 60, // 25 minutes in seconds
        shortBreak: 5 * 60, // 5 minutes in seconds
        longBreak: 15 * 60 // 15 minutes in seconds
    };

    // Function to set the timer display
    const setTimer = () => {
        const timerDisplay = document.querySelector('.timer');
        timerDisplay.textContent = formatTime(timeLeft[currentTimer]);
    };

    // Function to start the timer
    const startTimer = () => {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                if (timeLeft[currentTimer] === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    startBtn.textContent = 'Start';
                    return;
                }
                timeLeft[currentTimer]--;
                setTimer();
            }, 1000);
            startBtn.textContent = 'Pause';
        } else {
            clearInterval(timer);
            isRunning = false;
            startBtn.textContent = 'Start';
            return; // Return here to prevent further execution
        }
    };

    // Function to reset the timer
    const resetTimer = () => {
        clearInterval(timer);
        timeLeft[currentTimer] = currentTimer === 'pomodoro' ? 25 * 60 : (currentTimer === 'shortBreak' ? 5 * 60 : 15 * 60);
        setTimer();
        if (isRunning) {
            startBtn.textContent = 'Start';
            isRunning = false;
        }
    };

    // Helper function to format time from seconds to MM:SS
    const formatTime = (timeInSeconds) => {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;
        return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    };

    // Event listeners for each button
    pomodoroBtn.addEventListener('click', () => {
        if (currentTimer !== 'pomodoro') {
            clearInterval(timer);
            startBtn.textContent = 'Start';
            currentTimer = 'pomodoro';
            setTimer();
        }
    });

    shortBreakBtn.addEventListener('click', () => {
        if (currentTimer !== 'shortBreak') {
            clearInterval(timer);
            startBtn.textContent = 'Start';
            currentTimer = 'shortBreak';
            setTimer();
        }
    });

    longBreakBtn.addEventListener('click', () => {
        if (currentTimer !== 'longBreak') {
            clearInterval(timer);
            startBtn.textContent = 'Start';
            currentTimer = 'longBreak';
            setTimer();
        }
    });

    // Event listener for the start/pause button
    startBtn.addEventListener('click', startTimer);

    // Event listener for the reset button
    resetBtn.addEventListener('click', resetTimer);
};

export default pomodoroTimer;