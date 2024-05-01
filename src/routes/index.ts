import { Router } from "express";
import zipCodeRouter from "./zipCode.router";
import userRouter from "./user.router";
import companyRouter from "./company.router";
import tradeRouter from "./trade.router";
import tokenRouter from "./token.router";
import classRouter from "./class.router"
import stripeRouter from "./stripe.router"

const router = Router();

router.use("/", zipCodeRouter);
router.use("/", userRouter);
router.use("/", companyRouter);
router.use("/", tradeRouter);
router.use("/", tokenRouter)
router.use("/", classRouter)
router.use("/",  stripeRouter)

export default router;
