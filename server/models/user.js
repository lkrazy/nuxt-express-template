import cryptoRandomString from 'crypto-random-string'
import { Flag } from '../enum/flag'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    gender: DataTypes.STRING,
    avatar: DataTypes.STRING,
    flag: {
      type: DataTypes.CHAR,
      field: 'flag'
    }
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
    },
    hooks: {
      beforeCreate(user) {
        user.id = cryptoRandomString(12)
        user.flag = user.flag || Flag.ADDED
      }
    },
    tableName: 'user'
  })
  return User
}
