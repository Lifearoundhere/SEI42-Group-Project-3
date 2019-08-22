/* global api, describe, it, expect, afterEach, beforeEach */
const Dish = require('../../models/Dish')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testUser = require('../../db/data/userData')
const testData = {
  name: 'Burger with fries',
  nativeName: 'Hamburger',
  price: 5,
  latitude: 51.515794,
  longitude: -0.073482,
  cuisineType: ['American'],
  tags: ['Burger', 'Beef'],
  image: ['https://i.imgur.com/mr1pbCi.jpg', 'https://i.imgur.com/OK1u0FO.jpg'],
  comments: [{
    content: 'This is a great Burger with some extras as egg or bacon. I enjoy it.',
    mostHelpful: 3,
    overall: 4,
    fullness: 3,
    healthiness: 5
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mostHelpful: 3,
    overall: 1,
    fullness: 2,
    healthiness: 4
  }],
  dietary: ['Fish and shellfish']
}

describe('POST /dishes', () => {

  let token = null

  beforeEach(done => {
    User.create(testUser[0])
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
          'dietary'
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
        expect(res.body.nativeName).to.eq(testData.nativeName)
        expect(res.body.price).to.eq(testData.price)
        expect(res.body.latitude).to.eq(testData.latitude)
        expect(res.body.longitude).to.eq(testData.longitude)
        expect(res.body.cuisineType).to.deep.eq(testData.cuisineType)
        expect(res.body.tags).to.deep.eq(testData.tags)
        expect(res.body.image).to.deep.eq(testData.image)
        expect(res.body.dietary).to.deep.eq(testData.dietary)

        done()
      })
  })
})
