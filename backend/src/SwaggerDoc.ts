import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Ranking',
      version: '1.0.0',
      description: 'Documentação da API Ranking',
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};
export const swaggerSpec = swaggerJsdoc(swaggerOptions);