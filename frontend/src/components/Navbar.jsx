import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem('role'); // 'admin', 'worker', 'citizen'
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/dashboard">Pothole Management</Link>
      </div>

      <div className="flex space-x-4 items-center">
        {role === 'admin' && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/repairs" className="hover:text-gray-300">Repairs</Link>
            <Link to="/notifications" className="hover:text-gray-300">Notifications</Link>
            <Link to="/potholes" className="hover:text-gray-300">Report Pothole</Link>
            <Link to="/feedback" className="hover:text-gray-300">Feedback</Link>
          </>
        )}

        {role === 'engineer' && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/repairs" className="hover:text-gray-300">Repairs</Link>
            <Link to="/notifications" className="hover:text-gray-300">Notifications</Link>
          </>
        )}

        {role === 'citizen' && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/potholes/report" className="hover:text-gray-300">Report Pothole</Link>
            <Link to="/potholes/" className="hover:text-gray-300">View Potholes</Link>
            <Link to="/feedback" className="hover:text-gray-300">Feedback</Link>
            <Link to="/notifications" className="hover:text-gray-300">Notifications</Link>
          </>
        )}

        {/* Show Login/Register if not logged in */}
        {!role && (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}

        {/* Logout button if logged in */}
        {role && (
          <button 
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
