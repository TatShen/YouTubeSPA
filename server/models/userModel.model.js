const { DataTypes } = require ("sequelize")
const sequelize = require("../config/db")


const User = sequelize.define("User", {
    login:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password:{
        type: DataTypes.STRING
    },
    requests:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
})

module.exports = User