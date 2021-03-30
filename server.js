const express = require("express");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

// Logging
app.use(logger("dev"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static routing
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
