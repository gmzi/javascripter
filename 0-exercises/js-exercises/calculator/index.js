const express = require('express');
const { mean, median, mode, isNum, calculate } = require('./calculator');

const app = express();
app.listen();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('landed');
});

app.get('/mean', (req, res) => {
  return calculate(mean, req, res);
});

app.get('/median', (req, res) => {
  return calculate(median, req, res);
});

app.get('/mode', (req, res) => {
  return calculate(mode, req, res);
});

app.listen(3000, function () {
  console.log('server running port 3000');
});
