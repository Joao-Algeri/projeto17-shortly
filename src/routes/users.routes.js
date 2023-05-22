import { Router } from "express";
import { authValidation } from "../middlewares/authorization.middleware.js";
import { getMyUser } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/me", authValidation, getMyUser);

export default usersRouter;