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
export const updatePotholeStatus = async (id, data) => {
  try {
    const response = await api.put(`/potholes/${id}/status`, data);
    return response.data;
  }catch(error){
    console.error("error updating status : ",error);
  }
};