const mongoose = require("mongoose")
mongoose.Promise = global.Promise
// 
const port = process.env.MONGO_PORT || "mongodb+srv://goncalvesdacosta05:zjfxoFBNol7XYL69@todo-list.palc8dd.mongodb.net/"

mongoose.connect(port)
  .then(() => console.log("Conectado na porta: " + port))
  .catch(err => console.log(err))