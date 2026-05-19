const express = require("express");
const { createPredictionInput } = require("../controllers/predictioninput.js");

const router = express.Router();

router.post("/predictioninput", createPredictionInput);

module.exports = router;