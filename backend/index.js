require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const express = require("express");
// const cors = require("cors");
const userRoute = require("./routers/userRouter");
const chatRoute = require("./routers/chatRoute");
const { notFound, errorHandler } = require("./middleware/errorMid");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7007;

app.listen(PORT, () => {
  console.log("Server Running...");
});
