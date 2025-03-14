import api from './api';

export const reportPothole = (data) => api.post('/potholes/report', data);
export const getPotholes = () => api.get('/potholes');
export const updatePotholeStatus = (id, data) => api.put(`/potholes/update/${id}`, data);
