const END_TIME = '2023-07-24';
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const days = document.querySelector('.timer__days');
const hours = document.querySelector('.timer__hours');
const minutes = document.querySelector('.timer__minutes');
const seconds = document.querySelector('.timer__seconds');
const subscriptionInput = document.querySelector('.subscription__input');
const subscriptionBtn = document.querySelector('.subscription__btn');

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal__title');
const modalNotice = document.querySelector('.modal__notice');
const modalCloseIcon = document.querySelector('.modal__close');
const modalCloseBtn = document.querySelector('.modal__btn');

subscriptionBtn.addEventListener('click', sendEmail);
modal.addEventListener('click', closeModal);
modalCloseIcon.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);


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

function subscribe() {
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    if (res.status === 200) {
      modalTitle.innerHTML = 'Success!';
      modalNotice.innerHTML = 'You have successfully subscribed to the email newsletter';
    } else {
      modalTitle.innerHTML = 'Error!';
      modalNotice.innerHTML = 'An error has occurred. Try again later.';
    }
  })
  .catch(err => console.log(err));
}

function closeModal() {
  modal.classList.remove('active');
  subscriptionInput.value = '';
}

function validateEmail (email) {
  return email.match(EMAIL_REGEXP);
};

function sendEmail() {
  if (validateEmail(subscriptionInput.value)) {
    subscribe();
  } else{
    modalTitle.innerHTML = 'Wrong email!';
    modalNotice.innerHTML = 'Check the email and try again.';
  }
  modal.classList.add('active');
}

setTimer();


