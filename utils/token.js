const jwt = require('jsonwebtoken');
const generateTokenHandler = (userId)=>{
    console.log('generatingUserid',userId);
    if(!userId) throw new Error('User id Not provided');
    return jwt.sign({userId} , process.env.SECRET_KEY,{
    expiresIn: process.env.KEY_EXPIRES
    });
};
module.exports = generateTokenHandler;