import express from "express";
import movieRouter from "./routes/movieRoutes.js";
import authRouter from "./routes/authRoutes.js"
import watchlistRouter from "./routes/watchlistRoutes.js"
import { config } from "dotenv"
import { connectDB, disconnectDB } from "./config/db.js";

config()
connectDB()

const app = express()

// Body parsing Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
app.use("/movies", movieRouter)
app.use("/auth", authRouter)
app.use("/watchlist", watchlistRouter)

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