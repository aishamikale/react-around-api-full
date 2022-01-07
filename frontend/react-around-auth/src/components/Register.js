import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    // let history = useHistory();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
        // history.push('/signin');
    }

    return (
        <div className="form__container">
            <form className="form" onSubmit={handleSubmit} >
                <h2 className="form__title">Sign Up</h2>
                <input
                    className="form__field"
                    name="email" type="email"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={email}
                />
                <input
                    className="form__field"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handlePassword}
                    value={password} />

                <button className="form__submit" type="submit">Sign Up</button>
                <Link className="form__link" to="/signin">Already a member? Log in here!</Link>
            </form>
        </div>
    )
}

export default Register;