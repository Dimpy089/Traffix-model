const { Prediction } = require("../models/predictioninput.js");

 const createPredictionInput = async (req, res) => {
  try {
    const {
      curvature,
      speed_limit,
      lighting,
      weather,
      num_reported_accidents,
    } = req.body;

    // validation
    if (
      !curvature ||
      !speed_limit ||
      !lighting ||
      !weather ||
      num_reported_accidents === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // save data
    const predictionData = await Prediction.create({
      curvature,
      speed_limit,
      lighting,
      weather,
      num_reported_accidents,
    });

    return res.status(201).json({
      success: true,
      message: "Input stored successfully",
      data: predictionData,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    createPredictionInput
};