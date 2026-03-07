import { FastifyInstance } from 'fastify';
import { healthRoute } from './healthRoute';
import { telemetryRoute } from './telemetryRoute';

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(healthRoute);
  await fastify.register(telemetryRoute);
}
