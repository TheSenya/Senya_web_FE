import React, { useState, useEffect } from 'react';
import './Login.css';
import { API_ENDPOINTS } from '../../constants';
import Popup from '../common/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error: storeError, user, isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    dispatch(loginStart());
    
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch(loginSuccess({
          user: data.username,
          token: data.access_token
        }));
        setSuccessMsg('Login successful! Redirecting...');
        // Handle successful login (e.g., redirect)
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Login failed. Please check your credentials.';
        dispatch(loginFailure(errorMessage));
        setError(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'An error occurred. Please try again later.';
      dispatch(loginFailure(errorMessage));
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      {error && <Popup message={error} type="error" />}
      {successMsg && <Popup message={successMsg} type="success" />}
      
      {user ? (
        <div className="logged-in-message">
          You are already logged in as <strong>{user}</strong>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
