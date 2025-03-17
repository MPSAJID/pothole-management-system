import { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form); 
  
      console.log('Login response:', res); 
  
      if (res.token && res.role) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);   
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert(res.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 space-y-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-red-600">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-red-300"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-red-300"
          required
        />

        <button 
          type="submit"
          className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition"
        >
          Admin Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
