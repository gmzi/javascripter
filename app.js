// function changeColor() {
//   nIntervId = setInterval(flashText, 1000);
// }

// function stopTextColor() {
//   clearInterval(nIntervId);
// }

function fuck() {
  console.log("fuck!!!!!");
}

function panic() {
  console.log("The fuck is coming, oh no...");
  intId = setInterval(fuck, 2000);
}

function stopIt() {
  console.log("plaf! enough");
  clearInterval(intId);
}

panic();
// The fuck is coming...
// fuck (by n times)
stopIt();
// plaf! enough (stops fuck)
