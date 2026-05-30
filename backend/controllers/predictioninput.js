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
      curvature === undefined ||
      speed_limit === undefined ||
      !lighting ||
      !weather ||
      num_reported_accidents === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

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

    const mlResponseText = await mlResponse.text();

    if (!mlResponse.ok) {
      throw new Error(
        `ML prediction service failed with status ${mlResponse.status}: ${mlResponseText}`
      );
    }

    const mlResult = JSON.parse(mlResponseText);
    const riskScore = mlResult.prediction;

    const riskLevel =
      riskScore >= 0.7 ? "High" :
      riskScore >= 0.4 ? "Medium" :
      "Low";

    // save data
    //this saves data to the database
    
    const predictionData = await Prediction.create({
      curvature,
      speed_limit,
      lighting,
      weather,
      num_reported_accidents,
    });

    return res.status(201).json({
      success: true,
      message: "Input stored and prediction generated successfully",
      data: predictionData,
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
};