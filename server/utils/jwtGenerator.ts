require('dotenv').config();
import jwt from 'jsonwebtoken';

export const jwtAccessTokenGenerator = (id) => {
  const payload = {
    user: id
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export const jwtRefreshTokenGenerator = (user) => {
  return jwt.sign({user : user.id, tokenVersion: user.token_version}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "12h"})
}