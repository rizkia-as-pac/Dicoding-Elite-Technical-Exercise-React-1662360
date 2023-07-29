import React from 'react';
import { useSelector } from 'react-redux';
import LoadingSVG from '../static/loading/loading.svg';

const Loading = () => {
  const { isLoading } = useSelector((state) => state.threads);

  return (
    <>
      {isLoading && (
        <div className='fixed w-screen h-screen md:w-[498px] flex z-20'>
          <img src={LoadingSVG} alt='loading' />
        </div>
      )}
    </>
  );
};

export default Loading;
