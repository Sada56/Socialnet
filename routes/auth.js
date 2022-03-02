const router = require("express").Router();
const User = require("../models/User"); 
const bcrypt = require('bcrypt');
const { registerValidation} = require('../validation');

router.post("/register", async (req, res) => {

  // valider les donnes avant utilisation
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message); 

  // verifier si l utilisateur est dans la db 
  const emailExist =await User.findOne({email:req.body.email});
  if (emailExist) return res.sendStatus(400).send('Email already exixts') 

  //hacher le motde pass 
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword= await bcrypt.hash(req.body.password ,salt);  

  // crer un nouveeu utilisateur
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
