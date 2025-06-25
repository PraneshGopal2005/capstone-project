require('dotenv').config()
const exp = require('express')
const db = require('./config/db')

const cors = require('cors');

const app = exp()
app.use(cors());
app.use(exp.json());

db();
app.use('/auth', require('./routes/auth'))
app.use('/recipes', require('./routes/recipes'));

//app.listen(process.env.PORT || 3000)
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
