import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const jobsData = [
  { id: 1, title: "Frontend Developer", company: "Google", location: "Remote", type: "Full-time", description: "We are looking for a skilled frontend developer to join our team at Google." },
  { id: 2, title: "Backend Developer", company: "Amazon", location: "USA", type: "Part-time", description: "Join our backend team at Amazon and work on scalable APIs." },
  { id: 3, title: "UI/UX Designer", company: "Microsoft", location: "Canada", type: "Contract", description: "Looking for a creative UI/UX designer to create stunning designs." },
  { id: 4, title: "Graphic Designer", company: "Adobe", location: "Remote", type: "Full-time", description: "Join our creative team to design graphics for marketing, websites, and product packaging." },
  { id: 5, title: "Video Editor", company: "Netflix", location: "USA", type: "Part-time", description: "Looking for a talented video editor to work on original content for our streaming platform." },
  { id: 6, title: "Full Stack Developer", company: "Facebook", location: "Remote", type: "Full-time", description: "Join our engineering team to build scalable, robust full stack applications." },
];

const JobDetail = () => {
  const { id } = useParams();
  const job = jobsData.find((job) => job.id === parseInt(id));

  if (!job) return <Typography variant="h5">Job Not Found</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{job.title}</Typography>
      <Typography color="textSecondary">{job.company}</Typography>
      <Typography>{job.location} | {job.type}</Typography>
      <Typography sx={{ mt: 2 }}>{job.description}</Typography>
      
      {/* Apply Now Button */}
      <Link to={`/jobs/${id}/apply`} style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Apply Now
        </Button>
      </Link>
    </Container>
  );
};

export default JobDetail;

