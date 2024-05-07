const Users = require("../models/users_model")
const Tasks = require("../models/user_task_model");

class CommonService {
  static async assignNewTaskToUser({ userId, newTask }) {
    try {
      const { name, _id} = newTask
      await Users.findByIdAndUpdate(userId,{$push: {"tasks":{ "taskId": _id,"taskName": name}}})
    } catch (error) {
      return {code:500, message: "error assigning tasks to array from current user"}
    }
  }

  static async updateTaskName({ taskName, taskId, userId }) {
    try {
      return await Users.updateOne({_id:userId,"tasks.taskId":taskId},{$set:{"tasks.$.taskName":taskName}})
    } catch (error) {
      return {code:500, message: "error updating tasks array from current user"}
    }
  }

  static async deleteTaskFromArray({ taskId, userId }) {
    try {
      return await Users.findByIdAndUpdate(userId,{$pull: {"tasks":{ "taskId": taskId}}},{new:true})
    } catch (error) {
      return {code:500, message: "error on delete tasks array from current user"}
    }
  }

  static async deleteAllTasks({userId}){
    const response = await Tasks.deleteMany({userId})
  }
}

module.exports = CommonService;
