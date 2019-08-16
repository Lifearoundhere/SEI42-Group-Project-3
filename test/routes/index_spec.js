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
            'comments',
            'rating'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/dishes')
      .end((err, res) => {
        res.body.forEach(dish => {
          expect(dish.body._id).to.be.a('string')
          expect(dish.body.name).to.be.a('string')
          expect(dish.body.nativeName).to.be.an('string')
          expect(dish.body.price).to.be.an('number')
          expect(dish.body.latitude).to.be.a('number')
          expect(dish.body.longitude).to.be.a('number')
          expect(dish.body.cuisineType).to.be.a('string')
          expect(dish.body.tags).to.be.a('array')
          expect(dish.body.comments).to.be.a('array')
          expect(dish.body.rating).to.be.a('number')
        })
        done()
      })
  })
})
