import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";
import { signUp } from "../controllers/users.controller.js";


const authRouter = Router();


authRouter.post("/signup", validateSchema(userSchema), signUp);

export default authRouter;