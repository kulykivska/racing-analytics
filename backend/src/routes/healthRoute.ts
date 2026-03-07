import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function healthRoute(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.get('/health', async (_request, _reply) => {
    return { status: 'ok' };
  });
}
