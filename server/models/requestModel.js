const { DataTypes } = require ("sequelize")
const sequelize = require("../config/db")

const Request = sequelize.define("request", {
    userId:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    request:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    sort:{
        type:DataTypes.STRING,
        allowNull:true
    },
    limit:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validator:{
            max:50
        }        
    }
})


module.exports = Request