import { useEffect, useState } from "react";
import { getPotholes } from "../services/potholeService";
import { Link } from "react-router-dom";

const Potholes = () => {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchPotholes();
  }, []);

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
              Status: <span className={`font-semibold text-${
                pothole.status === "reported"
                  ? "yellow-500"
                  : pothole.status === "assigned"
                  ? "blue-500"
                  : pothole.status === "rejected"
                  ? "red-500"
                  : "green-500"
              }`}>{pothole.status}</span>
            </p>
            <Link to={`/potholes/${pothole.pothole_id}`} className="text-blue-500 underline mt-2">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Potholes;
