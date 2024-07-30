import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { ADMIN_CONTESTS, PRACTICE_EXERCISES } from '../constants/routes';

const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  return !user ? <Outlet />  : user?.role === 'ROLE_USER' ? <Navigate to={PRACTICE_EXERCISES}/> : <Navigate to={ADMIN_CONTESTS}/>;
};

export default PublicRoute;