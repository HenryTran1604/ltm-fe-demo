import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  return user.role === 'ROLE_ADMIN' ? <Outlet />  : <Navigate to="/not-found" />;
};

export default AdminRoute;