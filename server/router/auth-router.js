import { Router } from "express";
import validate from "../middleware/validate-middleware.js";
import authMiddleware from "../middleware/auth-middleware.js";
import { registerSchema, loginSchema } from "../validators/auth-validator.js";
import register, {
  user,
  login,
  editUser,
} from "../controller/auth-controller.js";

const router = Router();

router.route("/login").post(validate(loginSchema), login);
router.route("/register").post(validate(registerSchema), register);

router.route("/user").get(authMiddleware, user);
router.route("/edit").patch(authMiddleware, editUser);

export default router;
