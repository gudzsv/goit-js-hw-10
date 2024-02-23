import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

const stateDictionary = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

function onSubmitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());

  makePromise(formDataObj)
    .then(({ delay, state }) => {
      iziToastAction(delay, state);
    })
    .catch(({ delay, state }) => {
      iziToastAction(delay, state);
    });

  event.target.reset();
}

function makePromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === stateDictionary.FULFILLED) {
        resolve({ delay, state });
      } else {
        reject({ delay, state });
      }
    }, Number(delay));
  });
}

function iziToastAction(delay, state) {
  const message =
    state === stateDictionary.FULFILLED
      ? `✅ Fulfilled promise in ${delay}ms`
      : `❌ Rejected promise in ${delay}ms`;
  const bgColor = state === stateDictionary.FULFILLED ? '#b6d7a8' : '#EA9999';

  iziToast.show({
    icon: false,
    backgroundColor: `${bgColor}`,
    message: `${message}`,
    messageColor: 'black',
    messageSize: '16',
    position: 'topRight',
    close: false,
    displayMode: 1,
  });
}
