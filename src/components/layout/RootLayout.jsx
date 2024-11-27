import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './RootLayout.css';
import Login from '../auth/Login';

const RootLayout = () => {
  return (
    <div className="root-container">
      <header className="header">
        <nav>
          <div className="home-link-container">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-right">
            <Login />
            <div className="register-link-container">
              <Link to="/register">Register</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2024 Senya. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RootLayout; 