const ServerConfig = require('./server').ServerConfig

const dbConfig = Object.assign({
  define: {
    freezeTableName: true,
    underscored: true
  }
}, ServerConfig.DATABASE)

module.exports = dbConfig
