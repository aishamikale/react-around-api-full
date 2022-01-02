const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const { celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), auth, createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), auth, login);

// middleware authrization
// app.use(auth);

app.use('/users', users);
app.use('/cards', cards);

app.use(errorLogger);

// centralized error handler

app.get('*', () => {
  throw new NotFoundError('Requested Resource Not Found');
});

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   res
//     .status(statusCode)
//     .send({
//       message: statusCode === 500
//         ? 'An error occurred on the server'
//         : message,
//     });
//   next();
// });

app.listen(PORT, () => {
  console.log('Server started on port' + PORT);
});
