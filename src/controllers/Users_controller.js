const Users = require("../models/users_model")
const emailExist = require("./scripts/checkEmailExist")

class UsersController{


  static async validadeUserCredentials({ email,password }) {
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
  }

  static async createNewUser({data}){
    const { user_name, email, password } = data
  }

  static async newUserEmailAlreadyRegistered({email}){
    const emailAlreadyRegistered = await emailExist({email})
    if(emailAlreadyRegistered){
      return true
    } else {
      return false
    }
  }
}

module.exports = UsersController