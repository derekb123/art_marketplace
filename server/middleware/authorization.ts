import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {

    const jwtToken = req.header('token')
    console.log('jwtToken in authorization', jwtToken);

    if(!jwtToken){
      return res.status(403).json("Authorization Denied.")
    }

    try {
    const verify = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // console.log('verify in authorization', verify);
    console.log('req.user before authorization', req.user);
    req.user = verify.user;
    console.log('req.user redefined after authorization', req.user);

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Token is not Valid.")
  }
}

export default authenticateToken;