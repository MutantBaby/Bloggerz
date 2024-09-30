import cors from "cors";
import chalk from "chalk";
import express from "express";
import { config } from "dotenv";
import database from "./utils/database.js";
import authRouter from "./router/auth-router.js";
import blogRouter from "./router/blog-router.js";
import commentRouter from "./router/comment-router.js";
import corsMiddleware from "./middleware/cors-middleware.js";

//done

config();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://bloggerz-c.vercel.app/",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use("/api/auth", corsMiddleware, authRouter);
app.use("/api/blog", corsMiddleware, blogRouter);
app.use("/api/comment", corsMiddleware, commentRouter);

app.listen(process.env.PORT, async () => {
  await database();
  console.log(chalk.cyan(`[listen] ${process.env.PORT}`));
});
