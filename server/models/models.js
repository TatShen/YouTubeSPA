const sequelize = require("../config/db");
const { DataTypes } = require ("sequelize")
const Users = require("./userModel.model");
const Request = require("./requestModel");

const UserRequests = sequelize.define("UserRequests", {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
  },
  RequestId: {
    type: DataTypes.INTEGER,
    references: {
      model: Request,
      key: 'id',
    },
  },
});

Request.belongsToMany(Users, { through: UserRequests });
Users.belongsToMany(Request, { through: UserRequests });


(async () => {
  try {
    await sequelize.sync();
    console.log("⚡️ Tables synced");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
})();

module.exports = { Users, Request, UserRequests };