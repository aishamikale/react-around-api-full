import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        // Pass the values of the managed components to the external handler
        props.onAddPlace({
          name,
          link
        });

        setName('');
        setLink('');
      }

    return(
        <PopupWithForm 
            isOpen={props.isOpen} 
            name={`cardForm`} 
            title={`New place`} 
            buttonText={`Create`}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        > 
            <input
              id="card-title"  
              type="text"  
              className="form__input form__input_type_card-title"  
              name="place"  
              placeholder="Title"  
              minLength={1}  
              maxLength={30}
              value={name}
              onChange={handleNameChange}
              required 
            /> 
            <span id="card-title-error" className="modal__error"></span> 
 
            <input  
              id="card-url"  
              type="url"  
              className="form__input form__input_type_url"  
              name="website"  
              placeholder="Image link"
              value={link}
              onChange={handleLink} 
              required 
            /> 
            <span id="card-url-error" className="modal__error"></span>  
        </PopupWithForm> 
    );
}

export default AddPlacePopup;