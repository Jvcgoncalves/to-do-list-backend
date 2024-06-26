const express = require("express");

const router = express.Router();

const UsersController = require("../controllers/Users_controller");

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
      res.status(404).json("user not found")
      return
    }

    res.status(200).json(user_data);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.put("/", async (req, res) =>{
  const { userEmail, newPassword } = req.body
  try {
    let response = await UsersController.changePassword({ newPassword, userEmail })
    res.status(200).json(response);
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