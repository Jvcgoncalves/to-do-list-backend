const express = require("express");

const router = express.Router();

const Users = require("../models/users_model");
const UsersController = require("../controllers/Users_controller");

router.get("/", async (req,res)=>{
  const { user_password,user_email } = req.body
  try {
    let users = await UsersController.validadeUserCredentials({password: user_password, email: user_email})
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.post("/", async (req,res) =>{
  let { user_name, email,password } = req.body;
//Users.create({ user_name, email, password })
  try {
    let users = await UsersController.newUserEmailAlreadyRegistered({email})
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json(error.message)
  }
})

router.get("/:userId",async (req,res)=>{
  const { userId } = req.params
  try {
    let users = await Users.findById(userId)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.put("/:userId",async (req,res)=>{
  const { name } = req.body
  try {
    let users = await Users.findByIdAndUpdate(req.params.userId,{name},{new:true}) // {new:true} optional to get updated doc
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.delete("/:userId",async (req,res)=>{
  try {
    let users = await Users.findByIdAndDelete(req.params.userId)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
    console.log(error);
  }
})

module.exports = router