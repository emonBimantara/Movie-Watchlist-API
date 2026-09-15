import express from "express";
import { addToWatchList } from "../controller/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

router.use(authMiddleware)
router.post("/", addToWatchList)

export default router