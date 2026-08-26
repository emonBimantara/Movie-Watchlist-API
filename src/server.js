import express from "express";
import movieRouter from "./routes/movieRoutes.js";
import { config } from "dotenv"
import { disconnectDB } from "./config/db.js";

config()
const app = express()

app.use("/movies", movieRouter)

const port = 5001
app.listen(port, () => {
    console.log(`Server running on PORT ${port}`)
})

// Handle unhandle promise rejection (DB Connection Errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection: ", err)
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})

// Handle uncaught exception
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception: ", err)
    await disconnectDB()
    process.exit(1)
})


// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM Received, shutting down gracefully")
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})