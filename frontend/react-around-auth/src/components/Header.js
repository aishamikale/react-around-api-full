import headerPath from '../images/headerlogo.svg';
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img src={headerPath} alt="Around the U.S." className="logo" />
            <div className="header__nav">
                <p className="header__user">{props.userEmail}</p>
                <Link to={props.link} className="header__link" onClick={props.onClick}>{props.text}</Link>
            </div>
        </header>
    );
}

export default Header;