import { Request, Response } from 'express';
import { OrderController } from '../../src/controllers/order.controller';
import { OrderService } from '../../src/services/order.service';
import { logger } from '../../src/utils/logger';

jest.mock('../../src/services/order.service');
jest.mock('../../src/utils/logger');

describe('OrderController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create an order and return 201 status', async () => {
            const mockOrder = {
                id: '123e4567-e89b-12d3-a456-426614174000',
                customer_id: 'b4ecd495-72d0-43bc-b5fd-a4bcc98a56c2',
                item: 'Laptop',
                quantity: 1,
                price: 1200,
                createdAt: new Date(),
              }
            req.body = { 
                customer_id: 'b4ecd495-72d0-43bc-b5fd-a4bcc98a56c2',
                item: 'Laptop',
                quantity: 1,
                price: 1200};

            (OrderService.create as jest.Mock).mockResolvedValue(mockOrder);

            await OrderController.create(req as Request, res as Response);

            expect(OrderService.create).toHaveBeenCalledWith(req.body);
            expect(logger.info).toHaveBeenCalledWith('Order created');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockOrder);
            
        });

        it('should handle errors and return 500 status', async () => {
            const mockError = new Error('Create Order Error');
            req.body = { item: 'Test Item' };
            (OrderService.create as jest.Mock).mockRejectedValue(mockError);

            await OrderController.create(req as Request, res as Response);

            expect(OrderService.create).toHaveBeenCalledWith(req.body);
            expect(logger.error).toHaveBeenCalledWith('Create Order Failed', mockError);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Failed to create order');
        });
    });

    describe('getAll', () => {
        it('should retrieve all orders and return them', async () => {
            // const mockOrders = [{ id: 1, item: 'Test Item' }];
            const mockOrders = [{
                id: '123e4567-e89b-12d3-a456-426614174000',
                customer_id: 'b4ecd495-72d0-43bc-b5fd-a4bcc98a56c2',
                item: 'Laptop',
                quantity: 1,
                price: 1200,
                createdAt: new Date(),
              },
              {
                id: '3ef8f4bf-8a2c-4872-bd43-c993ebe9a4d0',
                customer_id: 'b4ecd495-72d0-43bc-b5fd-a4bcc98a56c2',
                item: 'Mouse',
                quantity: 1,
                price: 50,
                createdAt: new Date(),
              }
            ];
            
            (OrderService.findAll as jest.Mock).mockResolvedValue(mockOrders);

            await OrderController.getAll(req as Request, res as Response);

            expect(OrderService.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockOrders);
        });

        it('should handle errors and return 500 status', async () => {
            const mockError = new Error('Retrieve Orders Error');
            (OrderService.findAll as jest.Mock).mockRejectedValue(mockError);

            await OrderController.getAll(req as Request, res as Response);

            expect(OrderService.findAll).toHaveBeenCalled();
            expect(logger.error).toHaveBeenCalledWith('Retrieve Orders Failed', mockError);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Failed to retrieve orders');
        });
    });
});