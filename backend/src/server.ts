import Fastify from 'fastify';
import cors from '@fastify/cors';
import { registerRoutes } from './routes';

const server = Fastify({ logger: true });

const start = async () => {
  try {
    // Enable CORS for frontend
    await server.register(cors, {
      origin: true, // Allow all origins in development
    });
    
    await registerRoutes(server);
    
    const port = Number(process.env.PORT) || 3000;
    await server.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
