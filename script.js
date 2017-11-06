function displayTime(pomodoro) {
    var workingTimeSettings = document.getElementById('working-time-settings');
    var workingTimeDisplay = workingTimeSettings.getElementsByClassName('settings-display')[0];
    workingTimeDisplay.innerHTML = pomodoro.workingTime + ' min';

    var restTimeSettings = document.getElementById('rest-time-settings');
    var restTimeDisplay = restTimeSettings.getElementsByClassName('settings-display')[0];
    restTimeDisplay.innerHTML = pomodoro.restTime + ' min';

    var timer = document.getElementById('timer');
    timer.innerHTML = pomodoro.workingTime + ' min';
}

function onPlusBtnClick(pomodoro) {
    var plusBtns = document.getElementsByClassName('plus');
    for (var i = 0; i < plusBtns.length; i += 1) {
        plusBtns[i].addEventListener('click', function (event) {
            if (event.target.parentNode.id === 'working-time-settings') {
                pomodoro.workingTime += 1;
                displayTime(pomodoro);
            } else {
                pomodoro.restTime += 1;
                displayTime(pomodoro);
            }
        });
    }
}

function onMinusBtnClick(pomodoro) {
    var minusBtns = document.getElementsByClassName('minus');
    for (var i = 0; i < minusBtns.length; i += 1) {
        minusBtns[i].addEventListener('click', function (event) {
            if (event.target.parentNode.id === 'working-time-settings') {
                pomodoro.workingTime -= 1;
                displayTime(pomodoro);
            } else {
                pomodoro.restTime -= 1;
                displayTime(pomodoro);
            }
        });
    }
}

window.onload = function () {
    var pomodoro = {
        workingTime: 25,
        restTime: 5,
        isWorkingTime: true,
        isRunning: false
    };
    displayTime(pomodoro);
    onPlusBtnClick(pomodoro);
    onMinusBtnClick(pomodoro);
};