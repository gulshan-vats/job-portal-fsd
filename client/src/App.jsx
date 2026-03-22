import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import SeekerDashboard from './pages/SeekerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import PostJob from './pages/PostJob';
import ProfileSetup from './pages/ProfileSetup';
import CompanySetup from './pages/CompanySetup';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Seeker Routes */}
          <Route element={<ProtectedRoute allowedRoles={['seeker']} />}>
            <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
            <Route path="/profile/setup" element={<ProfileSetup />} />
          </Route>

          {/* Employer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/post-job" element={<PostJob />} />
            <Route path="/employer/company-setup" element={<CompanySetup />} />
          </Route>
        </Routes>
      </Layout>
    </ErrorBoundary>
  </Router>
  );
}

export default App;
