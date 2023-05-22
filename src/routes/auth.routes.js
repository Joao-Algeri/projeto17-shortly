import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";
import { signUp } from "../controllers/users.controller.js";
import { signIn } from "../controllers/auth.controller.js";
import loginSchema from "../schemas/loginSchema.js";

const authRouter = Router();

authRouter.post("/signin", validateSchema(loginSchema), signIn);
authRouter.post("/signup", validateSchema(userSchema), signUp);

export default authRouter;