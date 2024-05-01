// Descris în documentație
import flatpickr from 'flatpickr';
// Import suplimentar de stil
import 'flatpickr/dist/flatpickr.min.css';

document.querySelector('[data-start]').disabled = true;

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      document.querySelector('[data-start]').disabled = false;
      document.querySelector('[data-start]').dataset.date = selectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);

document.querySelector('[data-start]').addEventListener('click', function () {
  this.disabled = true;
  document.querySelector('#datetime-picker').disabled = true;
  const endDate = new Date(this.dataset.date);
  const timerInterval = setInterval(() => {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) {
      clearInterval(timerInterval);
      document.querySelector('[data-days]').textContent = '00';
      document.querySelector('[data-hours]').textContent = '00';
      document.querySelector('[data-minutes]').textContent = '00';
      document.querySelector('[data-seconds]').textContent = '00';
    } else {
      const time = convertMs(diff);
      document.querySelector('[data-days]').textContent = addZero(time.days);
      document.querySelector('[data-hours]').textContent = addZero(time.hours);
      document.querySelector('[data-minutes]').textContent = addZero(
        time.minutes
      );
      document.querySelector('[data-seconds]').textContent = addZero(
        time.seconds
      );
    }
  }, 1000);
});
