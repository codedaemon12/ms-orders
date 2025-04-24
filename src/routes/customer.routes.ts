import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';

const router = Router();

// Correct usage of controller methods
router.post('/', CustomerController.create);

router.get('/:id', async (req, res) => { CustomerController.getCustomerById(req, res); });


export default router;
