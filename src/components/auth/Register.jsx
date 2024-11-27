import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { API_ENDPOINTS } from '../../constants';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && formData.username && formData.password && formData.confirmPassword) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="register-container" onKeyDown={handleKeyDown}>
      <div className="register-form-container">
        <h2 className="register-title">Create Account</h2>
        
        {error && <p className="error-message">{error}</p>}

        <div className="input-container">
          <input
            id="username"
            name="username"
            type="text"
            required
            placeholder="Username"
            className="form-input"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>  

        <div className="button-container">
          <button onClick={handleSubmit} className="register-button">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
