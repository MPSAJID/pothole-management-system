import { useState } from 'react';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'citizen' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    alert('Registered successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 space-y-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          required
        />
        <button 
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
