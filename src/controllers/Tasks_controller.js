const Tasks = require("../models/user_task_model");
const CommonService = require("../services/CommonService");
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
      return response === null ? "task not found" : response
    } catch (error) {
      return checkError({error})
    }
  }

  static async createNewTask({data,userId}){
    const { name, description, delivery_date } = data

    const register_date = getRegisterDate()
    const delivery_date_in_date_format = getRegisterDate(delivery_date)

    try{
      const new_task = await Tasks.create({name, done: false, description, delivery_date: delivery_date_in_date_format, userId, register_date})
      
      CommonService.assignNewTaskToUser({userId, newTask: new_task})

      return "task registered"
    } catch(error){
      return checkError({error})
    }
  } 

  static async editTask({data,userId,taskId}){

    data.delivery_date = getRegisterDate(data?.delivery_date); // need to format as data to mongodb accepts

    try {
      const response = await Tasks.findOneAndUpdate({$and:[{userId,_id:taskId}]},{...data},{new:true})
      if(data?.name !== undefined){
        const taskName = data.name
        await CommonService.updateTaskName({taskName,taskId,userId})
      }
      console.log(response);
      return response === null ? "can't edit task" : "task edited"
    } catch (error) {
      return checkError({error})
    }
  }

  static async deleteTask({userId,taskId}){
    try {

      const responseFromTasks = await Tasks.findOneAndDelete({$and:[{userId,_id:taskId}]})
      if(!responseFromTasks){
        return "task not found"
      }
      const responseFromUsersArrayDelete = await CommonService.deleteTaskFromArray({taskId,userId})
      return responseFromTasks && responseFromUsersArrayDelete ? "task deleted" : "error on delete"
    } catch (error) {
      return checkError({error})
    }
  }
}

module.exports = TasksController