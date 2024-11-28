import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import './Logout.css';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button 
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
