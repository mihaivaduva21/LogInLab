import React, {useCallback , useContext} from "react";
import {withRouter, Redirect, Route } from "react-router";
import app, { provider } from "./base";
import {AuthContext} from "./Auth";
import { async } from "q";
import './App.css';
import {Form} from 'react-bootstrap';

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


    const handleLoginWithFb = useCallback(
        async event => {
            try{
                await app
                    .auth()
                    .signInWithPopup(provider);
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
        <div className="centered">
            <div className="row">

            <h1>Log In</h1>
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

            <div className="block">
                <button onClick= {handleLoginWithFb}>
                    Log In With Facebook
                </button>
            </div>   
            </div>
        </div>
        
        
    );
};

export default withRouter(Login);