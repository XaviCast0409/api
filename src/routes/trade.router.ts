import { Router } from "express";
import {
  getAllTrade,
  createTrade,
  addEstimateAction,
  addProjectDetail,
  getTradeById,
  getAllTradePagination
} from "../controllers/trade.controller";
/* import { checkJwt } from "../middelware/session"; */

import { createClass, deleteClassTrade } from "../controllers/classTrade.controller";

const tradeRouter = Router();

tradeRouter.get("/all-trades",/*  checkJwt,  */getAllTrade);
tradeRouter.post("/create-trade", createTrade);
tradeRouter.get("/trade-by-id", getTradeById);

tradeRouter.get("/all-trades-pagination", getAllTradePagination);

tradeRouter.put("/add-estimate-action", addEstimateAction);
tradeRouter.put("/add-project-detail", addProjectDetail);

tradeRouter.post("/class-trade-created", createClass)
tradeRouter.post("/class-trade-delete", deleteClassTrade)

export default tradeRouter;
