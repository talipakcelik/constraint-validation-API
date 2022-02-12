const form = document.querySelector('form');
const email = document.querySelector('#email');
const emailErrMsg = document.querySelector('.errMessage');
const country = document.querySelector('#country');
const zip = document.querySelector('#zip');
const zipErrMsg = document.querySelector('.zipErrMsg');

console.log(email.validity);

console.log(email.willValidate);

console.log(email.checkValidity());

email.addEventListener('change', function () {
  let emailCheck = email.checkValidity();

  // checkValidity: true so emailCheck: true

  if (emailCheck) {
    // it looks built-in email validation "string + @ + string"
    // trigger invalid listener
    let emailRegex = new RegExp('@gmail.com$', 'i');
    if (emailRegex.test(email.value) === false) {
      console.log('email değil');

      email.setCustomValidity('NOT a gmail address'); // set in property
      // so custom error: true
      email.reportValidity(); // show the custom message, also trigger invalid listener
      console.log(email.validity);
    } else {
      email.setCustomValidity('');
      emailErrMsg.textContent = '';
    }
  }
});

email.addEventListener('invalid', function () {
  emailErrMsg.textContent = 'Entered value needs to be a gmail address.';
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty, display the following error message.

    emailErrMsg.textContent = 'You need to enter an e-mail address.';
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address, display the following error message.

    emailErrMsg.textContent = 'Entered value needs to be a gmail address.';
  }

  if (zip.validity.valueMissing) {
    zipErrMsg.textContent = 'You need to enter a zip code.';
  }
}
console.log(zip.validity);
zip.addEventListener('change', function () {
  let zipCheck = zip.checkValidity();

  if (zip.validity.valueMissing) {
    zipErrMsg.textContent = 'You need to enter a zip code.';
    zip.setCustomValidity('Please enter a zip code');
    zip.reportValidity();
  } else {
    zip.setCustomValidity('');
    zipErrMsg.textContent = '';
  }
});

zip.addEventListener('invalid', function () {
  zipErrMsg.textContent = 'Entered value needs to be a valid zip code.';
});

form.addEventListener('submit', function (event) {
  let emailCheck = email.checkValidity();

  if (!emailCheck) {
    showError();
    event.preventDefault(); // prevent the form from being sent
  }

  let zipCheck = zip.checkValidity();
  if (!zipCheck) {
    showError();
    event.preventDefault();
  }
});
