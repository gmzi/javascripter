const div1 = document.querySelector(".finder div");

const body = document.querySelector("body");
const button = document.querySelector(".finder button");

button.addEventListener("click", function () {
  button.parentElement.remove();
});

const list = document.querySelector(".finder ul");

const h1 = document.querySelector(".finder h1");
const div2 = document.querySelector(".second-div");

console.log(div2.previousElementSibling.previousElementSibling);
