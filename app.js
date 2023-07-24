const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the "public" folder
app.use(express.static(__dirname + "/public"));

// Define routes for different HTML pages
app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));
app.get("/performance", (req, res) => res.sendFile(__dirname + "/public/performance.html"));
app.get("/photos", (req, res) => res.sendFile(__dirname + "/public/photos.html"));
app.get("/events", (req, res) => res.sendFile(__dirname + "/public/events.html"));
app.get("/contact", (req, res) => res.sendFile(__dirname + "/public/contact.html"));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
