const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the "public" folder
app.use(express.static(__dirname + "/build"));
require('dotenv').config();

// Define routes for different HTML pages
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));
app.get("/performance", (req, res) => res.sendFile(__dirname + "/build/performance.html"));
app.get("/events", (req, res) => res.sendFile(__dirname + "/build/events.html"));


const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
