const form = document.querySelector('');
const email = document.querySelector('#email');
const span = document.querySelector('.errMessage');

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
  span.textContent = 'Not a gmail address';
});
