// elements to work with
const btn = document.querySelector('.form__btn');
const input = document.querySelector('.form__input');
let list = document.querySelector('.listName');
let errorMsg = document.querySelector('.errorMsg');

// variables to work with
const url = 'https://api.github.com/users/';

// function to paint data on page
const paintNameOnPage = name => {
  const arrayName = name
    .substr(0, name.indexOf(' '))
    .toUpperCase()
    .split('');
  for (const char of arrayName) {
    list.innerHTML += `<li class="letter">${char}</li>`;
  }
};

const checkUsername = username => {
  if (username) {
    paintNameOnPage(username);
  } else {
    errorMsg.innerHTML = 'The name of the user provided is not available';
    errorMsg.classList.remove('hidden');
  }
};

// function to fetch user data
const githubFetch = value => {
  fetch(`${url + value}`)
    .then(data => data.json())
    .then(result => {
      console.log(result);
      if (result.message === 'Not Found') {
        errorMsg.innerHTML =
          'The username you provided does not exist on github';
        errorMsg.classList.remove('hidden');
      } else {
        checkUsername(result.name);
      }
    })
    .catch(error => console.log('error', error));
};

// function to call when user press the button
const getUserData = () => {
  // hide msg of error and clean list
  errorMsg.classList.add('hidden');
  list.innerHTML = '';

  // fetch user data
  const value = input.value;
  if (value) {
    githubFetch(value);
  } else {
    errorMsg.innerHTML = 'You need to provide a valid github username';
    errorMsg.classList.remove('hidden');
  }
};

// event listener
btn.addEventListener('click', getUserData);
