const Tasks = require("../models/user_task_model");
const UsersController = require("./Users_controller");

class TasksController{

  static async getTasks({searchFor, userId}){
    if(!searchFor){
      return await Tasks.find({userId})
    } else {
      const allUserTasks = await Tasks.find({userId})
      return allUserTasks.filter(currentTask => currentTask.name.toLowerCase().match(searchFor.toLowerCase()))
    }
  }

  static async createNewTask({data,userId}){
    const { name, description, delivery_date } = data
    try{
      const new_task = await Tasks.create({name, done: false, description, delivery_date,userId})
      
      UsersController.assignNewTaskToUser({userId, newTask: new_task})
    
      return "task registered"
    } catch(error){
      return error
    }
  } 
}

module.exports = TasksController