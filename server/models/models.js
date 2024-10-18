const sequelize = require("../config/db");

const Users = require("./userModel.model");

(async () => {
  try {
    await sequelize.sync();
    console.log("⚡️ Tables synced");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
})();

module.exports = { Users };