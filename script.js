function displayTime(pomodoro) {
    var workingTimeSettings = document.getElementById('working-time-settings');
    var workingTimeDisplay = workingTimeSettings.getElementsByClassName('settings-display')[0];
    workingTimeDisplay.innerHTML = pomodoro.workingTime + ' min';

    var restTimeSettings = document.getElementById('rest-time-settings');
    var restTimeDisplay = restTimeSettings.getElementsByClassName('settings-display')[0];
    restTimeDisplay.innerHTML = pomodoro.restTime + ' min';

    var timer = document.getElementById('timer');
    timer.innerHTML = pomodoro.currentTime + ' min';  
}

function onPlusBtnClick(pomodoro) {
    var plusBtns = document.getElementsByClassName('plus');
    for (var i = 0; i < plusBtns.length; i += 1) {
        plusBtns[i].addEventListener('click', function (event) {
            if (event.target.parentNode.id === 'working-time-settings') {
                pomodoro.workingTime += 1;
                pomodoro.currentTime = pomodoro.workingTime;
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
                pomodoro.currentTime = pomodoro.workingTime;
                displayTime(pomodoro);
            } else {
                pomodoro.restTime -= 1;
                displayTime(pomodoro);
            }
        });
    }
}

function onTimerClick(pomodoro) {
    var timer = document.getElementById('timer');
    var intervalId;
    timer.onclick = function (event) {
        console.log('Test start'); // Test  
        if (pomodoro.isRunning) {
            clearInterval(intervalId);
        } else {                
            intervalId = setInterval(function () {                      
                if (pomodoro.currentTime > 1) {
                    pomodoro.currentTime -= 1;
                    console.log('currentTime ' + pomodoro.currentTime); 
                    var timer = document.getElementById('timer');
                    timer.innerHTML = pomodoro.currentTime + ' min';
                } else {
                    pomodoro.isWorkingTime = !pomodoro.isWorkingTime;
                    if (pomodoro.isWorkingTime) {                    
                        pomodoro.currentTime = pomodoro.workingTime;
                        timer.innerHTML = pomodoro.currentTime + ' min';
                    } else {                    
                        pomodoro.currentTime = pomodoro.restTime;
                        timer.innerHTML = pomodoro.currentTime + ' min';
                    } 
                }
            }, 1000);    
        }   
        pomodoro.isRunning = !pomodoro.isRunning;
        console.log('isRunning ' + pomodoro.isRunning); // Test            
    };
}

window.onload = function () {
    var pomodoro = {
        workingTime: 25,
        restTime: 5,
        currentTime: 0,
        isWorkingTime: true,
        isRunning: false
    };
    pomodoro.currentTime = pomodoro.workingTime;
    displayTime(pomodoro);
    onPlusBtnClick(pomodoro);
    onMinusBtnClick(pomodoro);
    onTimerClick(pomodoro);
};