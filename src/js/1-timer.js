import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateTimeEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', onClickStartTimer);

let userSelectedDate = '';
let intervalId = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      disableBtn();
      addErrorMessage();
    } else {
      enableBtn();
      removeErrorMessage();
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(inputDateTimeEl, options);

function onClickStartTimer() {
  intervalId = setInterval(calculateTimeLeft, 1000);
  disableBtn();
  inputDateTimeEl.setAttribute('disabled', '');
}

function changeElementDayTimeValue(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  if (!days && !hours && !minutes && !seconds) {
    clearInterval(intervalId);
    inputDateTimeEl.removeAttribute('disabled');
  }

  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

function calculateTimeLeft() {
  const currentDateMs = new Date().getTime();
  const selectedDateMS = new Date(userSelectedDate).getTime();
  const ms = selectedDateMS - currentDateMs;
  changeElementDayTimeValue(ms);
}

function disableBtn() {
  startBtn.setAttribute('disabled', '');
}

function enableBtn() {
  startBtn.removeAttribute('disabled');
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function addErrorMessage() {
  iziToast.error({
    backgroundColor: 'tomato',
    message: 'Please choose a date in the future',
    messageColor: 'white',
    messageSize: '20',
    position: 'topRight',
    close: true,
    displayMode: 2,
  });
}

function removeErrorMessage() {
  iziToast.destroy();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
