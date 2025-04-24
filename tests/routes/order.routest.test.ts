import request from 'supertest';
import express from 'express';
import orderRoutes from '../../src/routes/order.routes';
import { OrderService } from '../../src/services/order.service';

const app = express();
app.use(express.json());
app.use('/api/orders', orderRoutes);

describe('Order Routes', () => {
  const mockOrder = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    customer_id: 'cust-001',
    item: 'Laptop',
    quantity: 1,
    price: 1200,
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

    it('POST /api/orders - should create a new order', async () => {
    jest.spyOn(OrderService, 'create').mockResolvedValue(mockOrder);

    const res = await request(app).post('/api/orders').send({
      customer_id: 'cust-001',
      item: 'Laptop',
      quantity: 1,
      price: 1200,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id', mockOrder.id);
  });

    it('GET /api/orders - should retrieve all orders', async () => {
        jest.spyOn(OrderService, 'findAll').mockResolvedValue([mockOrder]);
    
        const res = await request(app).get('/api/orders');
    
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toHaveProperty('id', mockOrder.id);
    });
});
