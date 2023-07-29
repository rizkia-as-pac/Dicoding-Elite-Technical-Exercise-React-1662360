import React from 'react';
import {
  MdThumbUpOffAlt,
  MdThumbUp,
  MdThumbDown,
  MdThumbDownOffAlt,
} from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ThreadCard = ({
  data,
  handleUpVotes,
  handleDownVotes,
  handleNeutralVotes,
}) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={data.owner?.avatar}
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col justify-between">
            <p className="font-medium">{data.owner?.name}</p>
            <p className="text-sm italic">#{data.category}</p>
          </div>
        </div>
        <p className="text-sm">{moment(data.createdAt).fromNow()}</p>
      </div>
      <p
        className="font-medium cursor-pointer hover:text-blue-600"
        onClick={() => navigate(`/thread/${data.id}`)}
      >
        {data.title}
      </p>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: data.body }}
      ></div>
      <div className="flex gap-4">
        <div className="flex gap-1 items-center cursor-pointer">
          {data.upVotesBy.includes(user && user.id) ? (
            <MdThumbUp onClick={() => handleNeutralVotes(data.id)} />
          ) : (
            <MdThumbUpOffAlt onClick={() => handleUpVotes(data.id)} />
          )}
          <p>{data.upVotesBy.length}</p>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          {data.downVotesBy.includes((user && user.id) || '') ? (
            <MdThumbDown onClick={() => handleNeutralVotes(data.id)} />
          ) : (
            <MdThumbDownOffAlt onClick={() => handleDownVotes(data.id)} />
          )}
          <p>{data.downVotesBy.length}</p>
        </div>
        <div className="flex gap-1 items-center cursor-pointer">
          <FaRegComments />
          <p>{data.totalComments}</p>
        </div>
      </div>
    </div>
  );
};

ThreadCard.propTypes = {
  data: PropTypes.object.isRequired,
  handleUpVotes: PropTypes.func.isRequired,
  handleDownVotes: PropTypes.func.isRequired,
  handleNeutralVotes: PropTypes.func.isRequired,
};

export default ThreadCard;
