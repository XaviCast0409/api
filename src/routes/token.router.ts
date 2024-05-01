import { Router } from "express";
import { createTokenCard } from "../controllers/tokenCard.controller";

const tokenRouter = Router()

tokenRouter.post('/create-token', createTokenCard)

export default tokenRouter