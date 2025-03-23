import { useState } from 'react';
import { login } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
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
        localStorage.setItem('user_id', res.user_id);   
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
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

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

        <button 
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          Login
        </button>

        {/* Links */}
        <div className="text-center space-y-2 mt-4">
          <p>
            Not registered? <Link to="/register" className="text-green-600 hover:underline">Register</Link>
          </p>
          <p>
            Admin? <Link to="/admin-login" className="text-red-600 hover:underline">Login as Admin</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
