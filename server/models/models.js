const sequelize = require("../config/db")

(async () => {
    try {
        await sequelize.sync()
        console.log("Synced success!")
    } catch(error){
        console.error("Error syncing tables:", error)
    }
})()