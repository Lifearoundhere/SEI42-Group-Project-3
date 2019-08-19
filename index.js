const express = require('express')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'), {
  message: 'Please choose another {PATH}'
})
const router = require('./config/routes')
const { dbURI } = require('./config/environment')


const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true })

app.use(express.json())

app.use('/api', router)

app.listen(4000, () => console.log('Mind the gap on port 4000'))

module.exports = app
