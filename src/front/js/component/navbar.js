import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    MyApp
                </Link>
                <div className="ml-auto">
                    <Link to="/signup">
                        <button className="btn btn-secondary me-2">Signup</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
