# Nodejs notes:

## Modules:

### Express:

- **Purpose:**  `express` is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- **Usage:** It is used to create servers and handle HTTP requests and responses.

### Multer:

- **Purpose:** `multer` is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

- **Usage:** It handles file uploads and stores the uploaded files on the server.

### Cors:

- **Purpose:** `cors` is a Node.js package for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing (CORS) with various options.

- **Usage:** It allows your server to accept requests from different origins (IP) (useful for API development).

### Path:

- **Purpose:** `path` is a built-in Node.js module that provides utilities for working with file and directory paths.

- **Usage:** It helps in handling and transforming file paths.

### Fs:

- **Purpose:** fs (File System) is a built-in Node.js module that allows you to interact with the file system in a way modeled on standard POSIX functions.

- **Usage:** It is used to read, write, delete, and manage files and directories.

```js
    // Importing modules
    const express = require('express');
    const multer = require('multer');
    const cors = require('cors');
    const path = require('path');
    const fs = require('fs');

    // Server
    const app = express(); // Create an express application
    const port = 5000; // Define the port the server will listen on

    // Middlewares
    app.use(cors()); // Use CORS middleware to enable cross-origin requests
    app.use(express.json()); // Use JSON middleware to parse JSON requests
    app.use(express.static('uploads')); // Serve files from uploads directory.
        
    //Configure Multer for file uploads
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, __dirname + "uploads")
        },
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}-${file.originalname}`)
        }
    })
    const upload = multer({storage: storage})

    // Upload files
    app.post('/uploads', upload.array("files"), (req, res) => {
        res.json({
            message: "Files uploaded successfully",
            files: req.files
        })
    })

    // Get files
    app.get('/files/', (req, res) => {
        fs.readdir('uploads', (err, files) => {
            if (err)
            {
                return res.status(500).json({error: 'Unable to read file'})
            }
            res.json(files)
        })
    })

    // Start the server
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
```

### Express static middleware:

* **Express Middleware for Serving Static Files**

    - **Def:** Static files are files that clients (browsers) request that do not change. These include HTML files, CSS files, JavaScript files, images, videos, and other assets. Serving static files efficiently is a common requirement for web servers.

    - **Usage:** `express.static` is a built-in middleware function in Express. It is used to serve static files from a specified directory. 
    `app.use(express.static('public')); // here public folder for example.`