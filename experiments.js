const goodGreeter = {
  msg: 'I like chicken',
  sayHi() {
    alert(this.msg);
    console.log(this);
  },

  // Arrow function to leave "this" unchanged:
  waitAndGreet: function (delay) {
    setTimeout(() => {
      alert(this.msg);
    }, delay);
  },
};

console.log(goodGreeter.waitAndGreet(4000));
