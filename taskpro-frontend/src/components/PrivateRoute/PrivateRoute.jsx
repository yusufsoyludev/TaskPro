import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
} from '../../features/auth/authSelectors';

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);

  if (isRefreshing || token) {
    return children;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}