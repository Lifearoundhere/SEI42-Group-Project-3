const router = require('express').Router()
const dishesController = require('../controllers/dishes')
const authController = require('../controllers/auth')
// const secureRoute = require('../lib/secureRoute')
// Don't forget to add...



// Defining the get request for homepage
router.get('/', (req, res) => {
  res.json({message: 'Hi Everybody'})
})

// Dishes index and show
// Need to add secureRoute feature to create
router.route('/dishes')
  .get(dishesController.index)
  .post(dishesController.create)

// Dishes SHOW, UPDATE & DELETE
// Need to add secureRoute features to update and delete
router.route('/dishes/:id')
  .get(dishesController.show)
  .put(dishesController.update)
  .delete(dishesController.delete)

// REGISTER & LOGIN
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
