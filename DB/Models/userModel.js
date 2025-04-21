import { DataTypes } from "sequelize";
import {sequelize} from "../dbConnection.js"

const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gender:{
        type:DataTypes.ENUM("male", "female"),
        defaultValue:"male"
    },
    login_status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},
{timeStamp:true}
)


export default User;