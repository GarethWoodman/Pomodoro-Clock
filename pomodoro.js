
let displayTime = document.querySelector('#display');
let startButton = document.querySelector('playButton');
let pauseButton = document.querySelector('pauseButton');
let resetButton = document.querySelector('resetButton');

let displayBreakTime = document.querySelector('break');
let displayStudyTime = document.querySelector('study');

let upBreak = document.querySelector('#upBreak');
let downButton = document.querySelector('#downBreak');

let upStudy = document.querySelector('#upStudy');
let downStudy= document.querySelector('#downStudy');

let isBreak = true;

class Timer {
    constructor() {
        this.clock = ["00","00"];
        this.seconds = 60 * 25;
    }

    count_down() {
      this.seconds -= 1;
    }

    seconds() {
      return this.seconds;
    }

    time() {
        this.minutes = parseInt(this.seconds / 60)
        this.displaySeconds = this.seconds
        this.displaySeconds -= (60 * this.minutes)
        this.display_time(this.displaySeconds, 1)
        this.display_time(this.minutes, 0)
        return this.clock.join(":")
    }
     
    display_time(time_value, index_value) {
        if (time_value < 10){
            this.clock[index_value] = "0" + time_value
            return
        } else {
            this.clock[index_value] = time_value
            return
        }
    }
}

let breakTime = new Timer()
breakTime.seconds = 60 * 5
let studyTime = new Timer()
studyTime.seconds = 60 * 25
let mainTime = new Timer();

let timeObjects = [breakTime, studyTime]
let displayTimes = [displayBreakTime, displayStudyTime]

startButton.addEventListener("click", function() {
  window.timer = setInterval(function() {
    mainTime.count_down(); 
    displayTime.textContent = mainTime.time() 
    if(mainTime.seconds == 0){
        if(isBreak){
          mainTime.seconds = breakTime.seconds;
          displayTime.style.color = "red"
          isBreak = false;
        } else {
          mainTime.seconds = studyTime.seconds;
          displayTime.style.color = "green"
          isBreak = true;
        }
    }
  }, 1000);
});

pauseButton.addEventListener("click", function() {
  clearInterval(window.timer);
});

resetButton.addEventListener("click", function() {
  mainTime.seconds = studyTime.seconds + 1;
  displayTime.style.color = "green"
  isBreak = true;
  setInterval(window.timer);
});

upBreak.addEventListener("click", function() {
  studyBreakControl("up", 0);
})

downBreak.addEventListener("click", function() {
  studyBreakControl("down", 0);
})

upStudy.addEventListener("click", function() {
  studyBreakControl("up", 1);
})

downStudy.addEventListener("click", function() {
  studyBreakControl("down", 1);
})

function studyBreakControl(value, i) {
  if(value == "down"){
    if(timeObjects[i].seconds > 61){timeObjects[i].seconds -= 60}
  } else {
      if(timeObjects[i].seconds < 60 * 60){timeObjects[i].seconds += 60;}
  }
  displayTimes[i].textContent = timeObjects[i].time();
}