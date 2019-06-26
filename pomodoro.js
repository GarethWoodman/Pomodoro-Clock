
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
let breakTime = (60 * 5) + 1;
let studyTime = (60 * 25) + 1;

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
        this.count_down()
        this.minutes = parseInt(this.seconds / 60)
        this.displaySeconds = this.seconds
        this.displaySeconds -= (60 * this.minutes)
    
        //let hours = (minutes / 60)
        //minutes -= (60 * hours)
    
        this.display_time(this.displaySeconds, 1)
        this.display_time(this.minutes, 0)
        //this.display_time(hours, 0)
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

let breakTimeObj = new Timer();
let studyTimeObj = new Timer();
let timey = new Timer();

startButton.addEventListener("click", function() {
  window.timer = setInterval(function() { 
    displayTime.textContent = timey.time() 
    if(timey.seconds == 0){
        //clearInterval(window.timer);
        if(isBreak){
          timey.seconds = breakTime;
          displayTime.style.color = "red"
          isBreak = false;
        } else {
          timey.seconds = studyTime;
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
  timey.seconds = studyTime;
  displayTime.style.color = "green"
  setInterval(window.timer);
});

upBreak.addEventListener("click", function() {
  if(breakTime < 60 * 60){
    breakTime += 60;
    breakTimeObj.seconds = breakTime;
    displayBreakTime.textContent = breakTimeObj.time();
  }
})

downBreak.addEventListener("click", function() {
  if(breakTime > 61){
    breakTime -= 60;
    breakTimeObj.seconds = breakTime;
    displayBreakTime.textContent = breakTimeObj.time();
  }
})

upStudy.addEventListener("click", function() {
  if(studyTime < 60 * 60){
    studyTime += 60;
    studyTimeObj.seconds = studyTime;
    displayStudyTime.textContent = studyTimeObj.time();
  }
})

downStudy.addEventListener("click", function() {
  if(studyTime > 61){
    studyTime -= 60;
    studyTimeObj.seconds = studyTime;
    displayStudyTime.textContent = studyTimeObj.time();
  }
})