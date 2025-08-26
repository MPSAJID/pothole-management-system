import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4 drop-shadow-lg">Pothole Management System</h1>
        <p className="text-lg md:text-2xl text-blue-700 max-w-xl mx-auto">
          Report, track, and manage pothole repairs efficiently. Empowering citizens, workers, and administrators for safer roads.
        </p>
      </header>
      <nav className="flex flex-wrap gap-6 mb-10">
        <Link to="/login" className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition">Login</Link>
        <Link to="/register" className="px-6 py-3 bg-white text-blue-700 border border-blue-700 rounded-lg shadow hover:bg-blue-50 transition">Register</Link>
        <Link to="/potholes" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">View Potholes</Link>
      </nav>
      <footer className="text-blue-600 text-sm mt-auto mb-4">&copy; {new Date().getFullYear()} Pothole Management System. All rights reserved.</footer>
    </div>
  );
};

export default HomePage;
