import React from 'react';
import ThreadCard from '../components/ThreadCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  getDetailThread,
  handleDownComment,
  handleDownVotes,
  handleNeutralComment,
  handleNeutralVotes,
  handleUpComment,
  handleUpVotes,
} from '../redux/threads/threadsSlice';
import Comment from '../components/Comment';
import Textarea from '../components/Textarea';
import Button from '../components/Button';

const Detail = () => {
  const params = useParams();
  const { detailThread } = useSelector((state) => state.threads);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const commentRef = React.useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateComment = (e) => {
    e.preventDefault();
    const data = {
      content: commentRef.current?.innerHTML,
    };
    dispatch(createComment({ id: params.id, data: data })).then(() => {
      dispatch(getDetailThread(params.id));
      commentRef.current.innerHTML = '';
    });
  };

  const onUpVotes = () => {
    if (isLoggedIn)
      dispatch(handleUpVotes(params.id)).then(() =>
        dispatch(getDetailThread(params.id))
      );
    else alert('Anda harus login terlebih dahulu.');
  };

  const onDownVotes = () => {
    if (isLoggedIn)
      dispatch(handleDownVotes(params.id)).then(() =>
        dispatch(getDetailThread(params.id))
      );
    else alert('Anda harus login terlebih dahulu.');
  };

  const onNeutralVotes = () => {
    if (isLoggedIn)
      dispatch(handleNeutralVotes(params.id)).then(() =>
        dispatch(getDetailThread(params.id))
      );
    else alert('Anda harus login terlebih dahulu.');
  };

  const onUpComment = (id) => {
    if (isLoggedIn)
      dispatch(handleUpComment({ threadId: params.id, commentId: id })).then(
        () => dispatch(getDetailThread(params.id))
      );
    else alert('Anda harus login terlebih dahulu.');
  };

  const onDownComment = (id) => {
    if (isLoggedIn)
      dispatch(handleDownComment({ threadId: params.id, commentId: id })).then(
        () => dispatch(getDetailThread(params.id))
      );
    else alert('Anda harus login terlebih dahulu.');
  };

  const onNeutralComment = (id) => {
    if (isLoggedIn)
      dispatch(
        handleNeutralComment({ threadId: params.id, commentId: id })
      ).then(() => dispatch(getDetailThread(params.id)));
    else alert('Anda harus login terlebih dahulu.');
  };

  React.useEffect(() => {
    document.title = 'Detail';
    dispatch(getDetailThread(params.id));
  }, [params.id, dispatch]);

  return (
    <>
      {detailThread ? (
        <section className='py-4 px-5 space-y-6'>
          <ThreadCard
            data={detailThread}
            handleUpVotes={onUpVotes}
            handleDownVotes={onDownVotes}
            handleNeutralVotes={onNeutralVotes}
          />
        </section>
      ) : (
        ''
      )}

      <section className='py-4 px-5 space-y-2'>
        <form
          className='flex flex-col gap-4'
          onSubmit={(e) => onCreateComment(e)}
        >
          <h3 className='font-medium'>Beri Komentar</h3>
          {isLoggedIn ? (
            <>
              <Textarea innerRef={commentRef} />
              <Button text='Submit Comment' type='submit' />
            </>
          ) : (
            <p className='text-sm'>
              <span
                className='font-medium underline'
                onClick={() => navigate('/login')}
              >
                Login
              </span>{' '}
              untuk memberi komentar
            </p>
          )}
        </form>
        {detailThread && (
          <div className='flex flex-col gap-4'>
            <h3>Komentar ({detailThread.comments.length})</h3>
            {detailThread.comments.map((item, i) => {
              return (
                <Comment
                  data={item}
                  key={i + 'comment'}
                  handleUpComment={onUpComment}
                  handleDownComment={onDownComment}
                  handleNeutralComment={onNeutralComment}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default Detail;
