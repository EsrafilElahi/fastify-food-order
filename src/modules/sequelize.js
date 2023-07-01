import { Sequelize } from 'sequelize'
import models from './models/index.js'


const sequelize = new Sequelize('postgres://postgres:1029@localhost:5432/example',{
  logging: false,
})

async function dbConnection () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error.message)
  }
  
  models.map(async model => {
    await model(sequelize)
  }) 

  await sequelize.sync({ force: true })
}

export {
  dbConnection,
  sequelize
}