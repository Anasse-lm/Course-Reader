const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes

// Cleanup uploads directory on server start
const uploadsDir = './uploads';
if (fs.existsSync(uploadsDir)) {
    fs.rmdirSync(uploadsDir, { recursive: true });
    console.log(`Deleted ${uploadsDir} and its contents on server start.`);
  } else {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created ${uploadsDir} directory on server start.`);
  }

// Upload files
app.post('/uploads', upload.array('files'), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  res.json({
    message: 'Files uploaded successfully',
    files: req.files,
  });
});

// Get file metadata
app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read files' });
    }
    res.json(files);
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
