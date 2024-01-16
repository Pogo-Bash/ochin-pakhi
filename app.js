const express = require("express");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;


// Limit maximum request size
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '11kb' }));
 
// Prevent Clickjacking
app.use(helmet.frameguard({ action: 'sameorigin' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "/build")));
app.use(express.static(path.join(__dirname, "/build"), {
  setHeaders: (res, filePath) => {
    if (path.extname(filePath) === ".jpg" || path.extname(filePath) === ".jpeg" || path.extname(filePath) === ".png" || path.extname(filePath) === ".gif") {
      res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache images for 1 year (adjust as needed)
    }
    if (path.extname(filePath) === ".png" || path.extname(filePath) === ".jpeg" || path.extname(filePath) === ".png" || path.extname(filePath) === ".gif") {
      res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache images for 1 year (adjust as needed)
    }
    if (path.extname(filePath) === ".html" || path.extname(filePath) === ".css" || path.extname(filePath) === ".js") {
      res.setHeader("Content-Encoding", "gzip");
    }
  }
}));

// Define routes for different HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/build/index.html")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/build/index.html")));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
