import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"

import { CredentialsContext } from "../App"

export const handleErrors = async (response) => {
    if (!response.ok) {
        const {message} = await response.json();
        console.log('message', message)
        throw Error(message);
    }
    return response.json();
}

export default function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setCredentials] = useContext(CredentialsContext);

    const register = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/register`, {
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
        <form onSubmit={register}>
            <h1>Register Here!</h1>
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
            <button type="submit">Register</button>
        </form>
    </div>
    )
}