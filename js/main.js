// elements to work with
const btn = document.querySelector('.btn');
const input = document.querySelector('#username');
let list = document.querySelector('.listName');

// variables to work with
const url = 'https://api.github.com/users/';

// function to paint data on page
const paintNameOnPage = name => {
  const arrayName = name.substr(0, name.indexOf(' ')).split('');
  list.innerHTML = '';
  for (const char of arrayName) {
    list.innerHTML += `<li>${char}</li>`;
  }
};

// function to fetch user data
const getUserData = () => {
  fetch(`${url + input.value}`)
    .then(data => data.json())
    .then(result => {
      console.log(result);
      paintNameOnPage(result.name);
    })
    .catch(error => console.log('error', error));
};

// event listener
btn.addEventListener('click', getUserData);
