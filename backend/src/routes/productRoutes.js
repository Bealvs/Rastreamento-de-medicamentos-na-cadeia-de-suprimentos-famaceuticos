import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Import authentication middleware

const router = express.Router();

// CRUD routes for Product
router.post("/", authMiddleware, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get(
  "/manufacturer/:manufacturerName",
  productController.getProductsByManufacturer
);
router.get("/status/:status", productController.getProductsByStatus);

// Routes for Tracking related to Product
router.post("/:productId/tracking", authMiddleware, productController.addTracking);
router.get("/:productId/tracking", productController.getTrackingsByProduct);

export default router;
