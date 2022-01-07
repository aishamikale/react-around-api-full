import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  //subscribe to the user context
  const currentUser = React.useContext(CurrentUserContext);

  //check if card id matches my id
  const isOwn = card.owner._id === currentUser._id;

  //if my id does not, hide delete button
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button' : 'card__delete-button_hidden'}`
  );

  //check if user liked card
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button card__like_button_active' : 'card__like_button'}`
  )

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="card">
      <div className="card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick} />
      <div className="card__info-container">
        <h2 className="card__title">{card.name}</h2>
        <button className={cardDeleteButtonClassName} type="button" aria-label="delete photo" onClick={handleDeleteClick}></button>
        <div className="card__button-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="like photo"></button>
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;