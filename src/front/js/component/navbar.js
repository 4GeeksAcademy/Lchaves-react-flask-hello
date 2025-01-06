import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');  // Use sessionStorage to remove token
        navigate('/login');  // Redirect to login after logout
    };

    const isLoggedIn = !!sessionStorage.getItem('authToken');  

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <div className="container">
                <Link to="/" className="navbar-brand">Lchaves205's APP</Link>
                <div className="ml-auto">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/signup">
                                <button className="btn btn-secondary me-2">Signup</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-primary">Login</button>
                            </Link>
                        </>
                    ) : (
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
};
