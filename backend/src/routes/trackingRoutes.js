import express from "express";
import trackingController from "../controllers/trackingController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Import authentication middleware

const router = express.Router();

// Routes for Tracking
router.post("/:productId", authMiddleware, trackingController.createTracking);
router.get("/", trackingController.getAllTrackings);
router.get("/:trackingId", trackingController.getTrackingById);

export default router;
