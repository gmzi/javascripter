const clickMe = document.querySelector(".event-object p");
clickMe.addEventListener("click", function (event) {
  console.log(event);
});
//MouseEvent {isTrusted: true, screenX: 1247, screenY: 155, clientX: 59, clientY: 66, …}

clickMe.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.pageX);
  console.log(event.pageY);
  console.log(event.type);
});

const body = document.querySelector("body");
// body.addEventListener("keypress", function () {
//   body.style.backgroundColor = "teal";
// });

// body.addEventListener("keypress", function (e) {
//   console.log(e.type); // keypress
//   console.log(e.target); // <body style="background-color: teal;>...</body>"
// });

body.addEventListener("keydown", function (e) {
  body.style.backgroundColor = "teal";
  console.log(e.target);
  console.log(e.timeStamp);
});
