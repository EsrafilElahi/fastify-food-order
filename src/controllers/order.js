import config from "../config/config.js"

class Controller {
  async GET(req, res){
    try {
      const orderModel = req.models.orders
      const userModel = req.models.users
      const foodModel = req.models.foods

      const { pagination } = config
      const { page, limit } = { page: req.query.page || pagination.page, limit: req.query.limit || pagination.limit }
      
      delete req.query.page
      delete req.query.limit
      
      orderModel.belongsTo(userModel, { foreignKey: "user_id" })
      orderModel.belongsTo(foodModel, { foreignKey: "food_id" })

      const orders = await orderModel.findAll({
        where: {...req.query, ...req.params}, 
        attributes: ["id", "user_id", "food_id", "count", "order_created_at", "order_updated_at"],
        include: [{
            model: userModel,
            as: "user",
            require: true,
          }, {
            model: foodModel,
            as: "food",
            required: true,
          }
        ]
      })
      const paginated_orders = orders.slice(page * limit - limit, page * limit)
      
      return res.send({ message: "order data successfully finded.", data: paginated_orders })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async POST(req, res){
    try {
      const orderModel = req.models.orders
      const insert_order = await orderModel.create({ ...req.body, returning: true })

      return res.send({ message: "order data successfully inserted.", data: insert_order })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async PUT(req, res){
    try {
      const orderModel = req.models.orders
      const updated_order = await orderModel.update(req.body, { where: req.params, returning: true, plain: true })
      
      return res.send({ message: "order data successfully updated.", data: updated_order[1] || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async DELETE(req, res){
    try {
      const orderModel = req.models.orders
      const order = await orderModel.findOne({ where: req.params })
      await orderModel.destroy({ where: req.params })

      return res.send({ message: "order data successfully deleted.", data: order || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }
}


export default Controller