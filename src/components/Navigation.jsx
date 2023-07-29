import React from 'react';
import { MdLeaderboard, MdLogin, MdLogout } from 'react-icons/md';
import { GoCommentDiscussion } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authSlice';

const Navigation = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div
        id="navigation"
        className="sticky bottom-0 z-10 w-full py-2 flex justify-evenly items-center border border-gray-300 bg-white"
      >
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <GoCommentDiscussion />
          <p>Threads</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate('/leaderboards')}
        >
          <MdLeaderboard />
          <p>Leaderboards</p>
        </div>
        {isLoggedIn ? (
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            <MdLogout />
            <p id="logout">Logout</p>
          </div>
        ) : (
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <MdLogin />
            <p>Login</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
