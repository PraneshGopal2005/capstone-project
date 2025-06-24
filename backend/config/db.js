const mg = require('mongoose')

module.exports = () =>
  mg.connect(process.env.MONGO_URI)
    .then(() => console.log('db'))
    .catch(err => console.error(err))
