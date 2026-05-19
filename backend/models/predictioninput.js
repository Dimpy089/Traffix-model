const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    curvature: {
      type: String,
      required: true,
    },

    speed_limit: {
      type: Number,
      required: true,
    },

    lighting: {
      type: String,
      required: true,
    },

    weather: {
      type: String,
      required: true,
    },

    num_reported_accidents: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Prediction = mongoose.model(
  "Prediction",
  predictionSchema
);

module.exports = { Prediction };