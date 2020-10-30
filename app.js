const h1 = document.querySelector("h1");
h1.innerText = "new texto";
const caps = h1.innerText.toUpperCase();
h1.innerText = caps;
console.log(h1);

h1.textContent = "changed again";

const craigsList = document.querySelector(".craigs-list.first ol");
console.log(craigsList.innerHTML);
// add item to craigsList:
craigsList.innerHTML += "<li class='new-item'>New item</li>";
console.log(craigsList.innerHTML);
h1.style.color = "blue";
h1.style.backgroundColor = "orange";

const craigsItem = document.querySelectorAll(".craigs-list li");
for (let listItem of craigsItem) {
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

// TODO LIST
const todoItems = document.querySelectorAll(".todo-item");
const todoTitle = document.querySelector(".todo-title");
for (let item of todoItems) {
  item.addEventListener("click", function () {
    item.classList.toggle("completed");
  });
}

function toggleAllTodos() {
  for (let item of todoItems) {
    item.classList.toggle("completed");
  }
}
toggleAllTodos();
