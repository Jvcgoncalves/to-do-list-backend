const express = require("express")
const path = require("node:path")
const cors = require("cors")
const usersRouter = require("./src/routes/users")
const tasksRouter = require("./src/routes/users")

require("./config/database")

const app = express()
const port = 3000 || process.env.PORT

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,"public")))

app.use("/users", usersRouter)
app.use("/users/:userId/tasks", tasksRouter)

app.listen(port, () =>{
  console.log("Servidor foi iniciado");
})