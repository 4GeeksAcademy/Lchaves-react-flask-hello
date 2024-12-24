import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [data, setData] = useState({
    email: "",
    username: "",  
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          username: data.username,  
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Signup failed, please try again.");
      } else {
        navigate("/login"); 
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="row mb-3">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Username Field */}
        <div className="row mb-3">
          <label htmlFor="inputUsername" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              name="username"  
              value={data.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="row mb-3">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};
