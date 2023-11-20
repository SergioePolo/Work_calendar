const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require ("dotenv").config({path:"variables.env"})

exports.authUser = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({ where: { email } });
        const dbPassword = await bcryptjs.compare(password,user.password)  
        if(user){
            if(dbPassword){
                let payload ={
                    user:{id:user.id}
                }
                jwt.sign(
                    payload,
                    process.env.SECRETA,
                    {
                        expiresIn:'1m',

                    },
                    (error,token)=>{
                        if(error) throw error;
                        res.status(200).json({token})
                    }
                )
            }
            else{
                res.status(406).json({msg:"Contraseña incorrecta"})
            }
        }
        else{
            rest.status(401).json({msg:"Usuario no registrado"})
        }
    }   
    catch(error){
        res.status(404).json({error})
    } 
}

exports.userApproved = async (req,res)=>{
    const id = req.user.id
    try{
        const user = await User.findOne({ where: { id }})
        res.status(200).json(user)
    }
    catch(error){
        res.json(403).json({error})
    }
}