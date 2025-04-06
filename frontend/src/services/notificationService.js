import api from './api';

export const addNotification = (data) => api.post('/notifications/add', data);
export const getUserNotifications = (user_id) => api.get(`/notifications/${user_id}`);
export const markAsRead = (notification_id) =>  api.put(`/notifications/read/${notification_id}`);
  