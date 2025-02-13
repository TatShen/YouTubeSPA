require("dotenv").config();
const express = require("express");
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swaggerSpec.js')
const app = express();
const loggerMiddleware = require("./middleware/loggerMiddleware");
const routes = require("./routes/index");
const sequelize = require("./config/db.js");
const cors = require("cors");

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

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


module.exports = app;