const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors()); // Use the cors middleware
app.use(express.json());

// Route to Auth Service
app.use("/auth", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3000${req.originalUrl}`,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Internal Server Error" });
  }
});

// Route to Blockchain Service
app.use("/blockchain", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:4000${req.originalUrl.replace("/blockchain", "")}`,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
