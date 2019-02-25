const express = require('express')

const app = express()

let count = 0;
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/count', (req, res) => { console.log('wat'); res.send({ count }) })
app.post('/increment', (req, res) => {
    count += 1;
    res.sendStatus(200);
})

module.exports = app
