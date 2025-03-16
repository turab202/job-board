const express = require("express");
const mongoose = require("mongoose");
const JobApplication = require("../models/jobApplicationModel");

const router = express.Router();

// Submit a job application
router.post("/:jobId/apply", async (req, res) => {
  try {
    const { applicantName, email, resume, coverLetter } = req.body;
    const { jobId } = req.params; // Access jobId from route parameters

    // Check if all required fields are provided
    if (!applicantName || !email || !resume) {
      return res.status(400).json({ message: "All required fields must be filled!" });
    }

    // Ensure jobId is a valid ObjectId before saving the application
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    // Convert jobId to a valid ObjectId
    const jobObjectId = mongoose.Types.ObjectId(jobId);

    const application = new JobApplication({
      jobId: jobObjectId,
      applicantName,
      email,
      resume,
      coverLetter,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;



