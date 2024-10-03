require("dotenv").config();
const express = require("express");
const app = express();
const loggerMiddleware = require("./middleware/loggerMiddleware");
const routes = require("./routes/index");
const sequelize = require("./config/db.js");
app.use(express.json());

app.use(loggerMiddleware);
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connection ");
  })
  .catch((err) => console.log("error: ", err.message));

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
