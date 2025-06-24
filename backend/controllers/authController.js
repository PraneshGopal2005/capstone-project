const U   = require('../models/User');
const bc  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const send = require('../utils/mailer');

const SEC  = process.env.JWT_SECRET
const RSEC = process.env.JWT_RESET_SECRET
const REXP = process.env.RESET_TOKEN_EXPIRY || '15m'


exports.reg = async (req, res) => {
  try {
    console.log("🔥 Registration request body:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log("❗ Missing fields:", { username, email, password });
      return res.status(400).json({ error: 'Missing fields' });
    }

    const existingUser = await U.findOne({ em: email });
    if (existingUser) {
      console.log("❗ User already exists:", email);
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bc.hash(password, 10);

    const newUser = new U({ un: username, em: email, pw: hashedPassword });
    await newUser.save();

    console.log("User registered successfully:", newUser);
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error("Registration error:", error.message);
    console.error("Full error stack:", error); 
    return res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, pw } = req.body;
  if (!email || !pw) return res.status(400).json({ e: "Missing credentials" });

  const u = await U.findOne({ em: email });
  if (!u) return res.status(400).json({ e: "Invalid email" });

  const v = await bc.compare(pw, u.pw);
  if (!v) return res.status(401).json({ e: "Invalid password" });

  const t = jwt.sign({ id: u._id, rl: u.rl }, SEC, { expiresIn: '1h' });
  res.json({ t });
};



exports.forgot = async (req, res) => {
  const { email } = req.body;
  const u = await U.findOne({ em: email });
  if (!u) return res.status(400).json({ e: 'no' });

  const tok = jwt.sign({ id: u._id }, RSEC, { expiresIn: REXP });
  const url = `${process.env.FRONT_URL}/reset-password/${tok}`;

  await send(email, 'reset', `<a href="${url}">reset</a>`);
  res.json({ m: 'sent' });
};

exports.reset = async (req, res) => {
  const { token } = req.params;
  const { pw }   = req.body;
  try {
    const d = jwt.verify(token, RSEC);
    const h = await bc.hash(pw, 10);
    await U.findByIdAndUpdate(d.id, { pw: h });
    s.json({ m: 'ok' });
  } catch {
    s.status(400).json({ e: 'bad' });
  }
};
