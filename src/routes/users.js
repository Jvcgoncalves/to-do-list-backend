const express = require("express");

const router = express.Router();

const Users = require("../models/users_model");
const UsersController = require("../controllers/Users_controller");
Users
router.get("/", async (req,res)=>{
  const { email,password } = req.query
  try {
    let users = await UsersController.validadeUserCredentials({password, email})
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.post("/", async (req,res) =>{
  try {
    let response = await UsersController.createNewUser({data: req.body})
    res.status(200).send(response);
  } catch (error) {
    res.status(422).json(error.message)
  }
})

router.get("/:userId",async (req,res)=>{
  const { userId } = req.params
  
  try {
    let user_data = await UsersController.getLoggedUserData({userId})

    if(user_data === "user not found") {
      res.status(404).json({error_message: "user not found"})
      return
    }

    res.status(200).json(user_data);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.put("/:userId",async (req,res)=>{
  const { new_data, password } = req.body
  const { userId } = req.params

  try {
    let response = await UsersController.updateUserData({new_data, password, userId})
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.delete("/:userId",async (req,res)=>{
  const { password } = req.body
  const { userId } = req.params
  try {
    let response = await UsersController.deleteUser({userId, password})
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

module.exports = router