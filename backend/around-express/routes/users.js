const { celebrate, Joi } = require('celebrate');
const userRoute = require('express').Router();

const {
  getUsers, getUserId, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRoute.get('/', getUsers);

userRoute.get('/me', getCurrentUser);

userRoute.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserId);

userRoute.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

userRoute.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required,
  }),
}), updateAvatar);

module.exports = userRoute;
