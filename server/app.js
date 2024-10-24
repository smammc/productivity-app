// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const bodyParser = require("body-parser");

const app = express();
// ==================== Body Parser Setup ====================
// Increase the size limit for JSON requests
app.use(bodyParser.json({ limit: "10mb" })); // Set limit for JSON bodies
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // Set limit for URL-encoded bodies

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// const indexRoutes = require("./routes/index.routes");
// app.use("/api", indexRoutes);

const todoRoutes = require("./routes/todo.routes");
app.use("/api", todoRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
