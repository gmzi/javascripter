const express = require('express');
const ExpressError = require('./expressError');
const routes = new express.Router();
const items = require('./fakeDb');

routes.get('/', function (req, res) {
  return res.send(items);
});

routes.post('/', function (req, res) {
  const newItem = req.body;
  items.push(newItem);
  const response = {
    added: {
      name: req.body.name,
      price: req.body.price,
    },
  };
  return res.send(response);
});

routes.get('/:name', function (req, res) {
  const idx = items.findIndex((u) => u.name === req.params.name);
  return res.send(items[idx]);
});

routes.patch('/:name', function (req, res) {
  const idx = items.findIndex((u) => u.name === req.params.name);
  if (idx === -1) {
    throw new ExpressError('Item not found', 404);
  }
  items[idx].name = req.body.name;
  items[idx].price = req.body.price;
  const response = {
    updated: {
      name: items[idx].name,
      price: items[idx].price,
    },
  };
  return res.send(response);
});

routes.delete('/:name', function (req, res) {
  const idx = items.findIndex((u) => u.name === req.params.name);
  if (idx === -1) {
    throw new ExpressError('Item not found', 404);
  }
  items.splice(items[idx], 1);
  console.log(items);
  return res.json({ message: 'Deleted' });
});

module.exports = routes;
