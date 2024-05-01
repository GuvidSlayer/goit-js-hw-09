function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

let colorChangeInterval;

document.querySelector('button[data-start]').addEventListener('click', () => {
  document.querySelector('button[data-start]').disabled = true;
  document.querySelector('button[data-stop]').disabled = false;

  colorChangeInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

document.querySelector('button[data-stop]').addEventListener('click', () => {
  document.querySelector('button[data-start]').disabled = false;
  document.querySelector('button[data-stop]').disabled = true;

  clearInterval(colorChangeInterval);
});
