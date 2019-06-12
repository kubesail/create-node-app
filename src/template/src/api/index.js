const express = require('express')
const app = express()
const port = 4000

let count = 0
app.get('/api/count', (req, res) => res.send({ count }))
app.post('/api/count/increment', (req, res) => {
  count++
  res.send({ count })
})

app.post('/api/count/decrement', (req, res) => {
  count--
  res.send({ count })
})

app.listen(port, () => console.log(`Example backend API listening on port ${port}!`))
