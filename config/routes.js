const router = require('express').Router()
const dishesController = require('../controllers/dishes')
const usersController = require('../controllers/users')
const authController = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')
// Don't forget to add...



// Defining the get request for homepage
router.get('/', (req, res) => {
  res.json({message: 'Hi Everybody'})
})

// Dishes index and show
router.route('/dishes')
  .get(dishesController.index)
  .post(secureRoute, dishesController.create)

// Dishes SHOW, UPDATE & DELETE
router.route('/dishes/:id')
  .get(dishesController.show)
  .put(secureRoute, dishesController.update)
  .delete(secureRoute, dishesController.delete)

router.route('/users')
  .get(usersController.index)

router.route('/users/:id')
  .get(usersController.show)

// We need to add comments and secureRoute inside comments


// REGISTER & LOGIN
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
