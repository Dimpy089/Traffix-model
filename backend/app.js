import express from "express";
import predictionRoutes from "./routes/prediction.routes.js";

const app = express();

app.use(express.json());

app.post("/predictioninput", predictionRoutes);

export default app;