import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import userIcon from '../assets/user.svg';
import listIcon from '../assets/list.svg';
import logoutIcon from '../assets/logout.svg';
import { useAuth } from '../contexts/AuthProvider';


const Dash = () => {

  const { userLogout } = useAuth();

  return (
    <div className='flex'>

      <div className='w-64'>
        <ul className="menu p-2 rounded-box">
          <li>
            <NavLink to='/add-student'>
              <img src={userIcon} alt="" /> Add Students
            </NavLink>
          </li>
          <li>
            <NavLink to='/manage-students'>
              <img src={listIcon} alt="" /> Manage Students
            </NavLink>
          </li>
          <li>
            <button onClick={() => userLogout()}>
              <img src={logoutIcon} alt="" /> Logout
            </button>
          </li>
        </ul>
      </div>

      <div className='basis-full pl-2 pr-5'>
        <Outlet></Outlet>
      </div>

    </div>
  );
};

export default Dash;