
const jwt = require("jsonwebtoken");
const JWT_SECRET= process.env.secretKey
const { user } = require('../models');

const { asynchandler } = require('../utils/asyncHandler');
const { HttpException } = require("../errors/HttpException");
module.exports = asynchandler(async (req, res, next) => {
    
    const authHeader = req.headers.authorization;   
   
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    // const token = req.cookies.token;
    if (!token) {
        throw new HttpException(401, "Token not provide");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
   
    const User = await user.findOne({ where:{id:decoded.user_id} });
  
    if (!User) {
        
        throw new HttpException(404,"not Found")
    }
    req.token = token;
    req.user = User;
    next();
  

    
    
})