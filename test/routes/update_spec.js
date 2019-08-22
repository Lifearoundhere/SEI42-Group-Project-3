/* global api, describe, it, expect, beforeEach, afterEach */
const Dish = require('../../models/Dish')
const User = require('../../models/User')
const dishData = require('../../db/data/dishData')
const testUser = require('../../db/data/userData')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testData = {
  name: 'Burger with fries',
  nativeName: 'המבורגר',
  price: 5,
  latitude: 51.515794,
  longitude: -0.073482,
  cuisineType: ['American'],
  tags: ['Deliciuse', 'Great extras'],
  dietary: ['Non-Vegan', 'Very meaty']
}

describe('PUT /dishes/:id', () => {

  let dish = null
  let token = null

  beforeEach(done => {
    Dish.create(dishData)
      .then(dishes => {
        dish = dishes[0]
        return User.create(testUser[0])
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
    api.put(`/api/dishes/${dish._id}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with a token', done => {
    api.put(`/api/dishes/${dish._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/dishes/${dish._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/dishes/${dish._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'nativeName',
          'price',
          'latitude',
          'longitude',
          'cuisineType',
          'tags',
          'dietary'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api.put(`/api/dishes/${dish._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.nativeName).to.eq(testData.nativeName)
        expect(res.body.price).to.eq(testData.price)
        expect(res.body.latitude).to.eq(testData.latitude)
        expect(res.body.longitude).to.eq(testData.longitude)
        expect(res.body.cuisineType).to.deep.eq(testData.cuisineType)
        expect(res.body.tags).to.deep.eq(testData.tags)
        expect(res.body.dietary).to.deep.eq(testData.dietary)
        done()
      })
  })
})
