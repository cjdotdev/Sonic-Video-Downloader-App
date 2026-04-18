import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

const schema = {
  type: 'object',
  required: ['PORT', 'JWT_SECRET', 'FRONTEND_URL'],
  properties: {
    PORT:         { type: 'number', default: 3000 },
    JWT_SECRET:   { type: 'string' },
    FRONTEND_URL: { type: 'string' }
  }
}

export default fp(async (fastify) => {
  await fastify.register(fastifyEnv, { schema, dotenv: true })
})