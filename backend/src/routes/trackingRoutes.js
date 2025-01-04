import express from "express";
import trackingController from "../controllers/trackingController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Importando middleware de autenticação

const router = express.Router();

// Routes for Tracking
router.post(
  "/tracking/:trackingCode",
  authMiddleware,
  trackingController.createTracking
); // Criar uma nova entrada de tracking
router.get("/", trackingController.getAllTrackings); // Buscar todos os rastreamentos
router.get("/:trackingId", trackingController.getTrackingById); // Buscar rastreamento pelo ID

export default router;
