import { Request, Response } from 'express';
import { CustomerService  } from '../services/customer.service';
import { logger } from '../utils/logger';

export const CustomerController = {
    async create(req: Request, res: Response) {
        try {
            const customer = await CustomerService.create(req.body);
            logger.info('Customer created');
            res.status(201).json(customer);
        } catch (err) {
            logger.error('Create Customer Failed', err);
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
            logger.error('Retrieve Customer Failed', err);
            res.status(500).send('Failed to retrieve customer');
        }
    },
    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                return res.status(400).send('Invalid customer ID format');
            }
            const updatedCustomer = await CustomerService.update(id as `${string}-${string}-${string}-${string}-${string}`, req.body);
            if (!updatedCustomer) {
                return res.status(404).send('Customer not found');
            }
            res.json(updatedCustomer);
        } catch (err) {
            logger.error('Update Customer Failed', err);
            res.status(500).send('Failed to update customer');
        }
    },
};
