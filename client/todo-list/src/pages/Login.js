import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"

import { CredentialsContext } from "../App"

import { handleErrors } from "./Register"

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setCredentials] = useContext(CredentialsContext);

    const login = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            })
        })
        .then(handleErrors)
        .then(() =>{
            setCredentials({
                username,
                password
            })
            history.push("/");
        })
        .catch((error) => {
            
            setError(error.message)
        })
        
    };

    const history = useHistory();

    return (
    <div>
        <form onSubmit={login}>
            <h1>Login</h1>
            {error && (<span style={{color: "red"}}>{error}</span>)}
            <br />
            <input 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username">
            </input>
            
            <br />
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password">
            </input>
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
    )
}