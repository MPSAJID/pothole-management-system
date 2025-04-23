import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout'; 
import 'leaflet/dist/leaflet.css';


const Dashboard = lazy(() => import('./pages/Dashboard'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ReportPothole = lazy(() => import('./pages/PotholeReportPage'));
const Repairs = lazy(() => import('./pages/RepairPage'));
{/*const Feedback = lazy(() => import('./pages/FeedbackPage'));*/}
const Notifications = lazy(() => import('./pages/NotificationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const Potholes = lazy(() => import('./pages/Potholes'));
const Potholeinfo = lazy(() => import('./pages/Potholeinfo'));

const App = () => {
  return (
    <Router basename='/login'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes wrapped in Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/repairs" element={<Repairs />} />
            {/*<Route path="/feedback" element={<Feedback />} />*/}
            <Route path="/potholes" element={<Potholes/>}/>
            <Route path="/potholes/:id" element={<Potholeinfo/>}/>
            <Route path="/potholes/report" element={<ReportPothole />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
