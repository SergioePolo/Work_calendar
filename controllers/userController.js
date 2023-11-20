const User = require("../models/users");
const bcryptjs = require("bcryptjs");

exports.showUsers = async (req, res) => {
  try{
    const users = await User.findAll()
    if(!users){
        res.status(404).json({msg:"No existen usuarios registrados"})
    }
    else{
        res.status(200).json({users});
    }
  }
  catch(error){
    res.status(400).json({ error });
  }
};

exports.showUser = async (req, res) => {
    const { id } = req.params;
    const document = id;
    try{
        const user = await User.findOne({ where: { document } });
        if(!user){
            res.status(404).json({msg:"No existen usuarios registrados"})
        }
        else{
            res.status(200).json({user});
        }
      }
      catch(error){
        res.status(400).json({ error });
      }
  };

exports.createUser = async (req, res) => {
  const { document, firstName, lastName, email, speciality } = req.body;
  let { password } = req.body;
  try {
    const user = await User.findOne({ where: { document } });
    if (user) {
      res.status(401).json({ msg: "Un usuario con este documento ya existe" });
    } else {
      password = await bcryptjs.hash(password, 10);
      await User.create({
        document,
        firstName,
        lastName,
        email,
        password,
        speciality,
      });
      res.status(200).json({ msg: "Usuario creado con éxito" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifyUser = async (req, res) => {
  const { id } = req.params;
  const document = id;
  let { password } = req.body;
  const { firstName, lastName, email, speciality } = req.body;
  
  try {
    const user = await User.findOne({ where: { document } });
    if (!user) {
      res.status(401).json({ msg: "Usuario no encontrado" });
    } else {
      password = await bcryptjs.hash(password, 10);
      const user = await User.update(
        { firstName, lastName, email, password, speciality },
        { where: { document } }
      );
      res.status(200).json({ msg: "Usuario actualizado con éxito" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const document = id;
    try{
    const user = await User.findOne({ where: { document } });
    if(user){
        const user = await User.destroy({ where: { document } });
        res.status(200).json({ msg: "Usuario eliminado con éxito" });
    }
    else{
        res.status(404).json({msg:"Usuario no encontrado"})
    }
    }
    catch(error){
        res.status(404).json({error})
    }
};
