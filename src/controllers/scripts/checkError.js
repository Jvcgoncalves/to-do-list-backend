function checkError({error}){
  if(error.reason?.message.includes("input must be a 24 character hex string, 12 byte Uint8Array, or an integer")){
    return "user/task id invalid"
  }
  return error.message
}

module.exports = checkError