const User = require('../models/User')

function indexRoute(req, res, next) {
  //get all users from database
  User.find(req.query)
    .select('-password')
    .then(users => res.json(users))
    .catch(next)
}


function showRoute(req, res, next) {
  User.findById(req.params.id)
    .select('-password')
    .then(user => {
      if(!user) return res.sendStatus(404)
      return res.json(user)
    })
    .catch(next)
}

function updateRoute(req, res, next) {
  User.findById(req.params.id) // get the user from the database: MONGOOSE
    .then(user => {
      if(!user) return res.sendStatus(404) // return a 404: EXPRESS
      return user.set(req.body) // update the user with the request data
    })
    .then(user => user.save()) // save the user: MONGOOSE
    .then(user => res.json(user)) // send the updated user: EXPRESS
    .catch(next)
}



module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute
}
