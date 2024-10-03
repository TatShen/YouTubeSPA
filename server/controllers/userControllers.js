const { validationResult } = require("express-validator");
const userServices = require("../services/userServices");

class UserControllers {
  async registration(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }

    await userServices.registration(req.body, res);
  }

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((item) => item.msg) });
    }
    await userServices.login(req.body, res);
  }

  async getUser(req, res) {
    await userServices.getUser(req, res);
  }
}

module.exports = new UserControllers();
