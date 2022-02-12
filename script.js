const form = document.querySelector('form');
const email = document.querySelector('#email');
const emailErrMsg = document.querySelector('.errMessage');
const country = document.querySelector('#country');
const zip = document.querySelector('#zip');
const zipErrMsg = document.querySelector('.zipErrMsg');
const pw = document.querySelector('#pw');
const pwErrMsg = document.querySelector('.pwErrMsg');
const confirmPw = document.querySelector('#confirm-pw');
const confirmPwErrMsg = document.querySelector('.confirmPwErrMsg');

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

zip.addEventListener('change', function () {
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

pw.addEventListener('change', function () {
  if (pw.validity.valueMissing) {
    pwErrMsg.textContent = 'You need to enter a password.';
    pw.setCustomValidity('Please enter a password');
    pw.reportValidity();
  } else {
    pw.setCustomValidity('');
    pwErrMsg.textContent = '';
  }
});

confirmPw.addEventListener('change', function () {
  if (confirmPw.validity.valueMissing) {
    confirmPwErrMsg.textContent = 'You need to enter a confirm password.';
    confirmPw.setCustomValidity('Please enter a confirm password');
    confirmPw.reportValidity();
  } else {
    confirmPw.setCustomValidity('');
    confirmPwErrMsg.textContent = '';
  }
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

  if (pw.validity.valueMissing) {
    pwErrMsg.textContent = 'You need to enter a password';
  } else if (pw.validity.typeMismatch) {
    pwErrMsg.textContent = 'Entered value needs to be a password';
  }

  if (pw.validity.valueMissing) {
    pwErrMsg.textContent = 'You need to enter a password';
  }
}

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

  let pwCheck = pw.checkValidity();

  if (!pwCheck) {
    showError();
    event.preventDefault();
  }

  let confirmPwCheck = confirmPw.checkValidity();

  if (!confirmPwCheck) {
    showError();
    event.preventDefault();
  }
});
