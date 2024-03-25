const express = require("express");

const router = express.Router();

const Tasks = require("../models/user_task_model")

router.get("/", async (req,res)=>{
  try {
    let tasks = await Tasks.find({})
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error.message)
  }
})