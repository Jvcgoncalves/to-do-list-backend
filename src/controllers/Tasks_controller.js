const Tasks = require("../models/user_task_model");
const UsersController = require("./Users_controller");
const checkError = require("./scripts/checkError");

class TasksController{

  static async getTasks({searchFor, userId, filter}){
    try {
      if(filter !== undefined){
        const {done} = filter
        const allUserTasks = await Tasks.find({$and: [{ userId }, { done }]})
        const namesMatched = allUserTasks.filter(currentTask => currentTask.name.toLowerCase().match(searchFor.toLowerCase()))
        return namesMatched.length === 0 ? "task not found" : namesMatched
      } else if (!searchFor){
        const allUserTasks = await Tasks.find({userId})
        return allUserTasks.length === 0 ? "task not found" : allUserTasks
      } else {
        const allUserTasks = await Tasks.find({userId})
        const tasksFiltered = allUserTasks.filter(currentTask => currentTask.name.toLowerCase().match(searchFor.toLowerCase()))
        return  tasksFiltered.length === 0 ? "task not found" : tasksFiltered
      }
    } catch (error) {
      return checkError({error})
    }
    
  }

  static async seeSingleTask({userId,taskId}){
    try {
      const response = await Tasks.find({$and: [{userId,_id:taskId}]})
      return response.length === 0 ? "task not found" : response
    } catch (error) {
      return checkError({error})
    }
  }

  static async createNewTask({data,userId}){
    const { name, description, delivery_date } = data
    try{
      const new_task = await Tasks.create({name, done: false, description, delivery_date,userId})
      
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