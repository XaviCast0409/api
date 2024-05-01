"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenCard_controller_1 = require("../controllers/tokenCard.controller");
const tokenRouter = (0, express_1.Router)();
tokenRouter.post('/create-token', tokenCard_controller_1.createTokenCard);
exports.default = tokenRouter;
