import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../auth/Login';
import Logout from '../auth/Logout';
import './Navbar.css';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated ?? false);

  return (
    <nav>
      <div className="nav-left">
        <div className="home-link-container">
          <Link to="/">Home</Link>
        </div>
        <div className="home-link-container">
          <Link to="/about">About</Link>
        </div>
        <div className="home-link-container">
          <Link to="/gym">Gym</Link>
        </div>
      </div>
      <div className="nav-right">
        <Login />
        {isAuthenticated 
          ? <Logout /> 
          : (<div className="register-link-container">
              <Link to="/register">Register</Link>
            </div>)
        }
      </div>
    </nav>
  );
};

export default Navbar;