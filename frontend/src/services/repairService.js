import api from './api';

export const addRepair = (data) => api.post('/repairs/add', data);
export const getRepairs = () => api.get('/repairs');
