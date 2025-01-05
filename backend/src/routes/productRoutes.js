import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, productController.createProduct); // Criar um novo produto
router.get("/", productController.getAllProducts); // Obter todos os produtos
router.get("/cnpj", productController.getProductsByCNPJ); // Obter produtos por CNPJ
// router.get(
//   "/tracking/:trackingCode",
//   productController.getProductByTrackingCode
// ); // Obter produto por código de rastreamento

// Routes for Tracking related to Product
router.post(
  "/tracking/:trackingCode",
  authMiddleware,
  productController.addTracking
); // Adicionar rastreamento para um produto
router.get(
  "/tracking/:trackingCode",
  productController.getTrackingsByTrackingCode
); // Obter todos os rastreamentos de um produto

// Routes for Final Destination
router.get(
  "/tracking/:trackingCode/destination",
  productController.getFinalDestinationByTrackingCode
); // Obter destino final pelo código de rastreamento

export default router;
