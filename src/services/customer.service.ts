import { UUID } from 'crypto';
import { cassandraClient } from '../config/cassandra';
import { Customer } from '../models/customer.model';
import { v4 as uuidv4 } from 'uuid';

export const CustomerService = {    

    async create(customer: Omit<Customer, 'customer_id' | 'created_at' | 'updated_at'>): Promise<Customer> {    
        const customer_id = uuidv4();
        const created_at = new Date();
        const updated_at = new Date();

        await cassandraClient.execute(
            'INSERT INTO customers (customer_id, first_name, last_name, addr_line1, addr_line2, zip_code, cust_state, city, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [customer_id, customer.first_name, customer.last_name, customer.addr_line1, customer.addr_line2, customer.zip_code, customer.cust_state, customer.city, created_at, updated_at],
            { prepare: true }
        );

        return {
            ...customer,
            customer_id,
            created_at,
            updated_at,
        } as Customer;
    } ,
    async findCustomerById(id: UUID): Promise<Customer | null> {
        const query = 'SELECT * FROM customers WHERE customer_id = ?';
        const result = await cassandraClient.execute(query, [id], { prepare: true });

        if (result.rowLength === 0) {
            return null;
        }

        const row = result.first();
        return {
            id: row['id'],
            customer_id: row['customer_id'],
            first_name: row['first_name'],
            last_name: row['last_name'],
            addr_line1: row['addr_line1'],
            addr_line2: row['addr_line2'],
            zip_code: row['zip_code'],
            cust_state: row['cust_state'],
            city: row['city'],
            created_at: row['created_at'],
            updated_at: row['updated_at'],
        } as Customer;
    }
};

