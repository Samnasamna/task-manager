const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/tasks", require("./routers/taskRouter.js"))

app.listen(process.env.PORT, ()=>{
    console.log("App has started....")
})