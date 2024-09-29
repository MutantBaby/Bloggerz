import chalk from "chalk";
import pkg from "jsonwebtoken";
import { config } from "dotenv";
import Author from "../models/auth-model.js";

config();
const { verify } = pkg;

const authMiddleware = async (req, res, next) => {
  try {
    console.log("Auth Middleware");

    const authorization = await req.header("Authorization");
    const token = await authorization.split(" ")[1];
    const isVerified = verify(token, process.env.SECRET);

    console.log("Verified ", isVerified);

    if (!token && !isVerified)
      res.status(401).json({ message: "Unauthorized!" });
    else {
      const user = await Author.findOne({ email: isVerified.email }).select({
        password: 0,
      });

      req.user = user;
      req.id = user._id.toString();
      req.token = token;

      console.log("Auth Middleware All True");

      next();
    }
  } catch (error) {
    console.log(chalk.magenta(`[authMiddleware] ${error.message}`));
  }
};

export default authMiddleware;
