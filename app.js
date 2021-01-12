const { render } = require('./lib/render')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

app.use(express.static('files'))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/render', (req, res) => {
    res.send(`<pre>\n${render(req)}\n</pre>`)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
