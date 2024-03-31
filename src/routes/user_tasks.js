const express = require("express");

const router = express.Router();

const TasksController = require("../controllers/Tasks_controller");

router.get("/:userId", async (req,res)=>{
  const { userId } = req.params
  const { specific_search } = req.body

  try{
    const response = await TasksController.getTasks({searchFor: specific_search, userId})
    console.log(response);
    res.status(200).json(response);
  } catch (error){
    res.status(500).json(error.message)
  }
})

router.post("/:userId", async (req,res)=>{
  const { userId } = req.params
  const { data } = req.body
  try{
    const response = await TasksController.createNewTask({data,userId})
    res.status(200).json(response);
  } catch (error){
    console.log(error);
    res.status(500).json(error.message)
  }
})

module.exports = router