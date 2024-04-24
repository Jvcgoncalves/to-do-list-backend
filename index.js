const express = require("express")
const path = require("node:path")
const cors = require("cors")
const usersRouter = require("./src/routes/users")
const tasksRouter = require("./src/routes/user_tasks")

require("./config/database")

const app = express()
const port = process.env.BACKEND_PORT || 3000

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,"public")))

app.use("/users", usersRouter)
app.use("/tasks", tasksRouter)

app.listen(port, () =>{
  console.log(`Servidor foi iniciado na porta http://localhost:${3000} `);
})