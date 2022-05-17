const express = require("express");
require("dotenv").config();
const { dbConnect } = require("./db/connect");
const router = require("./routes/auth-route");
const { notFound } = require("./middleware/not-found");

// Variable Declarations
const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

//Middleware

app.use(express.json());
app.use("/api/v1", router);
app.use(notFound);

// Start App

const start = async () => {
  try {
    await dbConnect(dbUrl);
    app.listen(port, () => {
      console.log(`Server Running on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
