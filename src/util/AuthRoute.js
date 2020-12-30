import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth.js';

function AuthRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);

    // if we're logged in already, and we try to go to /register or /login, we will be redirected
    return (
        <Route 
            {...rest}
            render={props => 
                user ? <Redirect to="/" /> : <Component {...props}/>
            }
        />
    )
}

export default AuthRoute