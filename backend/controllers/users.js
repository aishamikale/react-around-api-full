const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
// const BadRequestError = require('../errors/BadRequestError');

const salt = 10;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users === undefined) {
        throw new NotFoundError('Users not found');
      }
      res.status(200).send({ data: users });
    })
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .then((userId) => {
      if (!userId) {
        throw new NotFoundError('User not found');
      } else {
        res.status(200).send(userId);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, salt)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(200).send(user))
    // .catch((err) => res.status(400).send(err));
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secreto',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError('Invalid email or passowrd');
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { name: req.user.name, about: req.user.about },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.user.avatar },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      } else {
        return res.send(user._doc);
      }
    })
    .catch(next);
};
