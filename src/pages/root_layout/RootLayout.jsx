import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './RootLayout.css';
import Navbar from '../../components/navbar/Navbar';
import FooterBar from '../../components/footer/FooterBar';

const RootLayout = () => {
  return (
    <div className="root-container">
      <header className="header">
        <Navbar />
      </header>

      <main className="main-content">
        <Outlet />
      </main>
      <FooterBar />
    </div>
  );
};

export default RootLayout; 