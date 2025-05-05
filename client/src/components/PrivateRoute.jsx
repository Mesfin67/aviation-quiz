import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  if (!auth.user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
