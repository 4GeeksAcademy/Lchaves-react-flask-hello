import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        fetch('https://vigilant-guide-r4r7g7pwpwjgfwjvw-3001.app.github.dev/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                sessionStorage.setItem("authToken", data.token);  
                console.log('Login successful:', data);
                setErrorMessage('');
                navigate("/private");  
            } else {
                setErrorMessage('Invalid credentials. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            setErrorMessage('Login failed. Please check your credentials.');
        });
    };

    return (
        <div className="container"> 
            <form onSubmit={handleLogin}>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="inputEmail3" 
                            name="email" 
                            value={data.email} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputPassword3" 
                            name="password" 
                            value={data.password} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};
