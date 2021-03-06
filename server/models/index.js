import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import dbConfig from '../config/database'

const basename = path.basename(module.filename)
const db = {}

let sequelize = null

sequelize = new Sequelize(dbConfig)

// Load all the models
fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// Export the db Object
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
