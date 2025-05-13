import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  
  console.log("User:", user); // Debugging user value

  return (
    <div className=''>
      <Navbar activeMenu={activeMenu} />

      {/* Only show layout if user is logged in */}
      {user ? (
        <div className='flex'>
          <div className=' block max-[1080px]:hidden'>
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className='grow mx-5 bg-bl'>
            {children} {/* Content area */}
          </div>
        </div>
      ) : (
        <div className="text-center p-5">
          <h2>Please log in to access the dashboard.</h2> {/* Fallback message if no user */}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;


