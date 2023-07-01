import Controller from "../controllers/user.js";

export default function (fastify, opts, done) {
  const controller = new Controller()

  fastify.get('/', controller.GET)
  fastify.get('/:id', controller.GET)
  fastify.post('/', controller.POST)
  fastify.put('/:id', controller.PUT)
  fastify.delete('/:id', controller.DELETE)

  done();
}