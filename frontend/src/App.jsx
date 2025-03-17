import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout'; // Import Layout

const Dashboard = lazy(() => import('./pages/Dashboard'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ReportPothole = lazy(() => import('./pages/PotholeReportPage'));
const Repairs = lazy(() => import('./pages/RepairPage'));
const Feedback = lazy(() => import('./pages/FeedbackPage'));
const Notifications = lazy(() => import('./pages/NotificationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes wrapped in Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/potholes" element={<ReportPothole />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
