module.exports = db => {
  return {
    // Get all workouts with aggregated duration
    getWorkouts: (req, res) => {
      db.Workout.aggregate([
        {
          $sort: { day: 1 }
        },
        {
          $addFields: {
            totalDuration: {
              $sum: ["$exercises.duration"]
            }
          }
        }
      ])
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
