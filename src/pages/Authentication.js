import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { useAuth } from '../contexts/AuthProvider';

const Authentication = () => {

  const { user } = useAuth();

  if (user) {
    return (
      <>
        <h1 className="text-2xl font-bold mb-3">Welcome to the dashboard</h1>
        <p>You can do the CRUD operation from here. Please visit other routs.</p>
      </>
    );
  }


  return (
    <div className='container pt-[40px] lg:pt-[80px]'>
      <h1 className="text-3xl font-bold text-center mb-10">Simple Student CRUD APP</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div>
          <Login></Login>
        </div>
        <div>
          <Register></Register>
        </div>
      </div>
    </div>
  );
};

export default Authentication;