import userRouter from "./routes/userRouter";

// ESM
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})


// Register routers
fastify.register(userRouter, { prefix: '/users' });

export default fastify;



