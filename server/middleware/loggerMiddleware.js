function loggerMiddleware(req, res, next) {
  console.log(`Запрос по адресу: ${req.url}, метод ${req.method}`);
  
  if (req.body) {
      console.log("Тело запроса:", req.body);
  }


  res.on('finish', () => {
      console.log(`Ответ со статусом: ${res.statusCode}`);
  });

  next();
}

module.exports = loggerMiddleware;
