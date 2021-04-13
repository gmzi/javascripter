const express = require('express');
const expressError = require('./expressError');
const app = express();
const routes = require('./routes');

app.use(express.json());

//prefix:
app.use('/items', routes);

//routes:

app.get('/', routes);
app.post('/', routes);
app.get('/:name', routes);
app.patch('/:name', routes);
app.delete('/:name', routes);

module.exports = app;
