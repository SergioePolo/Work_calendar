const jwt = require("jsonwebtoken");
require ("dotenv").config({path:"variables.env"})

module.exports = function (req,res,next){
    const token = req.header("x-auth-token")
    console.log(token)
    if(token){
        try{
            const encryption = jwt.verify(token, process.env.SECRETA)
            req.user = encryption.user
            next()
        }
        catch(error){
            res.status(498).json({msg:"Token expirado"})
        }
    }
    else{
        res.status(401).json({msg:"No hay token"})
    }
}