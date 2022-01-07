function ImagePopup({ card, name, isOpen, onClose }) {
    return(
        <div className={`modal modal_type_${name} && ${isOpen ? 'modal_open' : ""}`}>
            <div className="modal__image-container">
                <button className="modal__button modal__image-button" type="button" aria-label="close popup" onClick={onClose}></button>
                <figure className="modal__figure">
                    <img src={card.link} alt="Place" className="modal__image"/>
                    <figcaption className="modal__image-title">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;