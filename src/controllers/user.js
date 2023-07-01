import config from "../config/config.js"

class Controller {
  async GET(req, res) {
    try {
      const userModel = req.models.users
      const pagination = config.pagination
      const { page, limit } = { page: req.query.page || pagination.page, limit: req.query.limit || pagination.limit }
      const users = await userModel.findAll({where: req.params, order: [["id", "ASC"]] })
      const paginated_users = users.slice(page * limit - limit, page * limit)
      
      return res.send({ message: 'user data successfully finded.', data: req.params.id ? (paginated_users[0] || {}) : (paginated_users || []) })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async POST(req, res) {
    try {
      const userModel = req.models.users
      const inser_user = await userModel.create(req.body)
      
      return res.send({ message: 'user data succesfully inserted.', data: inser_user || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async PUT(req, res) {
    try {
      const userModel = req.models.users
      const updated_user = await userModel.update(req.body, { where: req.params, returning: true, plain: true })
      
      return res.send({ message: "user data succesfully updated.", data: updated_user[1] || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async DELETE(req, res) {
    try {
      const userModel = req.models.users
      const user = await userModel.findOne({ where: req.params })
      await userModel.destroy({ where: req.params })

      return res.send({ message: "user data succesfully deleted.", data: user || {} })
    } catch (error) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }
}

export default Controller
