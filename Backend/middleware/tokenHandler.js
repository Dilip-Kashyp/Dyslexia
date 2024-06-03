const expressAsyncHandler = require('express-async-handler');
const   jwt = require('jsonwebtoken');

const vaildateToken = expressAsyncHandler(async(req, res, next) => {
    let token ;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if(err){
                res.status(401).json({error : "User is not authorized"}) 
                return;
            }
            req.user = data.user;
            next()
        });
    }
    if(!token){
        res.status(401).json({error : "User is not authorized or unvaild token"}) 
    }
});

module.exports = vaildateToken;