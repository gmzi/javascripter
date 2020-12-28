const switcher = document.querySelector('#switch');

if (localStorage.getItem('darkModeEnabled')) {
  document.body.className = 'dark';
  switcher.checked = true;
}

switcher.addEventListener('click', function (e) {
  // let dark = document.body.classList.add('dark');
  // localStorage.setItem('darkMode', true);
  const { checked } = switcher;
  if (checked) {
    localStorage.setItem('darkModeEnabled', true);
  } else {
    localStorage.removeItem('darkModeEnabled');
  }
  document.body.className = checked ? 'dark' : '';
});
