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
const upper = document.querySelector('.upper');
const lower = document.querySelector('.lower');
const num = document.querySelector('.num');
const len = document.querySelector('.len');
const invalid = document.querySelector('.invalid');

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
  } else if (pw.validity.typeMismatch) {
    pwErrMsg.textContent = 'Entered value needs to be a password';
  } else if (pw.validity.tooShort) {
    pwErrMsg.textContent = 'At least 8 characters long';
  } else {
    pw.setCustomValidity('');
    pwErrMsg.textContent = '';
  }
});

pw.addEventListener('input', function () {
  let response = {
    upper: false,
    lower: false,
    num: false,
    len: false,
    matches: null,
    invalid: true,
  };

  let txt = pw.value.trim();
  response.upper = /[A-Z]/.test(txt);
  response.lower = /[a-z]/.test(txt);
  response.num = /[0-9]/.test(txt);
  response.len = pw.value.trim().length >= 8;
  response.matches = txt.match(/([^A-Za-z0-9_!@#$%^&*().,?;:~])/);
  if (response.matches && response.matches.length > 0) {
    response.invalid = false;
  }
  console.log(response);
  console.log(response.matches);

  if (response.upper === false) {
    upper.style.color = 'pink';
  } else {
    upper.style.color = 'white';
  }

  if (response.lower === false) {
    lower.style.color = 'pink';
  } else {
    lower.style.color = 'white';
  }

  if (response.num === false) {
    num.style.color = 'pink';
  } else {
    num.style.color = 'white';
  }

  if (response.len === false) {
    len.style.color = 'pink';
  } else {
    len.style.color = 'white';
  }

  if (response.matches) {
    invalid.style.color = 'pink';
  } else {
    invalid.style.color = 'white';
  }
  return response;
});

confirmPw.addEventListener('change', function () {
  if (confirmPw.validity.valueMissing) {
    confirmPwErrMsg.textContent = 'You need to enter a confirm password.';
    confirmPw.setCustomValidity('Please enter a confirm password');
    confirmPw.reportValidity();
  } else if (confirmPw.validity.typeMismatch) {
    confirmPwErrMsg.textContent = 'Entered value needs to be a password';
  } else if (confirmPw.validity.tooShort) {
    confirmPwErrMsg.textContent = 'At least 8 characters long';
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
  } else if (pw.validity.tooShort) {
    pwErrMsg.textContent = 'At least 8 characters long';
  }

  if (confirmPw.validity.valueMissing) {
    confirmPwErrMsg.textContent = 'You need to enter a password';
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
