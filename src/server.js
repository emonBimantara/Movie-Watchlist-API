import express from "express";
import movieRouter from "./routes/movieRoutes.js";

const app = express()

app.use("/movies", movieRouter)

const port = 5001
app.listen(port, () => {
    console.log(`Server running on PORT ${port}`)
})