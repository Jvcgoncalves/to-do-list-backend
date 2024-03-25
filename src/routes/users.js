const express = require("express");

const router = express.Router();

const Users = require("../models/users_model")

router.get("/", async (req,res)=>{
  try {
    let users = await Users.find({})
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.post("/", async (req,res) =>{
  let { user_name, email,password } = req.body;

  try {
    let users = await Users.create({ user_name, email, password })
    res.status(200).json(users);
  } catch (error) {
    res.status(422).json(error.message)
  }
})

router.get("/:id",async (req,res)=>{
  const { id } = req.params
  try {
    let users = await Users.findById(id)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.put("/:id",async (req,res)=>{
  const { name } = req.body
  try {
    let users = await Users.findByIdAndUpdate(req.params.id,{name},{new:true}) // {new:true} optional to get updated doc
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.delete("/:id",async (req,res)=>{
  try {
    let users = await Users.findByIdAndDelete(req.params.id)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message)
    console.log(error);
  }
})

module.exports = router