import React, { useState, useEffect } from 'react';
import './Login.css';
import { API_ENDPOINTS } from '../../constants';
import Popup from '../common/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error: storeError, user, accessToken, isAuthenticated } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // error timer for visual notification
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // success timer for visual notification
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleLoginFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
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
        credentials: 'include', // Important: needed for cookies
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch(loginSuccess({
          user: data.username,
          accessToken: data.access_token
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

  const handleUsernameClick = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ME, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      console.log('User details:', data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <div className="login-container">
      {error && <Popup message={error} type="error" />}
      {successMsg && <Popup message={successMsg} type="success" />}
      {user ? (
        <div className="logged-in-message">
          You are already logged in as{' '}
          <strong
            onClick={handleUsernameClick}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {user}
          </strong>
        </div>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <div className="input-field">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleLoginFieldChange}
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
                onChange={handleLoginFieldChange}
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
