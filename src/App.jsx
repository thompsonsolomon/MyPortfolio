import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import { AuthProvider, useAuth } from "./components/contexts/AuthContext";
import Login from "./components/Admin/Login";
import Dashboard from "./components/Admin/DashboardPage";
import AdminLayout from "./components/Admin/LayOut";
import LoadingSpinner from "./utils/ui";
import ExperiencesPage from "./components/Admin/ExperiencePage";
import ExperienceForm from "./components/Admin/ExperienceForm";
import ProjectsPage from "./components/Admin/ProjectsPage";
import ProjectForm from "./components/Admin/ProjectForm";
import TestimonialsPage from "./components/Admin/TestimonialsPage";
import SubmitTestimonial from "./components/Admin/AddTestimonial";
import WakaHeatmap from "./components/wakatimeStat";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          < Route path="/" element={
            <div className='relative z-0 bg-primary'>
              <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
                <Hero />
              </div>
              <About />
              <Experience />
              <Tech />
              <WakaHeatmap />
              <Works />
              <Feedbacks />
              <div className='relative z-0'>
                <Contact />
                <StarsCanvas />
              </div>
            </div>
          } />
              <Route path="submit-testimonial" element={<SubmitTestimonial />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="experiences/new" element={<ExperienceForm />} />
            <Route path="experiences/edit/:id" element={<ExperienceForm />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

