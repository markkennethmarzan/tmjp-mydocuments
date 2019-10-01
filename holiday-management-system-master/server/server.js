const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const holidays = require("./dynamo.js")

app.use(bodyParser.json())
app.use(cors())
app.use("/api/holidays", holidays)
dotenv.config()

const port = 8000
app.listen(port, () => {
  console.log(`Listening to ${port}`)
})
