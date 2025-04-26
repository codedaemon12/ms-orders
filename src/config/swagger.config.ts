// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Microservice API',
      version: '1.0.0',
      description: 'API documentation for Order and Customer services',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Adjust the path as needed
});
