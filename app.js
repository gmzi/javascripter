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
