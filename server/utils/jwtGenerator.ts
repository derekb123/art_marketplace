require('dotenv').config();
import jwt from 'jsonwebtoken';

const jwtGenerator = (id) => {
  const payload = {
    user: id
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 120})
}

export default jwtGenerator;