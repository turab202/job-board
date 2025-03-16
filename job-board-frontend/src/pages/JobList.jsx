import React, { useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, TextField, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const jobsData = [
  { id: 1, title: "Frontend Developer", company: "Google", location: "Remote", type: "Full-time", description: "We are looking for a skilled frontend developer to join our team at Google." },
  { id: 2, title: "Backend Developer", company: "Amazon", location: "USA", type: "Part-time", description: "Join our backend team at Amazon and work on scalable APIs." },
  { id: 3, title: "UI/UX Designer", company: "Microsoft", location: "Canada", type: "Contract", description: "Looking for a creative UI/UX designer to create stunning designs." },
  { id: 4, title: "Graphic Designer", company: "Adobe", location: "Remote", type: "Full-time", description: "Join our creative team to design graphics for marketing, websites, and product packaging." },
  { id: 5, title: "Video Editor", company: "Netflix", location: "USA", type: "Part-time", description: "Looking for a talented video editor to work on original content for our streaming platform." },
  { id: 6, title: "Full Stack Developer", company: "Facebook", location: "Remote", type: "Full-time", description: "Join our engineering team to build scalable, robust full stack applications." },
];

const JobList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredJobs = jobsData.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? job.type === filter : true)
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>

      <TextField
        label="Search Jobs..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        label="Filter by Type"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2, width: "200px", mr: 2 }} // Fixed spacing
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Full-time">Full-time</MenuItem>
        <MenuItem value="Part-time">Part-time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </TextField>

      <Grid container spacing={3}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography color="textSecondary">{job.company}</Typography>
                  <Typography>{job.location}</Typography>
                  <Typography variant="body2" color="primary">
                    {job.type}
                  </Typography>
                  <Button component={Link} to={`/jobs/${job.id}`} variant="contained" color="primary" sx={{ mt: 2 }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No jobs found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default JobList;


