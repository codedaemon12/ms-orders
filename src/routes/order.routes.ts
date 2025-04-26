import express from 'express';
import { OrderController } from '../controllers/order.controller';

const router = express.Router();
/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               item:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', OrderController.create);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     description: Fetches an array of orders with details such as ID, customer ID, item, quantity, price, and creation date.
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: Unique identifier for the order
 *                   customer_id:
 *                     type: string
 *                     format: uuid
 *                     description: Unique identifier for the customer
 *                   item:
 *                     type: string
 *                     description: Name of the item ordered
 *                   quantity:
 *                     type: integer
 *                     description: Quantity of the item ordered
 *                   price:
 *                     type: string
 *                     description: Price of the item ordered
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the order was created
 */

router.get('/', OrderController.getAll);

export default router;
