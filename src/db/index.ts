import mongoose from "mongoose";
import {Sequelize} from 'sequelize'

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db')[env];

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/vetpassChat", {
      connectTimeoutMS: 5000,
    });
    console.log("MongoDb Connected");
  };
connectDB();
export const mongoConnection = connectDB;