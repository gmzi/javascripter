const h1 = document.querySelector("h1");
h1.innerText = "new texto";
const caps = h1.innerText.toUpperCase();
h1.innerText = caps;
console.log(h1);

h1.textContent = "changed again";

const list = document.querySelector(".craigs-list.first ol");
console.log(list.innerHTML);
// add item to list:
list.innerHTML += "<li class='new-item'>New item</li>";
console.log(list.innerHTML);
h1.style.color = "blue";
h1.style.backgroundColor = "orange";

const listItems = document.querySelectorAll("li");
for (let listItem of listItems) {
  listItem.style.color = "red";
}

const inputs = document.querySelectorAll("input");
for (let input of inputs) {
  input.style.backgroundColor = "red";
}

const imgs = document.querySelectorAll("img");
for (let img of imgs) {
  img.style.width = "12rem";
  img.style.border = "1px solid blue";
}

const firstInput = document.querySelector("input");
console.log(firstInput.getAttribute("id")); // text
console.log(document.querySelector("input").getAttribute("type")); // text
console.log(firstInput.getAttribute("placeholder")); // text

for (let img of imgs) {
  console.log(img.getAttribute("src"));
}

const regularQuote = document.querySelector(".regular");
regularQuote.setAttribute("class", "slang");

const slangQuote = document.querySelector(".slang");
slangQuote.setAttribute("class", "slang-modified");

console.log(firstInput.id);
firstInput.id = "new-name";
console.log(firstInput.id);

const nameInput = document.querySelector(".name input");
let inputValue = nameInput.value;
console.log(inputValue);

const range = document.querySelector("input[type='range']");
range.value = 9;
range.value = 1;
