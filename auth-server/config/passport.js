const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { User } = require('../db/schema')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => {
      User
        .query()
        .where('username', username)
        .first()
        .then(function (user) {
          if (!user) { return done('Unknown user') }
          user.verifyPassword(password, function (err, passwordCorrect) {
            if (err) { return done(err) }
            if (!passwordCorrect) { return done('Invalid password') }
            return done(null, user)
          })
        }).catch(function (err) {
          done(err)
        })
    }
  )
)

module.exports = passport
