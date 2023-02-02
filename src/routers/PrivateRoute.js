import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthProvider';


const PrivateRoute = ({ children }) => {

  const { user, userLoading } = useAuth();
  const location = useLocation();

  if (userLoading) {
    return <Loading></Loading>
  }

  if (user && user.uid) {
    return children;
  }

  return <Navigate to='/' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;