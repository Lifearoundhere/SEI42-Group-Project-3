const mongoose = require('mongoose')
const requireInSchema = 'Please provide a {PATH} of your dish.'
const requireInSchemaAEIOU = 'Please provide an {PATH} of your dish.'

const commentSchema = new mongoose.Schema({
  content: { type: String, required: 'Please tell us a bit more.', minlength: 20}
})


const dishSchema = new mongoose.Schema({
  name: { type: String, required: requireInSchema},
  nativeName: {type: String},
  price: {type: Number, required: requireInSchema},
  latitude: { type: Number, required: requireInSchema },
  longitude: { type: Number, required: requireInSchema },
  cuisineType: {type: String, required: requireInSchema },
  image: {type: String, required: requireInSchemaAEIOU},
  tags: [ String ],
  comments: [ commentSchema ],
  rating: { type: Number, min: 1, max: 5, required: requireInSchema}
})

module.exports = mongoose.model('Dish', dishSchema)
