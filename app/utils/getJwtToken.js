const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.secretKey;


const generateToken = (user) => {
  const obj = { user_id: user.id, role: user.role };
  console.log(obj);
  // return jwt.sign(user.get(), sc, { expiresIn: '1h' });
  return jwt.sign(obj, JWT_SECRET, { expiresIn: '1h' });
  };
  
module.exports = generateToken;

  