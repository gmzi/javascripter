const express = require('express');
const app = express()
cons nunjucks = require('nunjucks')

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.get('/', (req, res, next) => {
    res.render("index.html")
}) 