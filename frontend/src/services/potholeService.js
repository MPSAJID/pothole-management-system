import api from './api';

export const reportPothole = (data) => api.post('/potholes/report', data, {
    headers: { "Content-Type": "multipart/form-data" }
});
export const getPotholes = () => api.get('/potholes');
export const getPotholeinfo = async (id) => {
    try {
      const response = await api.get(`/potholes/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching pothole info:", error);
      return null;
    }
  };
export const updatePotholeStatus = (id, data) => api.put(`/potholes/update/${id}`, data);
