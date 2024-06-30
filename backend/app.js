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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname,'..', 'my-app', 'dist')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Upload route
app.post('/uploads', upload.array('files'), (req, res) => {
  const files = req.files;
  if (!files) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  res.json({ 
    message: 'Files uploaded successfully',
    files: files
   });
});

// Get file metadata
app.get('/files', (req, res) => {
  fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read files' });
    }
    res.json(files);
  });
});

// Get file as param:
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename
  const filepath = path.join(__dirname, 'uploads', filename)
  if (fs.existsSync(filepath))
  {
    res.setHeader('Content-Disposition', 'inline');
    res.sendFile(filepath);
  }
  else
  {
    res.status(404).json({error: 'File not found'})
  }
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'my-app', 'dist', 'index.html'));
})

// Delete uploads dir:
app.delete('/delete', (req, res) => {
  if (!fs.existsSync(uploadsDir)) {
    return '';
  }
  fs.rmdirSync(uploadsDir, { recursive: true });
  res.json({message: 'uploads dir is deleted'})
})
// Clear uploads directory on server start
const uploadsDir = path.join(__dirname, 'uploads');
if (fs.existsSync(uploadsDir)) {
  fs.rmdirSync(uploadsDir, { recursive: true });
  console.log(`Deleted ${uploadsDir} and its contents on server start.`);
}
fs.mkdirSync(uploadsDir, { recursive: true });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
