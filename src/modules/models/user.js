import { Model, DataTypes } from 'sequelize'

export default function (sequelize) {
  class User extends Model {}

  User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING(13),
        unique: true,
        allowNull: false,
        validate: {
          is: ['^\\+998(9[012345789]|33)[0-9]{7}$', 'g'],
          len: {
            msg: "contact length must be 13!",
            args: 13
          }
        }
      }
    },
    {      
      createdAt: 'user_created_at',
      updatedAt: 'user_updated_at',
      sequelize,
      modelName: 'users',
    }
  )
  
  return User
}