const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require("dotenv").config()
const mainRouter = require("./Router/mainRouter")
const bodyParser = require('body-parser')



const dbUrl = process.env.dbUrl;
mongoose.connect(dbUrl).then(() => {
  console.log('MongoDB Connected');
})
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
const db = mongoose.connection

db.on("error", (e) => {
  console.log("Mongodb error", e)
})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(mainRouter)


app.get('/', (req, res) => {
  res.send("Congratulations! Blog App Backend is Running \n You're good to go");
});

const port = process.env.Port || 3000; // Use environment variable for port or default to 3000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
