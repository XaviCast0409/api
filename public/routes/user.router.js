"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userTrade_controller_1 = require("../controllers/userTrade.controller");
const companyUser_controller_1 = require("../controllers/companyUser.controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/all-users", user_controller_1.getAllUser);
userRouter.post("/create-user", user_controller_1.createUser);
userRouter.post("/user-by-id", user_controller_1.userById);
userRouter.post("/create-trade-user", userTrade_controller_1.createUserTrade);
userRouter.post("/create-company-user", companyUser_controller_1.createCompanyUser);
/* filter create user from front */
userRouter.get("/filter-company-user", user_controller_1.filterCompaniesForUsers);
exports.default = userRouter;
