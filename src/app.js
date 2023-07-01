import Fastify from 'fastify'
import cors from '@fastify/cors'
import jsonParser from 'fastify-xml-body-parser'
import { dbConnection, sequelize } from './modules/sequelize.js'
import mockDataFunction from './modules/mockdata.js'
import orderRouter from './routes/order.js'
import userRouter from './routes/user.js'
import foodRouter from './routes/food.js'
import config from './config/config.js'

const fastify = Fastify({
  logger: false,
})

async function main() {
  await dbConnection()
  await mockDataFunction(sequelize)

  await fastify.register(cors, { 
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })

  fastify.addHook('onRequest', (req, _, done) => {
    req.models = sequelize.models
    done()
  })
  
  fastify.register(jsonParser)
  fastify.register(userRouter, { prefix: '/api/users' }) 
  fastify.register(foodRouter, { prefix: '/api/foods' })
  fastify.register(orderRouter, { prefix: '/api/orders' })

  fastify.listen({ port: config.server.port }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`server is running at ${address}`)
  })
}

main();