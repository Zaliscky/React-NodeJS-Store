require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const models = require("./models/models");
const sequelize = require("./db");
const router = require("./routes/index");
const errorHandler = require('./middleware/ErrorHandingMiddleware')
const path = require('path')
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json()); // for parsing JSON
app.use(express.static(path.resolve(__dirname,'static')));// явно указываем серверу, что файлы раздаем как статику
app.use(fileUpload({})); 
app.use("/api", router);

//Error handling, last ,iddleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); //сверяем состояние базы данных со схемой данных
    app.listen(PORT, () => console.log(`Server was started on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start(); //запуск сервера
