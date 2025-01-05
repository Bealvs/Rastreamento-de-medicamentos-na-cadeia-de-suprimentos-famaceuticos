import express from "express";
import {
  addTracking,
  createProduct,
  getAllProducts,
  getFinalDestinationByTrackingCode,
  getProductsByCNPJ,
  getTrackingsByTrackingCode
} from "../controllers/medicationTrackingController.js"; // Import user-related controllers
import authMiddleware from "../middlewares/authMiddleware.js"; // Import middleware de autenticação

const router = express.Router();

// CRUD routes for Product
router.post("/", authMiddleware, createProduct); // Criar um novo produto
router.get("/", getAllProducts); // Obter todos os produtos
router.get("/cnpj", getProductsByCNPJ); // Obter produtos por CNPJ

// Routes for Tracking related to Product
router.post(
  "/tracking/:trackingCode",
  authMiddleware,
  addTracking
); // Adicionar rastreamento para um produto
router.get(
  "/tracking/:trackingCode",
  getTrackingsByTrackingCode
); // Obter todos os rastreamentos de um produto

// Routes for Final Destination
router.get(
  "/tracking/:trackingCode/destination",
  getFinalDestinationByTrackingCode
); // Obter destino final pelo código de rastreamento

export default router;
