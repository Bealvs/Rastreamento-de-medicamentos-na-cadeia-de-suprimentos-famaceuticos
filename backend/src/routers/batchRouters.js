import express from 'express';
import { registerBatch, getBatchDetails } from '../controllers/batchController.js';

const router = express.Router();

// Rota para registrar um lote
router.post('/register', registerBatch);

// Rota para obter detalhes de um lote
router.get('/:batchId', getBatchDetails);

export default router;
