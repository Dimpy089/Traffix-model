import express from "express"
import cors from "cors"

import predictionRoutes from "./routes/prediction.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", predictionRoutes)

export default app