const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => res.send('Hello World!'))

const count = 0
app.get('/count', (req, res) => count++ && res.send({ count }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
