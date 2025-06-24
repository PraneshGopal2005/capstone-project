/*const jwt = require('jsonwebtoken')
const SEC = process.env.JWT_SECRET

module.exports = (r, s, n) => {
  const h = r.headers.authorization
  if (!h || !h.startsWith('Bearer ')) return s.status(401).json({ e: 'no' })

  const t = h.split(' ')[1]
  try {
    r.u = jwt.verify(t, SEC)
    n()
  } catch {
    s.status(401).json({ e: 'bad' })
  }
}*/

const jwt = require('jsonwebtoken');
const SEC = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SEC);
    req.u = decoded; // attach decoded user info to request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
