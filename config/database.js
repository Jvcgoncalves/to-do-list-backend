const mongoose = require("mongoose")
mongoose.Promise = global.Promise
//mongodb+srv://goncalvesdacosta05:<password>@todo-list.palc8dd.mongodb.net/
const port = process.env.MONGO_PORT || "mongodb+srv://goncalvesdacosta05:<password>@todo-list.palc8dd.mongodb.net/"

mongoose.connect(port)
  .then(() => console.log("Conectado na porta: " + port))
  .catch( err => console.log(err) )