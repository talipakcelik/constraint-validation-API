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
const btn1 = document.querySelector('.pw-vis');
const btn2 = document.querySelector('.confirm-pw-vis');
const valid = document.querySelector('.valid');

email.addEventListener('input', function (e) {
  email.setCustomValidity('');
  let emailCheck = email.checkValidity();

  // checkValidity: true so emailCheck: true
  if (emailCheck) {
    // it looks built-in email validation "string + @ + string"
    // trigger invalid listener
    let emailRegex = new RegExp('@gmail.com$', 'i');
    if (emailRegex.test(email.value) === false) {
      email.setCustomValidity('NOT a gmail address'); // set in property
      // so custom error: true
      email.reportValidity(); // show the custom message, also trigger invalid listener
    } else if (emailRegex.test(email.value) === true) {
      emailErrMsg.innerHTML = '&nbsp';
      e.target.style.outlineColor = 'hsla(153, 46%, 49%, 1)';
    }
  }
});

// email.addEventListener("input", function() {

// })

email.addEventListener('invalid', function (e) {
  emailErrMsg.textContent = 'Entered value needs to be a gmail address.';
  e.target.style.outlineColor = 'hsla(0, 85%, 61%, 1)';
});

zip.addEventListener('input', function (e) {
  if (zip.validity.valueMissing) {
    zipErrMsg.textContent = 'You need to enter a zip code.';
    zip.setCustomValidity('Please enter a zip code');
    zip.reportValidity();
  } else {
    zip.setCustomValidity('');
    zipErrMsg.innerHTML = '&nbsp';
    e.target.style.outlineColor = 'hsla(153, 46%, 49%, 1)';
  }
});

zip.addEventListener('invalid', function (e) {
  zipErrMsg.textContent = 'Entered value needs to be a valid zip code.';
  e.target.style.outlineColor = 'hsla(0, 85%, 61%, 1)';
});

pw.addEventListener('change', function () {
  if (pw.validity.valueMissing) {
    pwErrMsg.textContent = 'You need to enter a password.';
    pw.setCustomValidity('Please enter a password');
    pw.reportValidity();
  } else if (pw.validity.typeMismatch) {
    pwErrMsg.textContent = 'Entered value needs to be a password';
  } else {
    pw.setCustomValidity('');
    pwErrMsg.innerHTML = '&nbsp';
  }
});

let response = {
  upper: false,
  lower: false,
  num: false,
  len: false,
  matches: null,
  invalid: true,
};

pw.addEventListener('input', function (e) {
  let txt = pw.value.trim();
  response.upper = /[A-Z]/.test(txt);
  response.lower = /[a-z]/.test(txt);
  response.num = /[0-9]/.test(txt);
  response.len = pw.value.trim().length >= 8;
  response.matches = txt.match(/([^A-Za-z0-9_!@#$%^&*().,?;:~])/);
  if (response.matches && response.matches.length > 0) {
    response.invalid = false;
  }

  if (response.upper === false) {
    upper.style.color = 'hsla(0, 85%, 61%, 1)';
  } else {
    // e.target.style.outlineColor = 'hsla(153, 46%, 49%, 1)';
    upper.style.color = 'hsla(153, 46%, 49%, 1)';
  }

  if (response.lower === false) {
    lower.style.color = 'hsla(0, 85%, 61%, 1)';
  } else {
    lower.style.color = 'hsla(153, 46%, 49%, 1)';
  }

  if (response.num === false) {
    num.style.color = 'hsla(0, 85%, 61%, 1)';
  } else {
    num.style.color = 'hsla(153, 46%, 49%, 1)';
  }

  if (response.len === false) {
    len.style.color = 'hsla(0, 85%, 61%, 1)';
  } else {
    len.style.color = 'hsla(153, 46%, 49%, 1)';
  }

  if (response.matches) {
    invalid.style.color = 'hsla(0, 85%, 61%, 1)';
  } else {
    invalid.style.color = 'hsla(153, 46%, 49%, 1)';
    // invalid.style.backgroundColor = 'white';
  }

  if (
    response.upper === false ||
    response.lower === false ||
    response.num === false ||
    response.len === false ||
    response.matches
  ) {
    e.target.style.outlineColor = 'hsla(0, 85%, 61%, 1)';
  } else {
    e.target.style.outlineColor = 'hsla(153, 46%, 49%, 1)';
  }
});

confirmPw.addEventListener('input', function (e) {
  if (confirmPw.validity.valueMissing) {
    confirmPwErrMsg.textContent = 'You need to enter a confirm password.';
    confirmPw.setCustomValidity('Please enter a confirm password');
    confirmPw.reportValidity();
  } else if (confirmPw.validity.typeMismatch) {
    confirmPwErrMsg.textContent = 'Entered value needs to be a password';
  } else {
    confirmPw.setCustomValidity('');
    confirmPwErrMsg.innerHTML = '&nbsp';
  }

  if (pw.value !== confirmPw.value || confirmPw.validity.tooShort === true) {
    e.target.style.outlineColor = 'hsla(0, 85%, 61%, 1)';
  } else {
    e.target.style.outlineColor = 'hsla(153, 46%, 49%, 1)';
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty, display the following error message.

    emailErrMsg.textContent = 'You need to enter a gmail address.';
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

btn1.addEventListener('click', function (e) {
  const revealed = pw.getAttribute('type') === 'text';
  pw.setAttribute('type', revealed ? 'password' : 'text');
  e.currentTarget.innerHTML = revealed
    ? '<ion-icon name="eye-outline"></ion-icon>'
    : '<ion-icon name="eye-off-outline"></ion-icon>';
});
btn2.addEventListener('click', function (e) {
  const revealed = confirmPw.getAttribute('type') === 'text';
  confirmPw.setAttribute('type', revealed ? 'password' : 'text');
  e.currentTarget.innerHTML = revealed
    ? '<ion-icon name="eye-outline"></ion-icon>'
    : '<ion-icon name="eye-off-outline"></ion-icon>';
});

form.addEventListener('submit', function (event) {
  let emailCheck = email.checkValidity();
  let zipCheck = zip.checkValidity();
  let pwCheck = pw.checkValidity();
  let confirmPwCheck = confirmPw.checkValidity();

  if (!emailCheck) {
    showError();
    event.preventDefault(); // prevent the form from being sent
  } else if (!zipCheck) {
    showError();
    event.preventDefault();
  } else if (!pwCheck) {
    showError();
    event.preventDefault();
  } else if (!confirmPwCheck) {
    showError();
    event.preventDefault();
  } else if (pw.value !== confirmPw.value) {
    event.preventDefault();
    confirmPwErrMsg.textContent = 'Passwords do not match';
    confirmPw.style.outlineColor = 'hsla(0, 85%, 61%, 1)';
  } else if (confirmPw.validity.tooShort === true) {
    confirmPwErrMsg.textContent = 'At least 8 characters long';
  } else if (
    response.upper === false ||
    response.lower === false ||
    response.num === false ||
    response.len === false ||
    response.matches
  ) {
    event.preventDefault();
  } else {
    event.preventDefault();
    valid.textContent = 'The form has been successfully submitted ???';
  }
});
