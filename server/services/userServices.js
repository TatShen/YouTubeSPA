const { Users, Request } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserServices {
  async registration({ login, password }, res) {
    try {
      if (await Users.findOne({ where: { login } })) {
        res.status(400).json({ message: "Такой пользователь уже существует" });
        return;
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await Users.create({ login, password: hashedPassword });
      res
        .status(200)
        .json({ message: "Пользователь успешно зарегистрирован!" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка регистрации пользователя" });
    }
  }

  async login({ login, password }, res) {
    try {
      const user = await Users.findOne({ where: { login } });
      if (!user) {
        res.status(401).json({ message: "Неверный логин или пароль" });
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Неверный логин или пароль" });
        return;
      }
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });
      res.status(200).json({ access_token: token, requests: user.requests });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async getUser(req, res) {
    try {
      const user = await Users.findByPk(req.userId, {
        include: [
          {
            model: Request,
            through: { attributes: [] },
          },
        ],
      });
      if (!user) {
        res.status(401).send("Пользователь не авторизован!");
      }

      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async addRequest(req, res) {
    try {
      const user = await Users.findByPk(req.userId, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Request,
            as: "Requests",
            attributes: ["request", "name", "sort", "limit"],
          },
        ],
      });
      if (!user) {
        res.status(401).send("Пользователь не авторизован!");
      }
      console.log(req.userId)

      if (!Array.isArray(user.requests)) {
        user.requests = [];
      }
      const newRequest = await Request.create({ userId: req.userId, ...req.body });

      await user.addRequest(newRequest);

      await user.reload();

      res.status(200).json({ user: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new UserServices();
