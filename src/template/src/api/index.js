const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
app.use(cors())

let count = 0
app.get('/count', (req, res) => res.send({ count }))
app.post('/count/increment', (req, res) => {
  count++
  res.send({ count })
})

app.post('/count/decrement', (req, res) => {
  count--
  res.send({ count })
})

app.listen(port, () => console.log(`Example API app listening on port ${port}!`))
