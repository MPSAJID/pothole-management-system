import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserNotifications } from '../services/notificationService';
import socket from '@/lib/socket';

const Navbar = () => {
  const role = localStorage.getItem('role'); // 'admin', 'worker', 'citizen'
  const navigate = useNavigate();

  const user_id = JSON.parse(localStorage.getItem('user_id'));
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getUserNotifications(user_id);
        const unread = res.data.filter((n) => !n.is_read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };

    fetchNotifications();

    socket.on('newNotification', (notification) => {
      if (notification.user_id === user_id) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    return () => socket.off('newNotification');
  }, [user_id]);

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
            <Link to="/potholes" className="hover:text-gray-300">View Potholes</Link>
            {/*<Link to="/feedback" className="hover:text-gray-300">Feedback</Link>*/}
            <Link to="/notifications" className="relative hover:text-gray-300">
              🔔
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {unreadCount}
                </span>
              )}
            </Link>
          </>
        )}

        {role === 'worker' && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/repairs" className="hover:text-gray-300">Repairs</Link>
            <Link to="/notifications" className="relative hover:text-gray-300">
              🔔
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {unreadCount}
                </span>
              )}
            </Link>
          </>
        )}

        {role === 'citizen' && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/potholes/report" className="hover:text-gray-300">Report Pothole</Link>
            <Link to="/potholes/" className="hover:text-gray-300">View Potholes</Link>
            {/*<Link to="/feedback" className="hover:text-gray-300">Feedback</Link>*/}
            <Link to="/notifications" className="relative hover:text-gray-300">
              🔔
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {unreadCount}
                </span>
              )}
            </Link>
          </>
        )}

        {!role && (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}

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
