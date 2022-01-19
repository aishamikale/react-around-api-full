const { celebrate, Joi } = require('celebrate');
const cardsRoute = require('express').Router();

const {
  createCard, getCards, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRoute.get('/', getCards);

cardsRoute.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
}), createCard);

cardsRoute.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), removeCard);

cardsRoute.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

cardsRoute.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = cardsRoute;
