import { useEffect, useState } from 'react';
import { getUserNotifications, markAsRead } from '../services/notificationService';
import socket from '@/lib/socket';

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  // Get user_id from localStorage (already saved as raw number)
  const user_id = JSON.parse(localStorage.getItem('user_id'));

  const fetchNotifications = async () => {
    try {
      const res = await getUserNotifications(user_id);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications', err);
    }
  };

  const handleMarkAsRead = async (notification_id) => {
    try {
      await markAsRead(notification_id);
      fetchNotifications(); // Refresh list
    } catch (err) {
      console.error('Error marking as read', err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on('newNotification', (notification) => {
      if (notification.user_id === user_id) {
        setNotifications((prev) => [notification, ...prev]);
      }
    });

    return () => socket.off('newNotification');
  }, [user_id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications yet.</p>
      )}

      {notifications.map((n) => (
        <div
          key={n.notification_id}
          className={`p-4 mb-2 rounded shadow ${!n.is_read ? 'bg-blue-100 font-semibold' : 'bg-white'
            }`}
        >
          <p>{n.message}</p>
          <p className="text-sm text-gray-500">{new Date(n.created_at).toLocaleString()}</p>

          {!n.is_read && (
            <button
              onClick={() => handleMarkAsRead(n.notification_id)}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            >
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default NotificationPage;
