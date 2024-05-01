import { Router } from "express";
import { classCreate, getAllClass } from "../controllers/class.controller";

const classRouter = Router();

classRouter.get("/all-classes", getAllClass);
classRouter.post("/create-class", classCreate);

export default classRouter;
