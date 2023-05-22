import { Router } from "express";
import { authValidation } from "../middlewares/authorization.middleware.js";
import { getRanking,getMyUser } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/me", authValidation, getMyUser);
usersRouter.get("/ranking", getRanking);

export default usersRouter;