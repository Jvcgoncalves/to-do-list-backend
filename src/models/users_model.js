const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
  user_name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "task"
  }]
})

module.exports = mongoose.model("users", usersSchema)