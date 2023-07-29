import React from 'react';
import {
  MdThumbUpOffAlt,
  MdThumbUp,
  MdThumbDownOffAlt,
  MdThumbDown,
} from 'react-icons/md';
import moment from 'moment';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Comment = ({
  data,
  handleUpComment,
  handleDownComment,
  handleNeutralComment,
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <div className='flex gap-4 items-center'>
          <img
            src={data.owner.avatar}
            alt=''
            className='w-12 h-12 rounded-full'
          />
          <p className='font-medium'>{data.owner.name}</p>
        </div>
        <p className='text-sm'>{moment(data.createdAt).fromNow()}</p>
      </div>
      <div
        className='text-sm'
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
      <div className='flex gap-4'>
        <div className='flex gap-1 items-center cursor-pointer'>
          {data.upVotesBy.includes(user && user.id) ? (
            <MdThumbUp onClick={() => handleNeutralComment(data.id)} />
          ) : (
            <MdThumbUpOffAlt onClick={() => handleUpComment(data.id)} />
          )}
          <p>{data.upVotesBy.length}</p>
        </div>
        <div className='flex gap-1 items-center cursor-pointer'>
          {data.downVotesBy.includes(user && user.id) ? (
            <MdThumbDown onClick={() => handleNeutralComment(data.id)} />
          ) : (
            <MdThumbDownOffAlt onClick={() => handleDownComment(data.id)} />
          )}
          <p>{data.downVotesBy.length}</p>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  data: PropTypes.object.isRequired,
  handleUpComment: PropTypes.func.isRequired,
  handleDownComment: PropTypes.func.isRequired,
  handleNeutralComment: PropTypes.func.isRequired,
};

export default Comment;
