/* global api, describe, it, expect, afterEach, beforeEach */
const Dish = require('../../models/Dish')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testUser = require('../../db/data/userData')
const testData = {
  name: 'Burger with fries',
  nativeName: 'המבורגר',
  price: 5,
  latitude: 51.515794,
  longitude: -0.073482,
  cuisineType: ['American'],
  tags: ['Deliciuse', 'Great extras'],
  image: 'https://i.imgur.com/0VgsdXi.jpg',
  rating: 4
}

describe('POST /dishes', () => {

  let token = null

  beforeEach(done => {
    User.create(testUser)
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
    api.post('/api/dishes')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api.post('/api/dishes')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/dishes')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.post('/api/dishes')
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
          'image',
          'comments',
          'rating',
          '__v'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api.post('/api/dishes')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.nativeName).to.deep.eq(testData.nativeName)
        expect(res.body.price).to.eq(testData.price)
        expect(res.body.latitude).to.eq(testData.latitude)
        expect(res.body.longitude).to.eq(testData.longitude)
        expect(res.body.cuisineType).to.deep.eq(testData.cuisineType)
        expect(res.body.tags).to.deep.eq(testData.tags)
        expect(res.body.rating).to.eq(testData.rating)
        //add comment test!
        done()
      })
  })
})
