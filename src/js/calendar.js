const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector('.calendar__days');

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  document.querySelector('.calendar__date h1').innerHTML =
    months[date.getMonth()];
  document.querySelector('.calendar__date h2').innerHTML = date.getFullYear();

  let days = '';

  for (let x = firstDayIndex; x > 0; x -= 1) {
    days += `<div class='calendar__prev-date'>${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i += 1) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class='calendar__today'>${i}</div>`;
    } else {
      days += `<div class='day'>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j += 1) {
    days += `<div class='calendar__next-date'>${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector('.calendar__prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector('.calendar__next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

document.querySelector('.calendar__prev-year').addEventListener('click', () => {
  date.setFullYear(date.getFullYear() - 1);
  renderCalendar();
});

document.querySelector('.calendar__next-year').addEventListener('click', () => {
  date.setFullYear(date.getFullYear() + 1);
  renderCalendar();
});

// =================================================================================

const calendarContainerEl = document.querySelector('.calendar__container');
const calendarInputEl = document.querySelector('.calendar__input');
const calendarWeekdaysEl = document.querySelector('.calendar__calendar');

calendarInputEl.addEventListener('click', onOpenCalendar);
calendarWeekdaysEl.addEventListener('click', onCalendarClick);

function onOpenCalendar() {
  calendarContainerEl.classList.toggle('is-hidden');
  calendarInputEl.style.backgroundColor = '#4440F6';
}

function onCalendarClick(event) {
  const target = event.target;

  if (
    (target.tagName === 'DIV' && target.classList.contains('day')) ||
    target.classList.contains('calendar__today')
  ) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = parseInt(target.innerText);

    const selectedDate = new Date(year, month, day);

    calendarInputEl.value = selectedDate.toLocaleDateString();

    calendarContainerEl.classList.add('is-hidden');
  }
}
