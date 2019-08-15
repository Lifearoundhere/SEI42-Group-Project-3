const router = require('express').Router()

// defining the get request for homepage
router.get('/', (req, res) => {
  res.json({message: 'Hi Everybody'})
})

//Dishes index and show
router.route('/dishes')
  .get(dishesController.index)
  .post(dishesController.create)

router.route('/dishes/:id')
  .get(dishesController.show)
  .put(dishesController.update)
  .delete(dishesController.delete)


router.post('/register', authCountroller.register)
router.post('/login', authController.login)

module.exports = router
