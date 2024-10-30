require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const express = require("express");
const router = require("./routers/userRouter");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", router);

const PORT = process.env.PORT || 7007;

app.listen(PORT, () => {
  console.log("Server Running...");
});
