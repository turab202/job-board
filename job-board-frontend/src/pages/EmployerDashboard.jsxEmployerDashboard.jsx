import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs/employer") // Fetch jobs posted by this employer
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await fetch(`http://localhost:5000/jobs/delete/${jobId}`, { method: "DELETE" });
      setJobs(jobs.filter((job) => job._id !== jobId));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Employer Dashboard</Typography>
      <Button component={Link} to="/post-job" variant="contained" color="primary" sx={{ mt: 2 }}>
        Post New Job
      </Button>
      <Typography variant="h5" sx={{ mt: 3 }}>Your Jobs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>
                <Button component={Link} to={`/edit-job/${job._id}`} variant="contained" color="warning">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(job._id)} variant="contained" color="error" sx={{ ml: 2 }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default EmployerDashboard;
