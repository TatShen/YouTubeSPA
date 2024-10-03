function loggerMiddleware(req, res, next) {
    console.log(`Запрос по адресу: ${req.url}, метод ${req.method}`);
    next(); 
  }

module.exports = loggerMiddleware