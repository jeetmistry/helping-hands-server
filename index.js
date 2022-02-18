require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 4000

const connect = require('./config/db')
connect()
const victim = require('./components/routes/victim')
const admin = require('./components/routes/admin')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/authority', require('./components/routes/authority'))
app.use('/victim', victim)
app.use('/admin', admin )


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})