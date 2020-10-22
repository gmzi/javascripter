// function getMonthName(mo) {
//   mo = mo - 1;
//   let months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   if (months[mo] !== undefined) {
//     return months[mo];
//   } else {
//     throw new Error("Month out of bounds");
//   }
// }

// console.log(getMonthName(0));
function UserException(message) {
  this.message = message;
  this.name = "UserException";
}

function getMonthName(mo) {
  mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (months[mo] !== undefined) {
    return months[mo];
  } else {
    throw new Error("InvalidMonthNo");
  }
}

console.log(getMonthName(10)); // Oct
console.log(
  getMonthName(1)
); /* Uncaught Error: InvalidMonthNo
at getMonthName (app.js:49)
at app.js:54
getMonthName @ app.js:49
(anonymous) @ app.js:54
*/
