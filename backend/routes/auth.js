const exp = require('express')
const r   = exp.Router()
const c   = require('../controllers/authController')

r.post('/register',       c.reg)
r.post('/login',          c.login)
r.post('/forgot-password', c.forgot)
r.post('/reset-password/:token', c.reset)

module.exports = r
