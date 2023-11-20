const express = require('express')
const {connectDB} = require ("./config/db")
const userRouters = require("./routers/userRouters")
//Connect to the database
connectDB()

const app = express()
const port = 4000

app.use(express.json({extended:true}))

app.use("/api/users",userRouters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})