const jwt = require('jsonwebtoken');

const secretKey = 'abcde12345';

function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    
    role: user.role
  };


  const token = jwt.sign(payload, secretKey); 

  return token;
}

function verifyToken(token){
  const payload=jwt.verify(token,secret)
return payload
}

module.exports = {generateToken,verifyToken}




