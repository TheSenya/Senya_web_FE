import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './RootLayout.css';

const RootLayout = () => {
  return (
    <div className="root-container">
      <header className="header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
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