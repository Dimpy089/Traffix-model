import express from "express";
import { createPredictionInput } from "../../../src/controllers/predictioninput.js";

const router = express.Router();

router.post("/predictioninput", createPredictionInput);

export default router;