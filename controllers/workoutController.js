module.exports = db => {
  return {
    // Get all workouts
    getWorkouts: (req, res) => {
      db.Workout.find({})
        .sort({ day: 1 })
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          console.log(err);
          res.status(500).end();
        })
    }
  }
};
