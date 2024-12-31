// src/components/Private.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Welcome to the Private Section!</div>;
};

export default Private;
