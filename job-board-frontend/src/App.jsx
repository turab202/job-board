import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import PostJob from "./pages/PostJob";
import JobApplication from "./pages/JobApplication"; 
import EmployerDashboard from "./pages/EmployerDashboard.jsxEmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/:jobId/apply" element={<JobApplication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path = "/candidate-dashboard" element ={<CandidateDashboard/>}/>

      </Routes>
    </>
  );
};

export default App;

