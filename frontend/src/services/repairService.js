import api from './api';

export const assignWorker = (data) => {
 try{
   api.post('/repairs/assign', data);// add entry in repair
 }catch(error){
  console.error("assign error : ",error)
 }
}
export const getRepairs = () => api.get('/repairs');

export const getWorkers = async () => {
  return await api.get("repairs/workers");
};

export const getWorkerById = async (id) => {
  try {
    const response = await api.get(`/repairs/worker/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching worker info:", error);
    return null;
  }
};

export const updateRepairStatus = (repair_id, formData) => {
  return api.put(`/repairs/${repair_id}/status`, formData);
};