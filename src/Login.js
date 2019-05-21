import React, {useCallback , useContext} from "react";
import {withRouter, Redirect, Route } from "react-router";
import app from "./base";
import {AuthContext} from "./Auth";
import { async } from "q";

const Login = ({history}) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password } = event.target.elements;
            try{
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value,password.value);
                    history.push("/");
            } catch (error){
                alert(error);
            }
        },
        [history]
    );

    const redirectSignUp = () => {
       history.push("/signup") 
    }
    
    const { currentUser } = useContext(AuthContext);

    if (currentUser){
        return <Redirect to="/" />;
    }

    return(
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email 
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password  
                    <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Log In</button>
            </form>
            <button onClick={redirectSignUp}>Sign UP</button>
        </div>
    );
};

export default withRouter(Login);