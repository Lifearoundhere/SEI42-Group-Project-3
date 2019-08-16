/* global api, describe, it, expect, afterEach, beforeEach */
const Dish = require('../../models/Dish')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testUser = require('../../db/data/userData')
const dishData = require('../../db/data/dishData')

describe('DELETE /dishes/:id', () => {

  let dish = null
  let token = null

  beforeEach(done => {
    Dish.create(dishData)
      .then(dishes => {
        dish = dishes[0]
        return User.create(testUser)
      })
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })


  afterEach(done => {
    Dish.remove({})
      .then(() => User.remove({}))
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.delete(`/api/dishes/${dish._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/dishes/${dish._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should actually delete the data', done => {
    api.delete(`/api/dishes/${dish._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Dish.findById(dish._id)
          .then(dish => {
            expect(dish).to.not.exist
            done()
          })
      })
  })

})
