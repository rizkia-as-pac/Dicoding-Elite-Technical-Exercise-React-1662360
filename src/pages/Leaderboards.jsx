import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderboards } from '../redux/threads/threadsSlice';

const Leaderboards = () => {
  const { leaderboards } = useSelector((state) => state.threads);

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = 'Leaderboards';
    dispatch(getLeaderboards());
  }, [dispatch]);

  return (
    <div className='py-3 px-5 space-y-2'>
      <h2 className='font-semibold'>Klasemen Pengguna Aktif</h2>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between'>
          <p>Pengguna</p>
          <p>Skor</p>
        </div>
        <ul className='flex flex-col gap-3'>
          {leaderboards.map((item, i) => {
            return (
              <li
                className='flex items-center justify-between'
                key={i + 'leaderboards'}
              >
                <div className='flex items-center gap-2'>
                  <img
                    src={item.user.avatar}
                    alt={item.user.name + '-avatar'}
                    className='w-12 rounded-full'
                  />
                  <p>{item.user.name}</p>
                </div>
                <p>{item.score}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboards;
