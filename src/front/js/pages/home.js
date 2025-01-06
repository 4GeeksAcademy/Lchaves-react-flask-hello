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

  console.log("Auth Token on Home Page:", localStorage.getItem("authToken"));

  return (
    <div className="text-center mt-5">
      
      
      

      {}
      <div className="my-4 p-5 bg-primary text-white rounded">
        <h2>Welcome! Please sign up or login</h2>
        <p>
          If you don't have an account, <a href="/signup" className="text-white">Sign Up</a> or <a href="/login" className="text-white">Login</a> to continue.
        </p>
      </div>
    </div>
  );
};
