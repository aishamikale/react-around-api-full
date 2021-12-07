function PopupWithForm(props) { 
    return ( 
        //popup with form structure 
        <div className={`modal modal_type_${props.name} && ${props.isOpen ? 'modal_open' : ""}`}> 
            <div className="modal__container"> 
            <form action="#" className={`form form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit}> 
                    <h2 className="form__heading">{`${props.title}`}</h2> 
                    {props.children} 
                    <button className="form__button" type="submit">{props.buttonText}</button> 
                </form> 
                <button className="modal__button" type="button" aria-label="close popup" onClick={props.onClose}></button> 
            </div> 
        </div>
    ); 
  } 
 
  export default PopupWithForm; 