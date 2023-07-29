import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterThreads,
  getThreads,
  getUsers,
  handleUpVotes,
  handleDownVotes,
  handleNeutralVotes,
  setCategories,
  setCategory,
} from '../redux/threads/threadsSlice';
import ThreadCard from '../components/ThreadCard';
import Category from '../components/Category';

const Home = () => {
  const { threads, filteredThreads, users, categories, selectedCategory } =
    useSelector((state) => state.threads);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findUser = (id) => {
    const user = users.find((user) => user.id === id);

    return user ? user : null;
  };

  const onSelectCategory = (value) => {
    if (selectedCategory !== value) dispatch(setCategory(value));
    else dispatch(setCategory(''));
  };

  const onUpVotes = (id) => {
    if (isLoggedIn)
      dispatch(handleUpVotes(id)).then(() => dispatch(getThreads()));
    else alert('Anda harus login terlebih dahulu.');
  };

  const onDownVotes = (id) => {
    if (isLoggedIn)
      dispatch(handleDownVotes(id)).then(() => dispatch(getThreads()));
    else alert('Anda harus login terlebih dahulu.');
  };

  const onNeutralVotes = (id) => {
    if (isLoggedIn)
      dispatch(handleNeutralVotes(id)).then(() => dispatch(getThreads()));
    else alert('Anda harus login terlebih dahulu.');
  };

  React.useEffect(() => {
    document.title = 'Home';
    dispatch(getThreads());
    dispatch(getUsers());
  }, [dispatch]);

  React.useEffect(() => {
    const data = threads.map((thread) => thread.category);
    dispatch(setCategories([...new Set(data)]));
  }, [threads, dispatch]);

  React.useEffect(() => {
    dispatch(filterThreads());
  }, [selectedCategory, dispatch]);

  return (
    <>
      <section className="py-3 px-5 space-y-2">
        <h2 id="kategori-popular" className="font-medium">
          Kategori Popular
        </h2>
        <div className="flex gap-4 flex-wrap text-sm">
          {categories.map((item, i) => {
            return (
              <Category
                data={item}
                handleSelect={onSelectCategory}
                key={i + 'category'}
              />
            );
          })}
        </div>
      </section>
      <section className="py-4 px-5 space-y-2">
        <h2 className="font-medium">Diskusi Tersedia</h2>
        <div className="flex flex-col gap-6">
          {filteredThreads &&
            filteredThreads.map((item, index) => {
              const owner = findUser(item.ownerId);
              const data = { ...item, owner: owner };

              return (
                <div className="space-y-6" key={index}>
                  <ThreadCard
                    data={data}
                    handleUpVotes={onUpVotes}
                    handleDownVotes={onDownVotes}
                    handleNeutralVotes={onNeutralVotes}
                  />
                  <hr />
                </div>
              );
            })}
        </div>
      </section>
      {isLoggedIn && (
        <div className="fixed md:sticky md:flex md:justify-end md:pr-4 bottom-16 right-4">
          <div
            className="md:w-fit bg-gray-700 text-white text-sm p-2 rounded-full"
            onClick={() => navigate('/thread/new')}
          >
            <BsPlusLg />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
