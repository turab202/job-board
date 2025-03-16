const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Job = require("../models/JobModel");
const JobApplication = require("../models/jobApplicationModel");

dotenv.config();
const router = express.Router();

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save resumes in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// ✅ Job Posting Route (Fixes 404 Error)
router.post("/add", async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      description,
    });

    await newJob.save();
    res.status(201).json({ message: "✅ Job posted successfully!", job: newJob });
  } catch (error) {
    console.error("🔥 Job Posting Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Job Application Route
router.post("/:jobId/apply", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, coverLetter } = req.body;
    const { jobId } = req.params;
    const resumePath = req.file ? req.file.path : null;

    if (!name || !email || !coverLetter || !resumePath) {
      return res.status(400).json({ message: "All fields and resume are required!" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }

    // ✅ Save application in DB
    const application = new JobApplication({
      job: jobId,
      name,
      email,
      coverLetter,
      resume: resumePath,
    });
    await application.save();

    // ✅ Send Email Notification via Outlook
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // ✅ Fetch from environment variables
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Application Received",
      text: `Dear ${name},\n\nYour application for "${job.title}" has been received. We will review it soon.\n\nBest regards,\nJob Board Team`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Application submitted successfully!", application });
  } catch (error) {
    console.error("🔥 Job Application Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;



