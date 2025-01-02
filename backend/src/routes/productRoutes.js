import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Import middleware de autenticação

const router = express.Router();

// CRUD routes for Product
router.post("/", authMiddleware, productController.createProduct); // Criar um novo produto
router.get("/", productController.getAllProducts); // Obter todos os produtos
router.get("/manufacturer/:manufacturerName", productController.getProductsByManufacturer); // Obter produtos por fabricante
router.get(
  "/manufacturer/:trackingCode",
  productController.getProductByTrackingCode
); // Obter produtos por código de rastreamento
router.get("/status/:status", productController.getProductsByStatus); // Obter produtos por status

// Routes for Tracking related to Product
router.post("/:productId/tracking", authMiddleware, productController.addTracking); // Adicionar rastreamento para um produto
router.get("/:productId/tracking", productController.getTrackingsByProduct); // Obter todos os rastreamentos de um produto

export default router;
