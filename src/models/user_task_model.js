const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
  name: {type: String, required: true},
  done: {type: Boolean, default: false, required: false},
  description: {type: String, required: false},
  delivery_date: {type: String, required: false},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: true
  }
})

module.exports = mongoose.model("task", taskSchema)