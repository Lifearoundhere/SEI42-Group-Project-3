const mongoose = require('mongoose')
const requiredMsg = 'Please provide a {PATH} of your dish.'
const requiredMsgVowel = 'Please provide an {PATH} of your dish.'

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'Please tell us a bit more.',
    minlength: 20
  },
  mostHelpful: { type: Number }
})

const ratingSchema = new mongoose.Schema({
  overall: {
    type: Number,
    min: 1,
    max: 5,
    required: requiredMsg
  },
  fullness: {
    type: Number,
    min: 1,
    max: 5,
    required: requiredMsg
  },
  healthiness: {
    type: Number,
    min: 1,
    max: 5,
    required: requiredMsg
  }
})


const dishSchema = new mongoose.Schema({
  name: { type: String, required: requiredMsg},
  nativeName: {type: String},
  price: {type: Number, required: requiredMsg},
  latitude: { type: Number, required: requiredMsg },
  longitude: { type: Number, required: requiredMsg },
  cuisineType: {type: [ String ], required: requiredMsg },
  image: {type: String, required: requiredMsgVowel},
  tags: [ String ],
  comments: [commentSchema],
  ratings: [ratingSchema]
})

module.exports = mongoose.model('Dish', dishSchema)
