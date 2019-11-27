const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')
const os = require('os')

const homeDir = os.homedir()
const defaultWorkingDir = path.join(homeDir, '.keep-sport/')
let userConfig = {}

if (fs.existsSync(defaultWorkingDir)) {
  fs.mkdir(defaultWorkingDir, () => {})
}

try {
  userConfig = yaml.safeLoad(fs.readFileSync(path.join(homeDir, '.logistics_management/config.yaml'), 'utf8'))
} catch (e) {
  try {
    userConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../config.yaml'), 'utf8'))
  } catch (e1) {
    userConfig = {}
  }
}

class Config {
  constructor() {
    this.PORT = 8080
    this.ACTUAL_PORT = 80
    this.HTTPS = false
    this.DOMAIN = 'localhost'
    this.WORKING_DIR = defaultWorkingDir
    this.DATABASE = {
      database: 'keep_sport',
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      user: 'root',
      password: '',
      seederStorage: 'sequelize',
      seederStorageTableName: 'sequelize_seed_meta'
    }
  }

  setConfig(config) {
    if (config.RUNNING_PORT) {
      this.PORT = config.RUNNING_PORT
    }

    if (config.HTTPS) {
      this.HTTPS = config.HTTPS
      if (config.PUBLIC_PORT) {
        this.ACTUAL_PORT = config.PUBLIC_PORT
      } else {
        this.ACTUAL_PORT = 443
      }
    } else if (config.PUBLIC_PORT) {
      this.ACTUAL_PORT = config.PUBLIC_PORT
    } else {
      this.ACTUAL_PORT = 80
    }

    if (config.DOMAIN) {
      this.DOMAIN = config.DOMAIN
    }

    if (config.WORKING_DIR) {
      this.WORKING_DIR = config.WORKING_DIR
    }

    if (fs.existsSync(this.WORKING_DIR)) {
      fs.mkdir(this.WORKING_DIR, () => {})
    }

    if (config.DATABASE) {
      this.DATABASE = Object.assign(this.DATABASE, config.DATABASE)
    }
  }

  getUrl() {
    let portStr = ''
    let protocol = 'http'
    if (this.HTTPS) {
      if (this.ACTUAL_PORT != 443) {
        portStr = `:${this.ACTUAL_PORT}`
      }
      protocol = 'https'
    } else if (this.ACTUAL_PORT != 80) {
      portStr = `:${this.ACTUAL_PORT}`
    }
    return `${protocol}://${this.DOMAIN}${portStr}`
  }
}

class AuthenticationConfig {
  constructor() {
    this.FACEBOOK = {
      app: '',
      secret: ''
    }
    this.GOOGLE = {
      app: '',
      secret: ''
    }
  }

  setConfig(config) {
    if (config.FACEBOOK) {
      this.FACEBOOK = Object.assign(this.FACEBOOK, config.FACEBOOK)
    }
    if (config.GOOGLE) {
      this.GOOGLE = Object.assign(this.GOOGLE, config.GOOGLE)
    }
  }
}

const ServerConfig = new Config()
ServerConfig.setConfig(userConfig)

const AuthenConfig = new AuthenticationConfig()
AuthenConfig.setConfig(userConfig)

module.exports = { ServerConfig, AuthenConfig }
