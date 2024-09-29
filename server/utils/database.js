import { connect } from "mongoose";
import { config } from "dotenv";
import chalk from "chalk";

config();

const database = async () => {
  const db_str = `mongodb://${process.env.NAME}:${process.env.PASSWORD}@ac-mheu7uz-shard-00-00.g2nhctu.mongodb.net:27017,ac-mheu7uz-shard-00-01.g2nhctu.mongodb.net:27017,ac-mheu7uz-shard-00-02.g2nhctu.mongodb.net:27017/?ssl=true&replicaSet=atlas-xhyklz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=practice-jwt-Cluster1`;

  try {
    await connect(db_str);
    console.log(chalk.cyan(`[database] connected`));
  } catch (error) {
    console.log(chalk.magenta(`[database] ${error.message}`));
  }
};

export default database;
