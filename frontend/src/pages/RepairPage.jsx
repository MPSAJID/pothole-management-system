import { useEffect, useState } from "react";
import { getRepairs, getWorkerById } from "../services/repairService";

const Repairs = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workerDetails, setWorkerDetails] = useState({}); // Store ID, Name & Email
  
  const userRole = localStorage.getItem("role"); // Get user role (admin/worker)
  const userId = localStorage.getItem("user_id"); // Get logged-in user's ID

  // Fetch all repairs
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await getRepairs();
        let filteredRepairs = response.data;

        if (userRole === "worker") {
          // Show only potholes assigned to the logged-in worker
          filteredRepairs = filteredRepairs.filter(
            (repair) => repair.worker_id === userId
          );
        }
        setRepairs(filteredRepairs);
        fetchWorkerDetails(filteredRepairs); // Fetch worker details
      } catch (error) {
        console.error("Error fetching repairs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepairs();
  }, [userRole, userId]);

  // Fetch worker details for each worker ID
  const fetchWorkerDetails = async (repairsList) => {
    try {
      const workerIds = [...new Set(repairsList.map(r => r.worker_id))]; // Unique worker IDs
      const details = {};

      // Fetch each worker's details
      await Promise.all(
        workerIds.map(async (id) => {
          if (id) { // Avoid null values
            const worker = await getWorkerById(id);
             // Assuming response contains { user_id, name, email }
            details[id] = {
              user_id: worker.user_id,
              name: worker.name,
              email: worker.email,
            };
          }
        })
      );
      setWorkerDetails(details);
    } catch (error) {
      console.error("Error fetching worker details:", error);
    }
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Repair Jobs</h2>
      {repairs.length === 0 ? (
        <p>No repair jobs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairs.map((repair) => (
            <div
              key={repair.repair_id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h3 className="font-semibold">Pothole ID: {repair.pothole_id}</h3>
              <p><strong>Repair Status:</strong> {repair.repair_status}</p>
              <p><strong>Repair Date:</strong> {new Date(repair.repair_date).toLocaleString()}</p>
              <p><strong>Remarks:</strong> {repair.remarks || "N/A"}</p>

              <h4 className="font-semibold mt-2">Assigned Worker:</h4>
              {workerDetails[repair.worker_id] ? (
                <div>
                  <p><strong>Worker ID:</strong> {workerDetails[repair.worker_id].user_id}</p>
                  <p><strong>Name:</strong> {workerDetails[repair.worker_id].name}</p>
                  <p><strong>Email:</strong> {workerDetails[repair.worker_id].email}</p>
                </div>
              ) : (
                <p>Unassigned</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Repairs;
