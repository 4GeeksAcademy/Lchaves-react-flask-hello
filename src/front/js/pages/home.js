import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login"); 
        }
    }, [navigate]);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");  
        navigate("/login"); 
    };

    console.log("Auth Token on Home Page:", localStorage.getItem("authToken"));

    return (
        <div className="text-center mt-5">
            <h1>Hello Rigo!!</h1>
            <p>
                <img src={rigoImageUrl} alt="Rigo" />
            </p>
            <div className="alert alert-info">
                {store.message || "Loading message from the backend..."}
            </div>
            <p>
                This boilerplate comes with lots of documentation:{" "}
                <a href="https://start.4geeksacademy.com/starters/react-flask">
                    Read documentation
                </a>
            </p>

            {}
            {localStorage.getItem("authToken") ? (
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <p>Redirecting to login...</p> 
            )}
        </div>
    );
};
