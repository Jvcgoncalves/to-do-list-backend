const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const port = process.env.MONGO_PORT || "mongodb://localhost:27017/todo-list"

mongoose.connect(port)
  .then(() => console.log("Conectado na porta: " + port))
  .catch( err => console.log(err) )