const {body} = require("express-validator")

class Validate{
    validateBodyUser() {
        return [
            body("login").notEmpty().withMessage("Введите логин!").isString(),
            body("password").notEmpty().withMessage("Введите пароль!").isLength({ min: 8 }).withMessage("Пароль должен содержать минимум 8 символов.")
        ];
    }
}


module.exports = new Validate()