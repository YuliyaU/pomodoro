function displayTime(pomodoro) {
    var workingTimeSettings = document.getElementById('working-time-settings');
    var workingTimeDisplay = workingTimeSettings.getElementsByClassName('settings-display')[0];
    workingTimeDisplay.innerHTML = parseTime(pomodoro.workingTime);

    var restTimeSettings = document.getElementById('rest-time-settings');
    var restTimeDisplay = restTimeSettings.getElementsByClassName('settings-display')[0];
    restTimeDisplay.innerHTML = parseTime(pomodoro.restTime);

    var timer = document.getElementById('timer');
    timer.innerHTML = parseTime(pomodoro.currentTime);  
}

function onPlusBtnClick(pomodoro) {
    var plusBtns = document.getElementsByClassName('plus');
    for (var i = 0; i < plusBtns.length; i += 1) {
        plusBtns[i].addEventListener('click', function (event) {
            if (event.target.parentNode.id === 'working-time-settings') {
                pomodoro.workingTime += 1 * 60;
                pomodoro.currentTime = pomodoro.workingTime;
                displayTime(pomodoro);
            } else {
                pomodoro.restTime += 1 * 60;
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
                if (pomodoro.workingTime > 0) {
                    pomodoro.workingTime -= 1 * 60;
                    pomodoro.currentTime = pomodoro.workingTime;
                    displayTime(pomodoro);
                }                
            } else {
                if (pomodoro.restTime > 0) {
                    pomodoro.restTime -= 1 * 60;
                    displayTime(pomodoro);
                }                
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
                    timer.innerHTML = parseTime(pomodoro.currentTime);
                } else {
                    pomodoro.isWorkingTime = !pomodoro.isWorkingTime;
                    if (pomodoro.isWorkingTime) {                    
                        pomodoro.currentTime = pomodoro.workingTime;
                        timer.innerHTML = parseTime(0);
                    } else {                    
                        pomodoro.currentTime = pomodoro.restTime;
                        timer.innerHTML = parseTime(0);
                    } 
                }
            }, 1000);    
        }   
        pomodoro.isRunning = !pomodoro.isRunning;
        console.log('isRunning ' + pomodoro.isRunning); // Test            
    };
}

function convertToSeconds(minutes) {
    return minutes * 60;
} 

function parseTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);    
    if (minutes > 0) {                 
        seconds = seconds - (minutes * 60);
    }
    return `${hours} : ${minutes} : ${seconds}`
}
 
window.onload = function () {
    var pomodoro = {
        workingTime: convertToSeconds(25),
        restTime: convertToSeconds(5),
        currentTime: convertToSeconds(0),
        isWorkingTime: true,
        isRunning: false
    };
    pomodoro.currentTime = pomodoro.workingTime;
    displayTime(pomodoro);
    onPlusBtnClick(pomodoro);
    onMinusBtnClick(pomodoro);
    onTimerClick(pomodoro);
};