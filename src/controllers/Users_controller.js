const Users = require("../models/users_model")
const emailExist = require("./scripts/checkEmailExist")

class UsersController{


  static async validadeUserCredentials({email,password }) {
    try {
      const user = await Users.find({$and : [{password, email}]})
      if (user.length === 0) {
    
        if(await emailExist({email})){
          return "incorrect password"
        } else {
          return "unregistered email"
        }
        
      } else{
        return user
      }
    } catch (error) {
      return error.message
    }
  }

  static async createNewUser({data}){
    try {
      const { user_name, email, password } = data

      if(await emailExist({email})){
        return "email already registered"
      }

      Users.creatae({ user_name, email, password })
      return "user registed"

    } catch (error) {
      return error.message
    }
  }

  static async getLoggedUserData({userId}){
    try {
      let user_data = await Users.findById(userId)
      if(user_data === null) return "user not found"
      return user_data
    } catch (error) {
      if(error.message.includes("Cast to ObjectId failed for value")){
        return "user id invalid"
      }
      return error.message
    }
  }

  static async updateUserData({new_data, password, userId}){
    try {
      const userOldData = await this.getLoggedUserData( {userId} )

      if(userOldData.password !== password){
        return "user not allowed"
      }

      await Users.findByIdAndUpdate(userId,{...new_data}, {new:true})

      return "user data updated"
    } catch (error) {
      console.log(error.message);
      return error
    }
  }

  static async deleteUser({userId, password}){
    console.log(userId);
    console.log(password);
    try {
      const user_data = await this.getLoggedUserData( {userId} )
      console.log(user_data);
      if(user_data === "user not found"){
        return user_data
      }
      if(user_data === "user id invalid"){
        return "user id invalid"
      }
      if(user_data.password !== password){
        return "user not allowed"
      }
      await Users.findByIdAndDelete(userId)
      return "user deleted"
    } catch (error) {
      return error.message
    }
  }
}

module.exports = UsersController