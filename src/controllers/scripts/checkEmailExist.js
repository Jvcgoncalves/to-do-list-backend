const Users = require("../../models/users_model")

const emailExist = async ({email}) => {
  const response = await Users.find({email});
  return response.length === 0 ? false : true 
}

module.exports = emailExist