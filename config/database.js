const mongoose = require("mongoose")
mongoose.Promise = global.Promise
// 
const port = process.env.MONGO_PORT || ""

mongoose.connect(port)
  .then(() => console.log("Conectado na porta: " + port))
  .catch(err => console.log(err))