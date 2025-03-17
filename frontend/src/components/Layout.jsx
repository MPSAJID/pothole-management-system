import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        <Outlet /> {/* This renders the matched child route */}
      </main>
    </div>
  );
};

export default Layout;
