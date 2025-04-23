import { useEffect, useState } from "react";
import { getPotholes } from "../services/potholeService";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getWorkers, assignWorker } from "../services/repairService";


const Potholes = () => {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPothole, setSelectedPothole] = useState(null);
  const [workers, setWorkers] = useState([]); // List of workers
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [remarks, setRemarks] = useState("");


  useEffect(() => {
    const fetchPotholes = async () => {
      try {
        const response = await getPotholes();
        setPotholes(response.data);
      } catch (error) {
        console.error("Error fetching potholes:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWorkers = async () => {
      try {
        const response = await getWorkers(); // Fetch from workerService
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchPotholes();
    fetchWorkers();
  }, []);

  const handleAssignClick = (pothole) => {
    setSelectedPothole(pothole);
    setShowModal(true);
  };


  const userRole = localStorage.getItem("role");
  console.log(`User Role: ${userRole}`);
  console.log("Workers List:", workers);


  const handleAssignWorker = async () => {
    if (!selectedWorker) {
      alert("Please select a worker.");
      return;
    }
    const data = {
      pothole_id: selectedPothole?.pothole_id,
      worker_id: selectedWorker,
      remarks: remarks || "",
    };
    try {
      await assignWorker(data);

      setPotholes((prev) =>
        prev.map((p) =>
          p.pothole_id === selectedPothole.pothole_id
            ? { ...p, status: "assigned" }
            : p
        )
      );
      setShowModal(false);
      setSelectedWorker(null);
      setRemarks(null);
    } catch (error) {
      console.error("Error assigning worker:", error);
    }
  };


  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Reported Potholes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {potholes.map((pothole) => (
          <div
            key={pothole.pothole_id}
            className="bg-white rounded-2xl shadow-lg p-4 overflow-hidden"
          >
            <img
              src={pothole.image_url}
              alt="Pothole"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-2">{pothole.description}</h3>
            <p className="text-sm text-gray-600">
              Location: {pothole.latitude}, {pothole.longitude}
            </p>
            <p className="mt-1">
              Severity: <span className="font-semibold">{pothole.severity}</span>
            </p>
            <p className="mt-1">
              Status: <span className={`font-semibold text-${pothole.status === "reported"
                ? "yellow-500"
                : pothole.status === "assigned"
                  ? "blue-500"
                  : pothole.status === "rejected"
                    ? "red-500"
                    : "green-500"
                }`}>{pothole.status}</span>
            </p>
            <Link to={`/potholes/${pothole.pothole_id}`} className="text-blue-500 underline mt-2">View Details</Link>
            {/* Show Assign Button for Admins Only */}
            {userRole === "admin" && pothole.status === "reported" && (
              <Button
                onClick={() => handleAssignClick(pothole)}
                className="mt-2"
              >
                Assign Worker
              </Button>
            )}

          </div>

        ))}
      </div>
      {/* Assign Worker Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent description="Assign a worker to fix the selected pothole.">
          <DialogHeader>
            <DialogTitle>Assign Worker</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Assign a worker to <strong>{selectedPothole?.description}</strong>
            </p>

            {/* Worker Dropdown */}
            <Select onValueChange={setSelectedWorker}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Worker" />
              </SelectTrigger>
              <SelectContent>
                {workers.length > 0 ? (
                  workers.map((worker) => (
                    <SelectItem key={worker.user_id} value={worker.user_id}>
                      {worker.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-workers" disabled>
                    No workers available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          {/* Remarks Section */}
          <div className="space-y-2">
            <label htmlFor="remarks" className="block font-medium text-gray-700">
              Remarks (Optional)
            </label>
            <textarea
              id="remarks"
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks for this action"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignWorker}>Assign</Button>
          </DialogFooter>
        </DialogContent>

      </Dialog>
    </div>

  );
};

export default Potholes;
