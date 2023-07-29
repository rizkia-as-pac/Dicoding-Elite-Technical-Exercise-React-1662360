import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className='py-3 px-5 bg-slate-200'>
      <h1 className='text-lg font-semibold' onClick={() => navigate('/')}>
        Threads App
      </h1>
    </nav>
  );
};

export default Navbar;
