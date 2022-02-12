const form = document.querySelector('form');
const email = document.querySelector('#email');
const span = document.querySelector('.errMessage');
const country = document.querySelector('#country');

console.log(email.validity);

console.log(email.willValidate);

console.log(email.checkValidity());

email.addEventListener('change', function () {
  let emailCheck = email.checkValidity();

  // checkValidity: true so emailCheck: true

  if (emailCheck) {
    // it looks built-in email validation "string + @ + string"
    // trigger invalid listener
    console.log('dede');
    let emailRegex = new RegExp('@gmail.com$', 'i');
    if (emailRegex.test(email.value) === false) {
      console.log('email değil');

      email.setCustomValidity('NOT a gmail address'); // set in property
      // so custom error: true
      email.reportValidity(); // show the custom message, also trigger invalid listener
      console.log(email.validity);
    } else {
      console.log('else');
      email.setCustomValidity('');
      span.textContent = '';
    }
  }
});

email.addEventListener('invalid', function () {
  span.textContent = 'Entered value needs to be a gmail address.';
});

form.addEventListener('submit', function (event) {
  let emailCheck = email.checkValidity();

  if (!emailCheck) {
    showError();
    event.preventDefault(); // prevent the form from being sent
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty, display the following error message.

    span.textContent = 'You need to enter an e-mail address.';
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address, display the following error message.

    span.textContent = 'Entered value needs to be a gmail address.';
  }
}

console.log(country.validity);
