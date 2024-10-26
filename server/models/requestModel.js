const { DataTypes } = require ("sequelize")
const sequelize = require("../config/db")

const Request = sequelize.define("Request", {
    request:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    limit:{
        type: DataTypes.INTEGER,
        allowNull:false,        
    }
})


module.exports = Request