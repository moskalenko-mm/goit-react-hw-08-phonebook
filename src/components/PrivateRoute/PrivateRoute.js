import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/selector';

const PrivateRoute = ({ children }) => {
  const IsLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  return IsLoggedIn ? children : <Navigate to="/" state={location} />;
};

export default PrivateRoute;
