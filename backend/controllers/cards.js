const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Card cannot be created');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card cannot be deleted');
      }
      if (req.user._id.toString() !== card.owner.toString()) {
        throw new UnauthorizedError('You do not have permission to delete card');
      }
      return Card.remove(card).then(() => {
        res.send({ data: card });
      });
    })
    .catch((err) => {
      next(err, BadRequestError);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      next(err, BadRequestError);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      next(err, BadRequestError);
    });
};
