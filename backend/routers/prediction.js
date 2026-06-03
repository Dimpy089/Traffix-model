const express = require("express");
const { createPredictionInput, predictRisk } = require("../controllers/predictioninput.js");
const {predictAccident}=require("../controllers/apicontrollers.js")
const router = express.Router();

router.post("/predict", predictRisk);
router.post("/predictioninput", createPredictionInput);
router.post("/prediction", predictAccident);

module.exports = router;
