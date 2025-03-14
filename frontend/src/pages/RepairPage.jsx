
import { useEffect, useState } from 'react';
import { getPotholes, updatePotholeStatus } from '../services/potholeService';
import Navbar from '../components/Navbar';

const Repairs = () => {
  const [potholes, setPotholes] = useState([]);

  useEffect(() => {
    fetchPotholes();
  }, []);

  const fetchPotholes = async () => {
    const res = await getPotholes();
    setPotholes(res.data);
  };

  const handleStatusUpdate = async (id, status) => {
    await updatePotholeStatus(id, status);
    fetchPotholes();
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Repair List</h1>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {potholes.map((p) => (
              <tr key={p.pothole_id} className="text-center">
                <td className="border p-2">{p.location}</td>
                <td className="border p-2">{p.status}</td>
                <td className="border p-2 space-x-2">
                  <button 
                    onClick={() => handleStatusUpdate(p.pothole_id, 'in-progress')}
                    className="bg-yellow-500 px-3 py-1 rounded text-white"
                  >In-Progress</button>
                  <button 
                    onClick={() => handleStatusUpdate(p.pothole_id, 'fixed')}
                    className="bg-green-600 px-3 py-1 rounded text-white"
                  >Fixed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Repairs;
