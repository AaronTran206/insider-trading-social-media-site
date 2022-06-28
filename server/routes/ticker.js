import express from "express"
import { fetchHistoricalPrice } from "../controllers/ticker.js"

const router = express.Router()

//route to fetch historical data of ticker
router.get("/:ticker", fetchHistoricalPrice)

export default router
