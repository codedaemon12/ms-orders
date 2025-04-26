import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';

const router = Router();
/**
 * @openapi
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created
 */
router.post('/', CustomerController.create);

/**
 * @openapi
 * /customers/{id}:
 *   get:
 *     summary: Get a single customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *       404:
 *         description: Customer not found
 */

router.get('/:id', async (req, res) => { CustomerController.getCustomerById(req, res); });

router.put('/:id', async (req, res) => { CustomerController.update(req, res); });


export default router;
