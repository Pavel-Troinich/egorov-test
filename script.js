const END_TIME = '2023-07-24';

const days = document.querySelector('.timer__days');
const hours = document.querySelector('.timer__hours');
const minutes = document.querySelector('.timer__minutes');
const seconds = document.querySelector('.timer__seconds');

function getRemainingTime(endTime){
  const remainingTime = Date.parse(endTime) - Date.parse(new Date());
  let remainingSeconds = Math.floor((remainingTime/1000) % 60);  
  if(remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;
  let remainingMinutes = Math.floor( (remainingTime/1000/60) % 60 );
  if(remainingMinutes < 10) remainingMinutes = '0' + remainingMinutes;
  let remainingHours = Math.floor( (remainingTime/(1000*60*60)) % 24 );
  if(remainingHours < 10) remainingHours = '0' + remainingHours;
  const remainingDays = Math.floor( remainingTime/(1000*60*60*24) );
  if(remainingDays < 10) remainingDays = '0' + remainingDays;
  return {
    remainingTime,
    remainingDays,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
  };
}

function setTimer() {
  const timer = setInterval(() => {
    const time = getRemainingTime(END_TIME);
    days.innerHTML = time.remainingDays;
    hours.innerHTML = time.remainingHours;
    minutes.innerHTML = time.remainingMinutes;
    seconds.innerHTML = time.remainingSeconds;
    if(time.remainingTime <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

setTimer();


