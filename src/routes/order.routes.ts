import express from 'express';
import { OrderController } from '../controllers/order.controller';

const router = express.Router();

router.post('/orders', OrderController.create);
router.get('/orders', OrderController.getAll);

export default router;
