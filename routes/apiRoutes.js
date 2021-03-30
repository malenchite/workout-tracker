const router = require("express").Router();

module.exports = db => {
  const WorkoutController = require("../controllers/workoutController.js")(db);

  router.get("/workouts", WorkoutController.getWorkouts);

  return router;
}