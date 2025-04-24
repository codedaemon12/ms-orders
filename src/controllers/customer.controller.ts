import { Request, Response } from 'express';
import { CustomerService  } from '../services/customer.service';


// export const CustomerController = {
//     async create(req: Request, res: Response) {
//         try {
//         const customer = await CustomerService.create(req.body);
//         console.info('Customer created');
//         res.status(201).json(customer);
//         } catch (err) {
//         console.error('Create Customer Failed', err);
//         res.status(500).send('Failed to create customer');
//         }
//     },
//     async getCustomerById(req: Request, res: Response) {
//         try {
//         const id = req.params.id;
//         const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

//         if (!uuidRegex.test(id)) {
//             return res.status(400).send('Invalid customer ID format');
//         }
//         const customer = await CustomerService.findCustomerById(id as `${string}-${string}-${string}-${string}-${string}`);
//         res.json(customer);
//         } catch (err) {
//         console.error('Retrieve Orders Failed', err);
//         res.status(500).send('Failed to retrieve orders');
//         }
//   },
// };

export const CustomerController = {
    async create(req: Request, res: Response) {
        try {
            const customer = await CustomerService.create(req.body);
            console.info('Customer created');
            res.status(201).json(customer);
        } catch (err) {
            console.error('Create Customer Failed', err);
            res.status(500).send('Failed to create customer');
        }
    },
    async getCustomerById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                return res.status(400).send('Invalid customer ID format');
            }
            const customer = await CustomerService.findCustomerById(id as `${string}-${string}-${string}-${string}-${string}`);
            if (!customer) {
                return res.status(404).send('Customer not found');
            }
            res.json(customer);
        } catch (err) {
            console.error('Retrieve Customer Failed', err);
            res.status(500).send('Failed to retrieve customer');
        }
    },
};
