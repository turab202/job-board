import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

const ApplyJob = () => {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({ name: "", email: "", coverLetter: "", resume: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("coverLetter", formData.coverLetter);
    formDataToSend.append("resume", formData.resume);

    try {
      const response = await fetch(`http://localhost:5000/jobs/${jobId}/apply`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setSnackbar({ open: true, message: "✅ Application Submitted!", severity: "success" });
        setFormData({ name: "", email: "", coverLetter: "", resume: null }); // Reset form
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
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Cover Letter" name="coverLetter" multiline rows={4} value={formData.coverLetter} onChange={handleChange} sx={{ mb: 2 }} />
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ marginBottom: "16px" }} />
        <Button variant="contained" color="primary" fullWidth type="submit">Submit Application</Button>
      </form>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ApplyJob;
