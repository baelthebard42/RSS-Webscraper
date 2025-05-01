const API_BASE = 'http://localhost:8000/v1';

export const createUser = async (name) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  console.log(response)
  return response.json();
};

export const getUser = async (apiKey) => {
  const response = await fetch(`${API_BASE}/users`, {
    headers: {
      'Authorization': `ApiKey ${apiKey}`,
    },
  });
  return response.json();
};

export const createFeed = async (feedData, apiKey) => {
  const response = await fetch(`${API_BASE}/feeds`, {
    method: 'POST',
    headers: {
      'Authorization': `ApiKey ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedData),
  });
  return response.json();
};

export const getFeeds = async () => {
  const response = await fetch(`${API_BASE}/feeds`);
  return response.json();
};

export const createFeedFollow = async (feedId, apiKey) => {
  const response = await fetch(`${API_BASE}/feed-follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `ApiKey ${apiKey}`,
    },
    body: JSON.stringify({ fid: feedId }),
  });
  return response.json();
};

export const getFeedFollows = async (apiKey) => {
  const response = await fetch(`${API_BASE}/feed-follows`, {
    headers: {
      'Authorization': `ApiKey ${apiKey}`,
    },
  });
  return response.json();
};

export const deleteFeedFollow = async (feedFollowId, apiKey) => {
  const response = await fetch(`${API_BASE}/delete-feed-follows/${feedFollowId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `ApiKey ${apiKey}`,
    },
  });
  return response;
};

export const getUserPosts = async (apiKey) => {
  const response = await fetch(`${API_BASE}/get-user-posts`, {
    headers: {
      'Authorization': `ApiKey ${apiKey}`,
    },
  });
  console.log(response.json())
  return response.json();
};