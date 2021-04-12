const ExpressError = require('./errors');

function mean(values) {
  let result = 0;
  for (let num of values) {
    result += num;
  }
  return result / values.length;
}

function median(values) {
  if (values.length === 0) return 0;

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

function mode(values) {
  const count = {};

  values.forEach((e) => {
    if (!(e in count)) {
      count[e] = 0;
    }

    count[e]++;
  });

  let bestElement;
  let bestCount = 0;

  Object.entries(count).forEach(([k, v]) => {
    if (v > bestCount) {
      bestElement = k;
      bestCount = v;
    }
  });

  if (bestElement.includes('.')) {
    return parseFloat(bestElement);
  } else {
    return parseInt(bestElement);
  }
}

function isNum(char) {
  if (parseInt(char)) {
    return true;
  } else {
    message = `'${char}' must be a number`;
    return false;
  }
}

function calculate(operation, req, res) {
  const input = req.query.nums.split(',');
  console.log(input);
  const values = [];
  for (let item of input) {
    if (isNum(item)) {
      console.log('item: ' + item);
      values.push(parseInt(item));
    } else {
      throw new ExpressError(`'${item}' must be a number`, 400);
    }
  }
  const result = operation(values);
  const response = {
    response: {
      operation: operation.name,
      value: operation(values),
    },
  };
  return res.send(response);
}

module.exports = {
  mean: mean,
  median: median,
  mode: mode,
  isNum: isNum,
  calculate: calculate,
};
