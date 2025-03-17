import api from './api';

export const login = async (data) => {
  const res = await api.post('/auth/login', data);
  return res.data; // ✅ Only returning token & role
};

export const register = async (data) => {
  const res = await api.post('/auth/register', data);
  return res.data; // ✅ Only returning required data
};
