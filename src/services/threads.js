const baseURL = 'https://forum-api.dicoding.dev/v1';

const getThreads = () => {
  return fetch(`${baseURL}/threads`);
};

const getDetailThread = (id) => {
  return fetch(`${baseURL}/threads/${id}`);
};

const getUsers = () => {
  return fetch(`${baseURL}/users`);
};

const getLeaderboards = () => {
  return fetch(`${baseURL}/leaderboards`);
};

const createThread = (data) => {
  const token = JSON.parse(localStorage.getItem('dicoding'));

  return fetch(`${baseURL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

const handleUpVotes = (id) => {
  const token = JSON.parse(localStorage.getItem('dicoding'));

  return fetch(`${baseURL}/threads/${id}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleDownVotes = (id) => {
  const token = JSON.parse(localStorage.getItem('dicoding'));

  return fetch(`${baseURL}/threads/${id}/down-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleNeutralVotes = (id) => {
  const token = JSON.parse(localStorage.getItem('dicoding'));

  return fetch(`${baseURL}/threads/${id}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createComment = ({ id, data }) => {
  const token = JSON.parse(localStorage.getItem('dicoding'));

  return fetch(`${baseURL}/threads/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

const handleUpComment = ({ threadId, commentId }) => {
  const token = JSON.parse(localStorage.getItem('dicoding'));

  console.log(threadId);

  return fetch(`${baseURL}/threads/${threadId}/comments/${commentId}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleDownComment = ({ threadId, commentId }) => {
  const token = JSON.parse(localStorage.getItem('dicoding'));

  return fetch(
    `${baseURL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const handleNeutralComment = ({ threadId, commentId }) => {
  const token = JSON.parse(localStorage.getItem('dicoding'));

  return fetch(
    `${baseURL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const ThreadsService = {
  getThreads,
  getDetailThread,
  getUsers,
  getLeaderboards,
  createThread,
  handleUpVotes,
  handleDownVotes,
  handleNeutralVotes,
  createComment,
  handleUpComment,
  handleDownComment,
  handleNeutralComment,
};

export default ThreadsService;
