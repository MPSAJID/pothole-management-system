import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPotholeinfo, updatePotholeStatus, /*addComment*/ } from "../services/potholeService";

const Potholeinfo = () => {
  console.log("PotholeDetail Component Loaded!");

  const { id } = useParams();
  console.log("Pothole ID from URL:", id);

  const [pothole, setPothole] = useState(null);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log("useEffect triggered with ID:", id);

    if (id) {
      console.log("Calling getPotholeinfo...");
      getPotholeinfo(id)
        .then((data) => {
          console.log("Fetched Data:", data);
          setPothole(data);
          setStatus(data.status);
        })
        .catch((error) => console.error("Error fetching pothole:", error));
    } else {
      console.error("Pothole ID is undefined");
    }
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await updatePotholeStatus(id, { status });
      setPothole((prev) => ({
        ...prev,
        status: status,
      }));
      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  // const handleAddComment = async () => {
  //   try {
  //     await addComment(id, comment);
  //     setComment("");
  //     alert("Comment added successfully");
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  if (!pothole) return <p>Loading...</p>;

  const userRole = localStorage.getItem("role") || "user";
  console.log(`User Role: ${userRole}`);



  // Custom marker icon for pothole location
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
            Location: {pothole.latitude && pothole.longitude
              ? `${pothole.latitude}, ${pothole.longitude}`
              : "Not Available"}
          </p>
          <p className="text-gray-500 text-sm">
            Reported on: {pothole.reported_at ? new Date(pothole.reported_at).toLocaleDateString() : "Not Available"}
          </p>

          {/* Map Section */}
          {pothole.latitude && pothole.longitude ? (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Pothole Location</h3>
              <MapContainer
                center={[parseFloat(pothole.latitude), parseFloat(pothole.longitude)]}
                zoom={15}
                style={{ height: "300px", width: "100%", borderRadius: "10px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[parseFloat(pothole.latitude), parseFloat(pothole.longitude)]}
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
            <label className="block text-gray-700 mb-2 font-semibold">Update Status</label>
            <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="reported">reported</option>
              <option value="in progress">in progress</option>
              <option value="repaired">repaired</option>
              <option value="rejected">rejected</option>
            </select>
            <Button onClick={handleStatusUpdate} className="mt-2">Update</Button>
          </div>
          )}
          
          {/* Comment Section */}
          {/* <div className="mt-4">
            <label className="block text-sm font-medium">Add Comment</label>
            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} className="mt-2" />
            <Button onClick={handleAddComment} className="mt-2">Submit</Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Potholeinfo;
