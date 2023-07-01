import config from '../config/config.js'

class Controller {
  async GET(req, res) {
    try {
      const foodModel = req.models.foods
      const pagination = config.pagination
      const { page, limit } = { page: req.query.page || pagination.page, limit: req.query.limit || pagination.limit }
      const foods = await foodModel.findAll({where: req.params, order: [["id", "ASC"]] })
      const paginated_foods = foods.slice(page * limit - limit, page * limit)

      return res.send({ message: 'food data successfully finded.', data: req.params.id ? (paginated_foods[0] || {}) : (paginated_foods || []) })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async POST(req, res) {
    try {
      const foodModel = req.models.foods
      const new_food = await foodModel.create(req.body)

      return res.send({ message: 'food data successfully inserted.', data: new_food || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async PUT(req, res) {
    try {
      const foodModel = req.models.foods
      const updated_food = await foodModel.update(req.body, { where: req.params, returning: true, plain: true })
      
      return res.send({ message: "food data successfully updated.", data: updated_food[1] || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async DELETE(req, res) {
    try {
      const foodModel = req.models.foods
      const food = await foodModel.findOne({ where: req.params })
      await foodModel.destroy({ where: req.params })

      return res.send({ message: "food data successfully deleted.", data: food || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }
}


export default Controller