import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document
  .querySelector('.form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    const delay = Number(event.target.elements.delay.value);
    const step = Number(event.target.elements.step.value);
    const amount = Number(event.target.elements.amount.value);

    const promises = Array.from({ length: amount }, (_, i) => {
      return createPromise(i + 1, delay + i * step);
    });

    for (let i = 0; i < promises.length; i++) {
      try {
        const result = await promises[i];
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${i + 1} in ${result.delay}ms`
        );
      } catch (error) {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${i + 1} in ${error.delay}ms`
        );
      }
    }
    event.target.reset();
  });
