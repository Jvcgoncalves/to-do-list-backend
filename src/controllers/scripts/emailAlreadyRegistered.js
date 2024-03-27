const newUserEmailAlreadyRegistered = async ({email}) => {
  const emailAlreadyRegistered = await emailExist({email})
  if(emailAlreadyRegistered){
    return true
  } else {
    return false
  }
}

module.exports = newUserEmailAlreadyRegistered