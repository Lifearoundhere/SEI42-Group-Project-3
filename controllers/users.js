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



module.exports = {
  index: indexRoute,
  show: showRoute
}
