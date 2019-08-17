/* global api, describe, it, expect, beforeEach, afterEach */

const Dish = require('../../models/Dish')
const dishData = require('../../db/data/dishData')

describe('GET /dishes', () => {

  beforeEach(done => {
    Dish.create(dishData)
      .then(() => done())
  })

  afterEach(done => {
    Dish.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/dishes')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/dishes')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/dishes')
      .end((err, res) => {
        res.body.forEach(dish => {
          expect(dish).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/dishes')
      .end((err, res) => {
        res.body.forEach(dish => {
          expect(dish).to.contains.keys([
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
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/dishes')
      .end((err, res) => {
        res.body.forEach(dish => {
          expect(dish._id).to.be.a('string')
          expect(dish.name).to.be.a('string')
          expect(dish.nativeName).to.be.an('string')
          expect(dish.price).to.be.an('number')
          expect(dish.latitude).to.be.a('number')
          expect(dish.longitude).to.be.a('number')
          expect(dish.cuisineType).to.be.a('array')
          expect(dish.tags).to.be.a('array')
          expect(dish.ratings).to.be.a('array')
        })
        done()
      })
  })
})
