const router = require("express").Router();
const path = require("path");

module.exports = () => {
  // Load exercise page
  router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  return router;
}