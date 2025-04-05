import { useEffect, useState } from "react";
import { getRepairs, getWorkerById, updateRepairStatus } from "../services/repairService";

const Repairs = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workerDetails, setWorkerDetails] = useState({});
  const [statusInputs, setStatusInputs] = useState({});
  const [completionImages, setCompletionImages] = useState({});

  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");

  // Fetch all repairs
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await getRepairs();
        let filteredRepairs = response.data;

        if (userRole === "worker") {
          const workerId = Number(userId);
          filteredRepairs = filteredRepairs.filter(
            (repair) => Number(repair.worker_id) === workerId
          );
        }
        setRepairs(filteredRepairs);
        fetchWorkerDetails(filteredRepairs);
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
      const workerIds = [...new Set(repairsList.map((r) => r.worker_id))];
      const details = {};

      await Promise.all(
        workerIds.map(async (id) => {
          if (id) {
            const worker = await getWorkerById(id);
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

  // Handle status change
  const handleStatusChange = (repair_id, status) => {
    setStatusInputs((prev) => ({
      ...prev,
      [repair_id]: status,
    }));
  };

  // Handle image change
  const handleImageChange = (repair_id, file) => {
    if (file) {
      setCompletionImages((prev) => ({
        ...prev,
        [repair_id]: file,
      }));
      console.log("Selected File:", file);
    } else {
      console.warn("No file selected!");
    }
  };

  // Update status function
  const handleStatusUpdate = async (repair_id) => {
    const repairStatus = statusInputs[repair_id];
    const completionImage = completionImages[repair_id];

    if (repairStatus === "completed" && !completionImage) {
      alert("Please upload a completion image before updating to 'Completed'");
      return;
    }

    const formData = new FormData();
    formData.append("repair_status", repairStatus);
    formData.append("user_role", userRole);

    if (repairStatus === "completed") {
      formData.append("image", completionImage);
    }

    try {
      await updateRepairStatus(repair_id, formData);

      // Optimistic UI Update
      setRepairs((prevRepairs) =>
        prevRepairs.map((repair) =>
          repair.repair_id === repair_id
            ? { ...repair, repair_status: repairStatus }
            : repair
        )
      );

      // Clear input states
      setStatusInputs((prev) => ({ ...prev, [repair_id]: "" }));
      setCompletionImages((prev) => ({ ...prev, [repair_id]: null }));

      alert("Repair status updated successfully");
    } catch (error) {
      console.error("Error updating repair status:", error);
      alert("Failed to update repair status");
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
              <p>
                <strong>Repair Status:</strong> {repair.repair_status}
              </p>
              <p>
                <strong>Repair Date:</strong>{" "}
                {new Date(repair.repair_date).toLocaleString()}
              </p>
              <p>
                <strong>Remarks:</strong> {repair.remarks || "N/A"}
              </p>

              <h4 className="font-semibold mt-2">Assigned Worker:</h4>
              {workerDetails[repair.worker_id] ? (
                <div>
                  <p>
                    <strong>Worker ID:</strong>{" "}
                    {workerDetails[repair.worker_id].user_id}
                  </p>
                  <p>
                    <strong>Name:</strong>{" "}
                    {workerDetails[repair.worker_id].name}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {workerDetails[repair.worker_id].email}
                  </p>
                </div>
              ) : (
                <p>Unassigned</p>
              )}

              {/* Show completion image if repair is completed */}
              {repair.repair_status === "completed" && (
                <div className="mt-4">
                  <h4 className="font-semibold">Completion Image:</h4>
                  <img
                    src={`${repair.image_url}`} // Adjust this if necessary
                    alt="Completion"
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
              )}

              {userRole === "worker" && (
                <div className="mt-4">
                  <h4 className="font-semibold">Update Status</h4>
                  <select
                    value={statusInputs[repair.repair_id] || ""}
                    onChange={(e) =>
                      handleStatusChange(repair.repair_id, e.target.value)
                    }
                    className="p-2 border rounded w-full"
                  >
                    <option value="">Select Status</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  {/* Show file input only if status is "completed" */}
                  {statusInputs[repair.repair_id] === "completed" && (
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(
                            repair.repair_id,
                            e.target.files[0]
                          )
                        }
                        className="block w-full p-2 border"
                      />
                    </div>
                  )}

                  <button
                    onClick={() => handleStatusUpdate(repair.repair_id)}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update Status
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Repairs;
