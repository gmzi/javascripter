const form = document.querySelector('#logo-form');
const name = document.querySelector('input[name="name"]');
const color = document.querySelector('input[name="color"]');
const size = document.querySelector('input[name="size"]');
const result = document.querySelector('#result');

form.addEventListener('submit', function (e) {
  console.log(size.value);
  e.preventDefault();
  result.innerText = name.value;
  result.style.color = color.value;
  result.style.fontSize = `${size.value}px`;
});

size.addEventListener('mousemove', function () {
  result.style.fontSize = `${size.value}px`;
});
