const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const taskRoutes = require("./routes/taskRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5001",
  "http://localhost:5003",
  process.env.SHELL_APP_URL,
  process.env.MFE_TASKS_URL,
  process.env.MFE_DASHBOARD_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
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

app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
