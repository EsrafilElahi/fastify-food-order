import { Model, DataTypes } from 'sequelize'

export default function (sequelize) {
  class Food extends Model {}

  Food.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1000,
          max: 1000000
        }
      }
    },
    {
      createdAt: 'food_created_at',
      updatedAt: 'food_updated_at',
      sequelize,
      modelName: 'foods',
    }
  )
  
  return Food
}