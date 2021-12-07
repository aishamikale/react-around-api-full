import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Login from './Login';

/* takes a component as a prop, as well as any number of
props to pass down to that component */

// capital C with Component because components are capitalized.

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        <Route>
            {/* if loggedIn, render the given component, 
         else Redirect to login page */}
            {
                () => props.loggedIn
                    ? <Component {...props} />
                    : <Redirect to='./signin' />
            }
        </Route>
    )
}

export default ProtectedRoute;




// import React from 'react';
// import { Route, Redirect } from "react-router-dom";

// function ProtectedRoute({ children, loggedIn, ...props }) {
//     return (
//         <Route {...props}>
//             {loggedIn ? children : <Redirect to={'/signup'} />}
//         </Route>
//     )
// }

// export default ProtectedRoute;