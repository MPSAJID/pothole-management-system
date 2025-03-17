import { useEffect, useState } from 'react';
import { getUserNotifications } from '../services/notificationService';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await getUserNotifications();
    setNotifications(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li key={n.id} className="bg-gray-100 p-3 rounded shadow">
              {n.message}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Notifications;
