const express = require("express");
const { createPredictionInput } = require("../controllers/predictioninput.js");
const {predictAccident}=require("../controllers/apicontrollers.js")
const router = express.Router();

router.post("/predictioninput", createPredictionInput);
router.post("/prediction", predictAccident);

module.exports = router;