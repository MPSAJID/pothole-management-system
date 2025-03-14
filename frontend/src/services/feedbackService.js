import api from './api';

export const addFeedback = (data) => api.post('/feedback/add', data);
export const getFeedback = () => api.get('/feedback');
