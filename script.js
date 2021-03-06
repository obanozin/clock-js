setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock(){
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()

// timer

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let elapsedTime;
let startTime;
let timerId;
let timeToAdd = 0;

const updateTimeText = () => {
  let m = Math.floor(elapsedTime / (1000 * 60));
  let s = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  let ms = elapsedTime % 1000;

  m = `0${m}`.slice(-2);
  s = `0${s}`.slice(-2);
  ms = `00${ms}`.slice(-3);

  timer.textContent = `${m}:${s}:${ms}`;
};

const countUp = () => {
  timerId = setTimeout(() => {
    elapsedTime = Date.now() - startTime + timeToAdd;
    updateTimeText();
    countUp();
  }, 10);
};

start.addEventListener("click", () => {
  startTime = Date.now();
  countUp();
});

stop.addEventListener("click", () => {
  clearTimeout(timerId);
  timeToAdd += Date.now() - startTime;
});

reset.addEventListener("click", () => {
  elapsedTime = 0;
  timeToAdd = 0;
  updateTimeText();
});