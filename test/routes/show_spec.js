/* global api, describe, it, expect, beforeEach, afterEach */
const Dish = require('../../models/Dish')
const dishData = require('../../db/data/dishData')

describe('GET /dishes/:id', () => {

  let dish = null

  beforeEach(done => {
    Dish.create(dishData)
      .then(dishes => {
        dish = dishes[0]
        done()
      })
  })

  afterEach(done => {
    Dish.remove({})
      .then(() => done())
  })

  it('should return a 200 response with a token', done => {
    api.get(`/api/dishes/${dish._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/dishes/${dish._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/dishes/${dish._id}`)
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
          'ratings',
          '__v'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get(`/api/dishes/${dish._id}`)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.nativeName).to.be.an('string')
        expect(res.body.price).to.be.an('number')
        expect(res.body.latitude).to.be.a('number')
        expect(res.body.longitude).to.be.a('number')
        expect(res.body.cuisineType).to.be.a('array')
        expect(res.body.tags).to.be.a('array')
        expect(res.body.comments).to.be.a('array')
        expect(res.body.ratings).to.be.a('array')
        done()
      })
  })
})
