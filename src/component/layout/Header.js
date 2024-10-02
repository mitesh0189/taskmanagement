import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const handleLogout = (e) => {
    e.preventDefault();
    toast.success('Logged out successfully');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Swiftrut technologies</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              {!token ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup" activeClassName="active">Signup</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <div className="d-flex">
                    <NavLink className="nav-link" to="/form" activeClassName="active">DailyTask</NavLink>
                    <NavLink className="nav-link" to="/view" activeClassName="active">DailyTask View</NavLink>
                    <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
