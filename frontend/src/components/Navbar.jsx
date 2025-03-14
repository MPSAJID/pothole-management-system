import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/potholes" className="hover:text-gray-300">Report Pothole</Link>
        <Link to="/repairs" className="hover:text-gray-300">Repairs</Link>
        <Link to="/feedback" className="hover:text-gray-300">Feedback</Link>
        <Link to="/notifications" className="hover:text-gray-300">Notifications</Link>
      </div>
      <button 
        onClick={() => localStorage.clear()} 
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
