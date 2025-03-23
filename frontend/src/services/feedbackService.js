import api from './api';

export const addFeedback = (data) => api.post('/feedback/add', data);
export const getFeedback = async (pothole_id) => {
    try {
      const response = await api.get(`/feedback/${pothole_id}`);
      console.log("API Response:", response.data); // ✅ Log this
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  };

