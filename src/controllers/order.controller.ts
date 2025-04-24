import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { logger } from '../utils/logger';

export const OrderController = {
  async create(req: Request, res: Response) {
    try {
      const order = await OrderService.create(req.body);
      logger.info('Order created');
      res.status(201).json(order);
    } catch (err) {
      logger.error('Create Order Failed', err);
      res.status(500).send('Failed to create order');
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderService.findAll();
      res.json(orders);
    } catch (err) {
      logger.error('Retrieve Orders Failed', err);
      res.status(500).send('Failed to retrieve orders');
    }
  },
};
