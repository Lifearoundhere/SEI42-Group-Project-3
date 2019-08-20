const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  img: String,
  achievements: [],
  bio: { type: String, maxlength: 150 },
  favfood: []


}, {
  toJson: {
    transform(doc, json) {
      //removing the password when converting the user to json
      delete json.password
      delete json.__v
      return json
    }
  }
})

//defining a virtual password confirmation field
userSchema.virtual('passwordConfirmation')
  .set(function
  setPassConfirmation(plaintext) {
    //remember the underscore denotes a virtual field
    this._passwordConfirmation = plaintext
  })


//pre validate middleware, checking this password confirmation matches
userSchema.pre('save', function
checkPassword(next){
  if(this.isModified('password') &&
  this._passwordConfirmation !== this.password) {
    //invalidate the data
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

//hashing password pre-save
userSchema.pre('save', function
hashPassword(next) {

  if(this.isModified('password')) {
    //hashing with 8 rounds of salt
    this.password =
    bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }
  next()
})
//adding validatepassword method

userSchema.methods.validatePassword = function
validatePassword(plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

module.exports = mongoose.model('User', userSchema)
