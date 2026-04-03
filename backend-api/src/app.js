const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

module.exports = app;
