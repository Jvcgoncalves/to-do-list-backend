const Users = require("../models/users_model")
const CommonService = require("../services/CommonService")
const TasksController = require("./Tasks_controller")
const emailExist = require("./scripts/checkEmailExist")
const checkError = require("./scripts/checkError")

class UsersController{


  static async validadeUserCredentials({email,password }) {
    try {
      const user = await Users.findOne({$and : [{password, email}]})
      if (!user) {
    
        if(await emailExist({email})){
          return "Senha incorreta"
        } else {
          return "Email não registrado"
        }
        
      } else{
        return user
      }
    } catch (error) {
      return checkError({error})
    }
  }

  static async createNewUser({data}){
    try {
      const { userName, email, password } = data

      if(await emailExist({email})){
        return "email already registered"
      }

      Users.create({ user_name: userName, email, password })
      return "user registed"

    } catch (error) {
      return checkError({error})
    }
  }

  static async getLoggedUserData({userId}){
    try {
      let user_data = await Users.findById(userId)
      if(user_data === null) return "user not found"
      return user_data
    } catch (error) {
      return checkError({error})
    }
  }

  static async changePassword({userEmail, newPassword}){
    try {
      const user = await Users.findOne({ email: userEmail })
      if(!user){
        return "user not found"
      }
      const newPasswordData ={
        password: newPassword
      }

      const userNewData = await Users.findByIdAndUpdate(user._id,{...newPasswordData}, {new:true})
      console.log("userNewData" + userNewData);
      return "user password updated"
    } catch (error) {
      return checkError({error})
    }
  }

  static async updateUserData({new_data, password, userId}){
    try {
      const userOldData = await this.getLoggedUserData( {userId} )
      const formatedNewData = {
        user_name: new_data.userNameInput,
        email: new_data.userEmailInput,
        password: new_data.userPasswordInput,
      }
      if(userOldData.password !== password){
        return "user not allowed"
      }

      const userNewData = await Users.findByIdAndUpdate(userId,{...formatedNewData}, {new:true})
      return "user data updated"
    } catch (error) {
      return checkError({error})
    }
  }

  static async deleteUser({userId, password}){
    try {
      const user_data = await this.getLoggedUserData( {userId} )
      if(user_data === "user not found"){
        return user_data
      }
      if(user_data === "user/task id invalid"){
        return "user/task id invalid"
      }
      if(user_data.password !== password){
        return "wrong password"
      }
      await Users.findByIdAndDelete(userId)
      await CommonService.deleteAllTasks({userId})
      return "user deleted"
    } catch (error) {
      return checkError({error})
    }
  }

  static async assignNewTaskToUser({userId,newTask}){
    try {
      const { name, _id} = newTask
      await Users.findByIdAndUpdate(userId,{$push: {"tasks":{ "taskId": _id,"taskName": name}}})
    } catch (error) {
      return {code:500, message: "error assigning tasks to array from current user"}
    }
  }

  static async updateTaskName({taskName,taskId,userId}){
    try {
      return await Users.updateOne({_id:userId,"tasks.taskId":taskId},{$set:{"tasks.$.taskName":taskName}})
    } catch (error) {
      return {code:500, message: "error updating tasks array from current user"}
    }
  }

  static async deleteTaskFromArray({taskId,userId}){
    try {
      return await Users.findByIdAndUpdate(userId,{$pull: {"tasks":{ "taskId": taskId}}},{new:true})
    } catch (error) {
      return {code:500, message: "error on delete tasks array from current user"}
    }
  }
}

module.exports = UsersController