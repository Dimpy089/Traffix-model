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




const predictRisk = async (req, res) => {
  try {
    const {
      curvature,
      speed_limit,
      lighting,
      weather,
      num_reported_accidents,
    } = req.body;

    const mlResponse = await fetch("http://127.0.0.1:5001/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curvature,
        speed_limit,
        lighting,
        weather,
        num_reported_accidents,
      }),
    });

    const mlResult = await mlResponse.json();

    const riskScore = mlResult.prediction;

    const riskLevel =
      riskScore >= 0.7
        ? "High"
        : riskScore >= 0.4
        ? "Medium"
        : "Low";

    return res.status(200).json({
      success: true,
      riskScore,
      riskLevel,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
   createPredictionInput,
  predictRisk,
};