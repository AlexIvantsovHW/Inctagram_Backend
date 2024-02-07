import cors from 'cors';

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type']
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
