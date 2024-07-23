import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  return !user ? <Outlet />  : user?.role === 'ROLE_USER' ? <Navigate to="/contests"/> : <Navigate to={`/admin/contests`}/>;
};

export default PublicRoute;