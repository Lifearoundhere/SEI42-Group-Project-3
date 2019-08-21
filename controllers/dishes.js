const Dish = require('../models/Dish')

function indexRoute(req, res, next) {
  // get all the dishes from the database: MONGOOSE
  Dish.find(req.query)
    .then(dishes => res.json(dishes)) // send them as JSON: EXPRESS
    .catch(next)
}

function createRoute(req, res, next) {
  // Add the current user to the req.body so that it will
  // be automatically added to the new dish
  req.body.user = req.currentUser._id

  const dish = new Dish(req.body) // create a new dish: MONGOOSE

  dish.save() // save it in the database: MONGOOSE
    .then(dish => res.status(201).json(dish)) // send it as JSON: EXPRESS
    .catch(next) // send any errors to the error handling middleware
}

function showRoute(req, res, next) {
  // the ID is now on req.params.id
  Dish.findById(req.params.id) // get the dish from the database: MONGOOSE
    .populate({ path: 'user', select: '-email' }) // replace the user ID with the actual user object, and DON'T send the email address...
    .populate({ path: 'comments.user', select: '-email' })
    .then(dish => {
      if(!dish) return res.sendStatus(404) // return a 404: EXPRESS

      return res.json(dish) // send it as JSON: EXPRESS
    })
    .catch(next)
}

function updateRoute(req, res, next) {
  Dish.findById(req.params.id) // get the dish from the database: MONGOOSE
    .then(dish => {
      if(!dish) return res.sendStatus(404) // return a 404: EXPRESS
      return dish.set(req.body) // update the dish with the request data
    })
    .then(dish => dish.save()) // save the dish: MONGOOSE
    .then(dish => res.json(dish)) // send the updated dish: EXPRESS
    .catch(next)
}

function deleteRoute(req, res, next) {
  Dish.findById(req.params.id) // get the dish from the database: MONGOOSE
    .then(dish => {
      if(!dish) return res.sendStatus(404) // return a 404: EXPRESS

      return dish.remove() // remove the dish: MONGOOSE
        .then(() => res.sendStatus(204)) // return a 204: EXPRESS
    })
    .catch(next)
}

// POST /dishes/:id/comments
function commentCreateRoute(req, res, next) {

  req.body.user = req.currentUser._id

  Dish.findById(req.params.id)
    .then(dish => {
      if(!dish) return res.sendStatus(404)
      dish.comments.push(req.body)
      return dish.save()
    })
    .then(dish => Dish.populate(dish, 'user comments.user')) // populate the dish AFTER save!
    .then(dish => res.json(dish))
    .catch(next)
}

// // DELETE /dishes/:id/comments/:commentId
// function commentDeleteRoute(req, res, next) {
//   Dish.findById(req.params.id)
//     .then(dish => {
//       if(!dish) return res.sendStatus(404)
//
//       // Find the comment by its ID
//       const comment = dish.comments.id(req.params.commentId)
//       if(!comment) return res.sendStatus(404)
//
//       comment.remove() // remove the comment
//       return dish.save() // save the dish
//     })
//     .then(dish => res.json(dish))
//     .catch(next)
// }
// Features for comments if we need it ...
// commentCreate: commentCreateRoute,
// commentDelete: commentDeleteRoute

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute
}
