import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthProvider';
import Dash from './Dash';

const Main = () => {

  const { user, userLoading } = useAuth();


  if (userLoading) {
    return (
      <Loading></Loading>
    );
  }

  if (user) {
    return (
      <div>
        <Header></Header>
        <Dash></Dash>
      </div>
    );
  }

  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;