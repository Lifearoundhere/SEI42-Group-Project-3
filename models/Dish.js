const mongoose = require('mongoose')
const requiredMsg = 'Please provide a {PATH} of your dish.'
// const requiredMsgVowel = 'Please provide an {PATH} of your dish.'

const ratingSchema = new mongoose.Schema({
  overall: {
    type: Number,
    min: 1,
    max: 5

  },
  fullness: {
    type: Number,
    min: 1,
    max: 5
  },
  healthiness: {
    type: Number,
    min: 1,
    max: 5
  }
})
const commentSchema = new mongoose.Schema({
  user: {type: String},
  // { type: mongoose.Schema.ObjectId, ref: 'User'}
  content: {
    type: String,
    minlength: 20
  },
  ratings: [ratingSchema],
  mostHelpful: { type: Number }
},{
  timestamps: true
})



const dishSchema = new mongoose.Schema({
  name: { type: String, required: requiredMsg},
  nativeName: {type: String},
  price: {type: Number, required: requiredMsg},
  latitude: { type: Number},
  longitude: { type: Number},
  cuisineType: {type: [ String ], required: requiredMsg },
  image: {type: [ String ] },
  tags: [ String ],
  comments: [commentSchema]
})

module.exports = mongoose.model('Dish', dishSchema)
