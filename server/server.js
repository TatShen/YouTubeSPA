require("dotenv").config();
const express = require("express");
const app = express();
const loggerMiddleware = require("./middleware/loggerMiddleware");
const routes = require("./routes/index");
const sequelize = require("./config/db.js");
const cors = require("cors");
const path = require("path");

const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? false : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(loggerMiddleware);
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log("DB connection error: ", err.message));


const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на http://0.0.0.0:${PORT}`);
});



