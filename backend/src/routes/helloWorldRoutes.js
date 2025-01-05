import express from "express";
import helloWorldController from "../controllers/helloWorldController.js";

const router = express.Router();

// Rotas para interação com o contrato
router.get(
  "/message",
  helloWorldController.getMessage.bind(helloWorldController)
);
router.post(
  "/message",
  helloWorldController.setMessage.bind(helloWorldController)
);

export default router;
