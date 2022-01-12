import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const presentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        // Pass the values of the managed components to the external handler
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    // After loading the current user from the API
    // their data will be used in managed components.
    React.useEffect(() =>{
        setName(presentUser.name);
        setDescription(presentUser.about);
    }, [presentUser, props.isOpen])

    return(
        <PopupWithForm
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        name={`profileForm`}
        title={`Edit Profile`}
        buttonText={`Save`}
        onClose={props.onClose}
    >
        <input
          id="profile-name" 
          type="text" 
          className="form__input form__input_type_name"
          name="username"
          placeholder="Name" 
          minLength={4}
          maxLength={40}
          onChange={handleNameChange}
          value={name || ''}
          required
        />
        <span id="profile-name-error" className="modal__error"></span>

        <input 
          id="profile-title" 
          type="text" 
          className="form__input form__input_type_title"
          name="title" 
          placeholder="Description" 
          minLength={2} 
          maxLength={200}
          onChange={handleDescription}
          value={description || ''}
          required
        />
        <span id="profile-title-error" className="modal__error"></span>
    </PopupWithForm> 
    );
}

export default EditProfilePopup;