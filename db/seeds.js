const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Dish = require('../models/Dish')
const User = require('../models/User')
const dishData = require('./data/dishData')
const userData = require('./data/userData')
const { dbURI } = require('../config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => User.create(userData))
  .then(userData => {
    const dishDataWithUser = dishData.map(data => {
      data.user = userData[0]
      data.comments.map(comment => {
        comment.user = userData[0]
      })
      return data
    })
    return Dish.create(dishDataWithUser)
  })
  .then(() => console.log('The seeds are here!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
