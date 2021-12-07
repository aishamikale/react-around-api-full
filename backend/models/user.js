const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Please enter a valid URL',
    },
  },
  password: {
    type: String,
    minlength: 8,
    unique: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
    // required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    // required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    // required: true,
    validate: {
      validator: (v) => validator.isURL(v, [{ allow_underscores: true }]),
      message: 'Please enter a valid URL',
    },
  },
});

// check emails and passwords
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // get the password hash for authentication
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // triggers catch block
        return Promise.reject(new Error('Incorrect password or email'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect password or email'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
