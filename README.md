🧑‍💼 Job Board Application

A full-stack job board platform built with React, Node.js, Express, and MongoDB. It enables employers to post job listings and applicants to apply with their resumes.

📌 Table of Contents

Features

Tech Stack

Installation

Usage

Folder Structure

Known Issues

Contributing

License

✨ Features

Employers can create, read, update, and delete job postings.

Applicants can submit applications with their resumes.

Real-time form validation and user feedback.

Resume uploads stored on the server.

Responsive design for various devices.

🛠 Tech Stack

Frontend: React, React Router, Material UI

Backend: Node.js, Express.js, MongoDB, Mongoose

File Uploads: Multer

API Testing: Postman

🚀 Installation

Prerequisites

Node.js and npm installed

MongoDB installed and running

Steps

Clone the repository:

bash

Copy

Edit

git clone https://github.com/yourusername/job-board.git

cd job-board

Install backend dependencies:

bash

Copy

Edit

cd job-board-backend

npm install

Install frontend dependencies:

bash

Copy

Edit

cd ../job-board-frontend

npm install

Create the uploads directory:

In the job-board-backend directory, create a folder named uploads to store uploaded resumes:

bash

Copy

Edit

mkdir uploads

Start the backend server:


bash

Copy

Edit

cd ../job-board-backend

node server.js

Start the frontend development server:


bash

Copy

Edit

cd ../job-board-frontend

npm start

The application should now be running at http://localhost:3000.


🐞 Known Issues

Resume Upload Error: Ensure the uploads folder exists in the backend directory to prevent file not found errors.



Job ID Error: When applying for a job, ensure that the job ID in the URL is a valid MongoDB ObjectId. For example, use /api/jobs/60d21b4667d0d8992e610c85/apply instead of 

/api/jobs/1/apply.



🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.


