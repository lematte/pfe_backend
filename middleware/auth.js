const jwt = require('jsonwebtoken');
const Users = require('../models/UserModel')


module.exports.requireSignIn = (req, res , next ) => {
    const token = req.header('Authorization')
    if(!token) 
    return res.status(401).json({msg: 'No token, authorization denied'}) //unauthorized
    try{
        //Verify token
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET )
        //Add user from payload
        req.user = decoded
        next()
    } catch(e) {
        res.status(400).json({msg : 'Token is not valid'})
    }   
}