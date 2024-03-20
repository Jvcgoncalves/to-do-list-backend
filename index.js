const express = require("express")
const checkListRouter = require("./src/routes/checklist")

const app = express()
const port = 3000 || process.env.PORT

app.use(express.json())
app.use("/checklists",checkListRouter)

app.listen(port, () =>{
  console.log("Servidor foi iniciado");
})