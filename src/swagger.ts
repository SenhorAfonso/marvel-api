import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Marvel API',
    description: 'API Documentation for the Marvel API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },

    tags: [
      {
        name: 'User',
        description: 'User endpoints',
      },
      {
        name: 'Comic',
        description: 'Comic endpoints',
      },
      {
        name: 'Creator',
        description: 'Creator endpoints',
      },
      {
        name: 'Character',
        description: 'Character endpoints',
      },
    ],
  },
};

const outputFile = '../swagger_output.json';
const endpointsFiles = [
  './src/routes/userRoute.ts',
  './src/routes/comicRoute.ts',
  './src/routes/creatorsRoute.ts',
  './src/routes/character_route.ts',
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
