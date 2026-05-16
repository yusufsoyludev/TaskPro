import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRoutes from './app/routes';
import { refreshUser } from './features/auth/authOperations';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return <AppRoutes />;
}