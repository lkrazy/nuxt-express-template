// config/passport.js
import bcrypt from 'bcrypt-nodejs'
import models from '../models'

const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const User = models.User

const AuthenConfig = require('./server').AuthenConfig

module.exports = (passport) => {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.username)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        username: id
      }
    }).then((user) => {
      done(null, user)
    }).catch((error) => {
      done(error, null)
    })
  })

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-login',
    new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, username, password, done) => { // callback with email and password from our form
      User.findOne({
        where: {
          username
        }
      }).then((user) => {
        if (user == null) {
          return done(null, false, { message: 'User not found.' })
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      }).catch((error) => {
        return done(error)
      })
    })
  )
  passport.use(
    'facebook',
    new FacebookStrategy({
      clientID: AuthenConfig.FACEBOOK.app,
      clientSecret: AuthenConfig.FACEBOOK.secret,
      callbackURL: '/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      User
        .findOrCreate({ where: {
          username: profile.id
        },
        defaults: {
          firstName: profile.name.givenName || profile.displayName,
          lastName: profile.name.familyName,
          email: '',
          password: ''
        } })
        .spread((user, created) => {
          user.token = accessToken
          return cb(created, user)
        })
    })
  )
  passport.use(
    'google',
    new GoogleStrategy({
      clientID: AuthenConfig.GOOGLE.app,
      clientSecret: AuthenConfig.GOOGLE.secret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(accessToken)
      console.log(profile)
      console.log(cb)
      User
        .findOrCreate({ where: {
          username: profile.id
        },
        defaults: {
          firstName: profile.name.givenName || profile.displayName,
          lastName: profile.name.familyName,
          email: '',
          password: ''
        } })
        .spread((user, created) => {
          user.token = accessToken
          return cb(created, user)
        })
    })
  )
}
