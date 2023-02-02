import React from 'react';
import logo from '../assets/logo.png';
import user2Icon from '../assets/user2.svg';
import { useAuth } from '../contexts/AuthProvider';

const Header = () => {

  const { user } = useAuth();

  return (
    <div className='container pt-6 mb-14'>
      <div className='flex justify-between items-center'>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className='flex space-x-3 border py-4 px-14'>
          <img src={user2Icon} alt="" /> <span>{user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;