import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './app/routes';
import { refreshUser } from './features/auth/authOperations';
import {
  selectIsLoggedIn,
  selectToken,
  selectUser,
} from './features/auth/authSelectors';

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authUser = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const hasBootstrappedAuth = useRef(false);

  useEffect(() => {
    if (hasBootstrappedAuth.current) {
      return;
    }

    hasBootstrappedAuth.current = true;

    if (!token) {
      return;
    }

    dispatch(refreshUser());
  }, [dispatch, token]);

  const isAuthBootstrapping = Boolean(token) && !authUser && !isLoggedIn;

  if (isAuthBootstrapping) {
    return null;
  }

  return <AppRoutes />;
}
