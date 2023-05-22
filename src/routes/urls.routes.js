import { urlsRouter } from "express";
import { authValidation } from "../middlewares/authorization.middleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { getUrlById, openUrl, urlShortener } from "../controllers/url.controller.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten",validateSchema(urlSchema),authValidation,urlShortener);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", openUrl);


export default urlsRouter;