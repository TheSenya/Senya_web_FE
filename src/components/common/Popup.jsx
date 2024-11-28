import React from 'react';
import './Popup.css';

const Popup = ({ message, type }) => {
  return (
    <div className={`popup ${type}`}>
      <div className="popup-content">
        {message}
      </div>
    </div>
  );
};

export default Popup; 