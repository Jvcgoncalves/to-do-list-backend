const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
  user_name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  tasks: [{
    taskId:{ type: mongoose.Schema.Types.ObjectId, ref: "task", required: true},
    taskName: {type: String, required: true}
  }]
})

module.exports = mongoose.model("users", usersSchema)