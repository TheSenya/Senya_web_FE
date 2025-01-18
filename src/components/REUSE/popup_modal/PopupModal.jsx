import React from 'react';
import './PopupModal.css';

const PopupModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-modal-overlay" onClick={onClose}>
            <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
                <div className="popup-modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="popup-modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PopupModal;
