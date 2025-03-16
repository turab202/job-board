import React, { useState } from "react";
import { Container, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

const PostJob = () => {
  const [job, setJob] = useState({ title: "", company: "", location: "", salary: "", description: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/jobs/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job), // ✅ Use job object instead of missing variables
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({ open: true, message: "✅ Job posted successfully!", severity: "success" });
        setJob({ title: "", company: "", location: "", salary: "", description: "" });
      } else {
        setSnackbar({ open: true, message: data.message || "Failed to post job", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "❌ Network error. Try again later.", severity: "error" });
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: "500px" }}>
      <Typography variant="h4" gutterBottom>Post a Job</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth name="title" label="Job Title" variant="outlined" sx={{ mb: 2 }} value={job.title} onChange={handleChange} />
        <TextField fullWidth name="company" label="Company Name" variant="outlined" sx={{ mb: 2 }} value={job.company} onChange={handleChange} />
        <TextField fullWidth name="location" label="Location" variant="outlined" sx={{ mb: 2 }} value={job.location} onChange={handleChange} />
        <TextField fullWidth name="salary" label="Salary" variant="outlined" sx={{ mb: 2 }} value={job.salary} onChange={handleChange} />
        <TextField fullWidth multiline rows={4} name="description" label="Job Description" variant="outlined" sx={{ mb: 2 }} value={job.description} onChange={handleChange} />
        <Button fullWidth variant="contained" color="primary" type="submit">Post Job</Button>
      </form>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default PostJob;

