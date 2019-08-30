const express = require("express")
const router = express.Router()
const uuidv4 = require("uuid/v4")
const dotenv = require("dotenv")
dotenv.config()

const awsOptions = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
}

const dbOptions = {
  endpoint: process.env.ENDPOINT_URL
}

const AWS = require("aws-sdk")
AWS.config.update(awsOptions)
const docClient = new AWS.DynamoDB.DocumentClient(dbOptions)

// SHOW ALL
router.get("/", (req, res) => {
  const queryParams = {
    TableName: "Holidays",
    KeyConditionExpression: "Country = :hash and HolidayDate > :sort",
    ExpressionAttributeValues: {
      ":hash": "JP",
      ":sort": "0000-00-00"
    },
    ScanIndexForward: false
  }

  docClient.query(queryParams, (queryErr, queryData) => {
    queryErr
      ? res.send(queryErr)
      : queryData["Count"] === 0
      ? res.send([])
      : res.send(queryData.Items)
  })
})

// ADD
router.post("/add", (req, res) => {
  const { date, name } = req.body
  const queryParams = {
    TableName: "Holidays",
    KeyConditionExpression: "Country = :hash and HolidayDate = :sort",
    ExpressionAttributeValues: {
      ":hash": "JP",
      ":sort": date
    }
  }
  const putParams = {
    TableName: "Holidays",
    Item: {
      ID: uuidv4(),
      Country: "JP",
      HolidayDate: date,
      HolidayName: name
    }
  }

  docClient.query(queryParams, (queryErr, queryData) => {
    queryErr
      ? res.send(queryErr)
      : queryData["Count"] > 0
      ? res.send("Holiday already exists in the database")
      : docClient.put(putParams, (putErr, putData) => {
          putErr ? res.send(putErr) : res.send(putParams.Item)
        })
  })
})

// UPDATE
router.put("/edit/:date", (req, res) => {
  const updateParams = {
    TableName: "Holidays",
    Key: {
      Country: "JP",
      HolidayDate: req.params.date
    },
    UpdateExpression: "set HolidayName = :n",
    ExpressionAttributeValues: {
      ":n": req.body.name
    }
  }

  docClient.update(updateParams, (updateErr, updateData) => {
    updateErr ? res.send(updateErr) : res.send(req.body)
  })
})

// DELETE
router.delete("/delete/:date", (req, res) => {
  const deleteParams = {
    TableName: "Holidays",
    ReturnValues: "ALL_OLD",
    Key: {
      Country: "JP",
      HolidayDate: req.params.date
    }
  }

  docClient.delete(deleteParams, (deleteErr, deleteData) => {
    deleteErr ? res.send(deleteErr) : res.send(deleteData)
  })
})

module.exports = router
