import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Navigation from '../components/Navigation';
import { getUser } from '../redux/auth/authSlice';

export const Main = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <div className="relative min-h-screen w-full md:w-[500px] md:mx-auto md:border md:border-gray-400 flex flex-col justify-between">
        <Loading />
        <div>
          <Navbar />
          <Outlet />
        </div>
        <Navigation />
      </div>
    </>
  );
};
