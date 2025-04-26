import express from 'express';
import dotenv from 'dotenv';
import orderRoutes from './routes/order.routes';
import customerRoutes from './routes/customer.routes';
import { cassandraClient } from './config/cassandra';
// import { logger } from './utils/logger';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';

dotenv.config();

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).send('Healthy');
  });


app.use('/api/orders', orderRoutes); 
app.use('/api/customers', customerRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// import express from 'express';
// import customerRoutes from './routes/customer.routes';

// const app = express();
// app.use(express.json());

// // Use the router for customer routes
// app.use('/api/customers', customerRoutes);

const port = process.env.PORT || 3000;

(async () => {
  try {
    await cassandraClient.connect();
    console.info('Connected to Cassandra');

    app.listen(port, () => {
        console.info(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to Cassandra', error);
    process.exit(1);
  }
})();
