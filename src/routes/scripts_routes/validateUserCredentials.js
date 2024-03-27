const Users = require("../../models/users_model")

const validadeUserCredentials = async ({ email,password }) => {
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

const emailExist = async ({email}) => {
  const response = await Users.find({email});
  return response.length === 0 ? false : true 
}

module.exports = validadeUserCredentials