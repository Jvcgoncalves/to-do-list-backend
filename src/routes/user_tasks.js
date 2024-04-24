const express = require("express");

const router = express.Router();

const TasksController = require("../controllers/Tasks_controller");

router.get("/:userId", async (req,res) => {
  const { userId } = req.params

  try{
    const response = await TasksController.getTasks({userId})
    res.status(200).json(response);
  } catch (error){
    res.status(500).json(error.message)
  }
})

router.get("/:userId/:taskId", async (req,res) => {
  const {userId,taskId} = req.params
  try {
    const response = await TasksController.seeSingleTask({userId,taskId})
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.post("/:userId", async (req,res) => {
  const { userId } = req.params
  const { data } = req.body
  try{
    const response = await TasksController.createNewTask({data,userId})
    res.status(200).json(response);
  } catch (error){
    res.status(500).json(error.message)
  }
})

router.put("/:userId/:taskId", async (req,res) => {
  const { userId, taskId } = req.params
  const { data } = req.body
  try {
    const response = await TasksController.editTask({data,userId,taskId})
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.delete("/:userId/:taskId", async (req,res) => {
  try {
    const { userId,taskId } = req.params
    const response = await TasksController.deleteTask({userId,taskId})
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

module.exports = router