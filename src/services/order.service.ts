import { cassandraClient } from '../config/cassandra';
import { Order } from '../models/order.model';
import { v4 as uuidv4 } from 'uuid';

export const OrderService = {
  async create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const id = uuidv4();
    const createdAt = new Date();
    await cassandraClient.execute(
      'INSERT INTO orders (id,customer_id, item, quantity, price, created_at) VALUES (?,?, ?, ?, ?, ?)',
      [id, order.customer_id,order.item, order.quantity, order.price, createdAt],
      { prepare: true }
    );
    return { id, ...order, createdAt };
  },

  async findAll(): Promise<Order[]> {
    const result = await cassandraClient.execute('SELECT * FROM orders');
    return result.rows.map(row => ({
      id: row['id'],
      customer_id: row['customer_id'],
      item: row['item'],
      quantity: row['quantity'],
      price: row['price'],
      createdAt: row['created_at'],
    })) as Order[];
  },
};
