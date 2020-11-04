// Select the element form document object:
const btnTeal = document.querySelector("#teal");
// assign the property and write the function to be executed:
btnTeal.onclick = function () {
  bodyColor("teal");
};
// callback function:
function bodyColor(color) {
  document.querySelector("body").style.backgroundColor = color;
}

const btnPink = document.querySelector("#pink");

btnPink.addEventListener("mouseover", function () {
  bodyColor("pink");
});

const btnBodyAndTitle = document.querySelector("#body-title");
const title = document.querySelector(".events h2");

btnBodyAndTitle.addEventListener("click", function () {
  bodyColor("yellow");
  title.style.backgroundColor = "blue";
});
