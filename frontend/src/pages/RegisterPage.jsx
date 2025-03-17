import { useState } from 'react';
import { register } from '../services/authService';
import { Link } from 'react-router-dom'; // Import Link for navigation

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'citizen' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
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
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          required
        />

        {/* Role Selection */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Select Role:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="citizen"
                checked={form.role === 'citizen'}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="form-radio text-green-600"
              />
              <span>Citizen</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="worker"
                checked={form.role === 'worker'}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="form-radio text-green-600"
              />
              <span>Worker</span>
            </label>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          Register
        </button>

        {/* Link to Login Page */}
        <p className="text-center mt-4">
          Already registered? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
