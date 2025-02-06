const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectToMongoDB = require("./db/dbConnect.js");
const cookieParser = require("cookie-parser");
const loginRouter = require("./routes/LoginRouter.js")
const registerRouter = require("./routes/RegisterRouter.js")

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/register", registerRouter);



async function main() {
  try {
    await connectToMongoDB();
    console.log("Complete");
  } catch (err) {
    console.log(err);
  }
}

main()

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
