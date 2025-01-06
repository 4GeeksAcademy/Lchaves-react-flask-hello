import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken"); 
    if (!token) {
      navigate("/login"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");  
    navigate("/"); 
  };
  
  return (
    <div>
      {}
      <div className="alert alert-info text-center" role="alert">
        Welcome to the Private page. Here you will see your profile details.
      </div>
    </div>
  );
};

export default Private;
