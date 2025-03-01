const jwt = require('jsonwebtoken');

module.exports ={
    generateToken
};


function generateToken(user){
    const payload ={
        subject: user.id,
        username: user.username,
        roles:['user']
    };
    const options = {
        expiresIn: "1d"
      };
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}