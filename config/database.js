const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const port = "mongodb://localhost:27017/todo-list" || process.env.PORT

mongoose.connect(port)
  .then(() => console.log("Conectado na porta: " + port))
  .catch( err => console.log(err) )