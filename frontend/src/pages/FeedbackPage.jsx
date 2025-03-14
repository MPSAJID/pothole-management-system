import { useState } from 'react';
import { giveFeedback } from '../services/feedbackService';
import Navbar from '../components/Navbar';

const Feedback = () => {
  const [form, setForm] = useState({ user_id: 1, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await giveFeedback(form);
    alert('Feedback submitted successfully!');
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
        <form 
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow"
        >
          <textarea
            placeholder="Your Feedback"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-3 border rounded h-32"
            required
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </>
  );
};

export default Feedback;
