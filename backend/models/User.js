const mg = require('mongoose')

const s = new mg.Schema({
  un: { type: String, required: true },
  em: { type: String, required: true, unique: true },
  pw: { type: String, required: true },
  rl: { type: String, default: 'user' }
})

module.exports = mg.model('User', s)
