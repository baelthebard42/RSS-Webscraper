import { useState, useEffect } from 'react';
import * as api from '../utils/api';

export const useApi = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (apiKey) {
      fetchUser();
    }
  }, [apiKey]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await api.getUser(apiKey);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user data');
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (key) => {
    localStorage.setItem('apiKey', key);
    setApiKey(key);
  };

  const logout = () => {
    localStorage.removeItem('apiKey');
    setApiKey('');
    setUser(null);
  };

  return {
    apiKey,
    user,
    loading,
    error,
    login,
    logout,
    createUser: api.createUser,
    createFeed: api.createFeed,          
    getFeeds: api.getFeeds,
    createFeedFollow: api.createFeedFollow, 
    getFeedFollows: api.getFeedFollows,
    deleteFeedFollow: api.deleteFeedFollow, 
    getUserPosts: api.getUserPosts,
  };
};