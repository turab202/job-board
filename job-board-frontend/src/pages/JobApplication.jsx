import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

const JobApplication = () => {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({ name: "", email: "", coverLetter: "" });
  const [resume, setResume] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setSnackbar({ open: true, message: "❌ Resume is required!", severity: "error" });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("coverLetter", formData.coverLetter);
    formDataToSend.append("resume", resume);

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
        method: "POST",
        body: formDataToSend, // No need for headers, FormData sets them automatically
      });

      const data = await response.json();
      if (response.ok) {
        setSnackbar({ open: true, message: "✅ Application Submitted!", severity: "success" });
        setFormData({ name: "", email: "", coverLetter: "" });
        setResume(null); // Reset file input
      } else {
        setSnackbar({ open: true, message: data.message || "❌ Submission failed.", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "❌ Network error. Try again later.", severity: "error" });
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: "500px" }}>
      <Typography variant="h4" gutterBottom>Apply for Job</Typography>
      <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Cover Letter" name="coverLetter" multiline rows={4} value={formData.coverLetter} onChange={handleChange} sx={{ mb: 2 }} />
      
      {/* File Upload */}
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ marginBottom: "16px" }} />

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit Application</Button>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default JobApplication;

