import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPotholeinfo, updatePotholeStatus } from "../services/potholeService";
import { addFeedback, getFeedback } from "../services/feedbackService";

const Potholeinfo = () => {
  const { id } = useParams();
  const [pothole, setPothole] = useState(null);
  const [status, setStatus] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(null);
  const [comments, setComments] = useState("");

 // Fetch feedbacks
const fetchFeedbackData = async () => {
  try {
    const data = await getFeedback(id); // ✅ Directly assign the returned data
    console.log("Fetched Feedback:", data);
    setFeedbacks(data); // ✅ Set the state properly
  } catch (error) {
    console.error("Error fetching feedback:", error);
  }
};



  // Fetch pothole info
  useEffect(() => {
    if (id) {
      getPotholeinfo(id)
        .then((data) => {
          setPothole(data);
          setStatus(data.status);
        })
        .catch((error) => console.error("Error fetching pothole:", error));
      fetchFeedbackData(); // Fetch feedback after getting pothole info
    }
  }, [id]);

  // Handle status update
  const handleStatusUpdate = async () => {
    try {
      await updatePotholeStatus(id, { status });
      setPothole((prev) => ({ ...prev, status }));
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      pothole_id: id,
      comments,
      rating,
    };
    try {
      await addFeedback(feedbackData);
      setComments("");
      setRating(null);
      alert("Feedback added successfully");
      fetchFeedbackData(); // Refresh feedback after submission
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  if (!pothole) return <p>Loading...</p>;

  const userRole = localStorage.getItem("role") || "user";

  const potholeIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardContent>
          <img
            src={pothole.image_url || "fallback-image.jpg"}
            alt="Pothole"
            className="w-full rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold">{pothole.description}</h2>
          <p className="text-gray-600">Severity: {pothole.severity}</p>
          <p className="text-gray-600">Status: {pothole.status || "Unknown"}</p>
          <p className="text-gray-600">
            Location:{" "}
            {pothole.latitude && pothole.longitude
              ? `${pothole.latitude}, ${pothole.longitude}`
              : "Not Available"}
          </p>
          <p className="text-gray-500 text-sm">
            Reported on:{" "}
            {pothole.reported_at
              ? new Date(pothole.reported_at).toLocaleDateString()
              : "Not Available"}
          </p>

          {/* Map Section */}
          {pothole.latitude && pothole.longitude ? (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Pothole Location</h3>
              <MapContainer
                center={[
                  parseFloat(pothole.latitude),
                  parseFloat(pothole.longitude),
                ]}
                zoom={15}
                style={{ height: "300px", width: "100%", borderRadius: "10px" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[
                    parseFloat(pothole.latitude),
                    parseFloat(pothole.longitude),
                  ]}
                  icon={potholeIcon}
                >
                  <Popup>Pothole Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <p className="text-red-500 mt-4">No location data available.</p>
          )}

          {/* Show Update Status only for Admin */}
          {userRole === "admin" && (
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Update Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="reported">Reported</option>
                <option value="in progress">In Progress</option>
                <option value="repaired">Repaired</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button onClick={handleStatusUpdate} className="mt-2">
                Update
              </Button>
            </div>
          )}

          {/* Feedback Section */}
          <div>
            <h3 className="font-bold text-lg mt-4">Add Feedback</h3>
            <form onSubmit={handleSubmit} className="my-2">
              {["repaired", "rejected"].includes(pothole.status) && (
                <div>
                  <label>Rating:</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={rating || ""}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  />
                </div>
              )}
              <br />
              <label>Comments:</label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
              <br />
              <Button type="submit">Submit</Button>
            </form>

            <h3 className="font-bold text-lg mt-4">Feedback</h3>
            {feedbacks && feedbacks.length > 0 ? (
              feedbacks.map((f) => (
                <div key={f.feedback_id} className="p-2 my-2 border rounded">
                  <p>
                    <strong>{f.user_name || "Anonymous"}:</strong> {f.comments}
                  </p>
                  {["repaired", "rejected"].includes(pothole.status) && (
                    <p>Rating: {f.rating} / 5</p>
                  )}
                  <small>{new Date(f.created_at).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No feedback available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Potholeinfo;
