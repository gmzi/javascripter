// Event delegation
const listListener = document.querySelector('#listen-list');
const item = document.querySelectorAll('.listen-item');
const addForm = document.querySelector('#add');
const newFrName = document.querySelector('input[name="friend-name"]');
// EVENT DELEGATION:
listListener.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove();
  } else if (e.target.tagName === 'LI') {
    e.target.classList.add('best-friend');
    // ADD star:
    const newSpan = document.createElement('span');
    newSpan.innerHTML = '&#9733;';
    e.target.prepend(newSpan);
    // REMOVE star:
  } else if (e.target.tagName === 'SPAN') {
    e.target.remove();
  }
});

// add item to list:
addForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newFriend = document.createElement('li');
  newFriend.classList += 'listen-item';
  newFriend.innerText = newFrName.value;
  newFrName.value = '';
  const newBtn = document.createElement('button');
  newBtn.innerText = 'Remove Item';
  newFriend.append(newBtn);
  listListener.append(newFriend);
});
// remove friend:
const friendsLi = document.querySelectorAll('.multiple li');
const unfriendBtn = document.querySelectorAll('.friends-list button');

for (let btn of unfriendBtn) {
  btn.addEventListener('click', function (e) {
    e.target.parentElement.remove();
    console.log(unfriendBtn);
  });
}

// add friend:
const form = document.querySelector('#more-friend');
const input = document.querySelector('input[name="friend-name1"]');
const friendList = document.querySelector('.friends-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const newFriend = document.createElement('li');
  newFriend.classList = 'friend';
  newFriend.innerText = input.value;
  input.value = ''; // clears the form
  const newBtn = document.createElement('button');
  newBtn.innerText = 'UnFriend';
  // add eventListener to the new button, so it works like the other buttons:
  newBtn.addEventListener('click', function (e) {
    e.target.parentElement.remove();
  });
  newFriend.append(newBtn);
  friendList.append(newFriend);
  console.log(newBtn);
});
