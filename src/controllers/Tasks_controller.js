const Tasks = require("../models/user_task_model");
const UsersController = require("./Users_controller");
const checkError = require("./scripts/checkError");
const getRegisterDate = require("./scripts/getRegisterDate");

class TasksController{

  static async getTasks({userId}){
    try {
      const allUserTasks = await Tasks.find({userId})
      return allUserTasks
    } catch (error) {
      return checkError({error})
    }
    
  }

  static async seeSingleTask({userId,taskId}){
    try {
      const response = await Tasks.findOne({$and: [{userId,_id:taskId}]})
      console.log(response);
      return response.length === 0 ? "task not found" : response
    } catch (error) {
      return checkError({error})
    }
  }

  static async createNewTask({data,userId}){
    const { name, description, delivery_date } = data
    const register_date = getRegisterDate()

    try{
      const new_task = await Tasks.create({name, done: false, description, delivery_date, userId, register_date})
      
      UsersController.assignNewTaskToUser({userId, newTask: new_task})
    
      return "task registered"
    } catch(error){
      return checkError({error})
    }
  } 

  static async editTask({data,userId,taskId}){
    try {
      console.log(data?.name);
      const response = await Tasks.findOneAndUpdate({$and:[{userId,_id:taskId}]},{...data},{new:true})

      if(data?.name !== undefined){
        const taskName = data.name
        await UsersController.updateTaskName({taskName,taskId,userId})
      }

      return response
    } catch (error) {
      return checkError({error})
    }
  }

  static async deleteTask({userId,taskId}){
    try {
      await Tasks.findByIdAndDelete(taskId)
      await UsersController.deleteTaskFromArray({taskId,userId})
      return "task deleted"
    } catch (error) {
      return checkError({error})
    }
  }
}

module.exports = TasksController