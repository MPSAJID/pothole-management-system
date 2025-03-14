import { useState } from 'react';
import { reportPothole } from '../services/potholeService';
import Navbar from '../components/Navbar';

const ReportPothole = () => {
  const [form, setForm] = useState({ location: '', image: '', status: 'reported', reported_by: 1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reportPothole(form);
    alert('Pothole reported successfully!');
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Report a Pothole</h1>
        <form 
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow"
        >
          <input
            type="text"
            placeholder="Location"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-3 border rounded"
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Report Pothole
          </button>
        </form>
      </div>
    </>
  );
};

export default ReportPothole;
