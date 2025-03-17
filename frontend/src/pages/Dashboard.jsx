import React from 'react';
import AdminDashboard from './Dashboard/AdminDashboard'
import WorkerDashboard from './Dashboard/WorkerDashboard';
import CitizenDashboard from './Dashboard/CitizenDashboard';

const Dashboard = () => {
  const role = localStorage.getItem('role');

  if (role === 'admin') return <AdminDashboard />;
  if (role === 'worker') return <WorkerDashboard />;
  return <CitizenDashboard />;
};

export default Dashboard;

