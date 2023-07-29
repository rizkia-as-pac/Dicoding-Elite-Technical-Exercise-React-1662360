import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { createThread } from '../redux/threads/threadsSlice';

const AddThread = () => {
  const titleRef = React.useRef();
  const categoryRef = React.useRef();
  const descriptionRef = React.useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: titleRef.current?.value,
      category: categoryRef.current?.value,
      body: descriptionRef.current?.innerHTML,
    };

    dispatch(createThread(data)).then(() => navigate('/'));
  };

  React.useEffect(() => {
    document.title = 'Add Thread';
  }, []);

  return (
    <form
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input innerRef={titleRef} label='Title' />
      <Input innerRef={categoryRef} label='Category' type='text' />
      <Textarea innerRef={descriptionRef} label='Description' />
      <div className='flex items-center justify-between'>
        <Button text='Add Thread' type='submit' />
      </div>
    </form>
  );
};

export default AddThread;
