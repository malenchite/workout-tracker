const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date
  },
  exercises: [{
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: Number,
      required: true,
      validate: [num => num > 0, "Duration must be >0"]
    },
    weight: {
      type: Number,
      required: true,
      validate: [num => num > 0, "Weight must be >0"]
    },
    reps: {
      type: Number,
      required: true,
      validate: [num => num > 0, "Reps must be >0"]
    },
    sets: {
      type: Number,
      required: true,
      validate: [num => num > 0, "Sets must be >0"]
    }
  }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;