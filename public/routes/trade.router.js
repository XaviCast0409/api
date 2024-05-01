"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trade_controller_1 = require("../controllers/trade.controller");
/* import { checkJwt } from "../middelware/session"; */
const classTrade_controller_1 = require("../controllers/classTrade.controller");
const tradeRouter = (0, express_1.Router)();
tradeRouter.get("/all-trades", /*  checkJwt,  */ trade_controller_1.getAllTrade);
tradeRouter.post("/create-trade", trade_controller_1.createTrade);
tradeRouter.get("/trade-by-id", trade_controller_1.getTradeById);
tradeRouter.get("/all-trades-pagination", trade_controller_1.getAllTradePagination);
tradeRouter.put("/add-estimate-action", trade_controller_1.addEstimateAction);
tradeRouter.put("/add-project-detail", trade_controller_1.addProjectDetail);
tradeRouter.post("/class-trade-created", classTrade_controller_1.createClass);
tradeRouter.post("/class-trade-delete", classTrade_controller_1.deleteClassTrade);
exports.default = tradeRouter;
