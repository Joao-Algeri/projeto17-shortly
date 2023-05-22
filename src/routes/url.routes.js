import { urlsRouter } from "express";
import { authValidation } from "../middlewares/authorization.middleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { urlShortener } from "../controllers/url.controller.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten",validateSchema(urlSchema),authValidation,urlShortener);


export default urlsRouter;