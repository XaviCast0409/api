import { Router } from "express";
import { getAllUser, createUser, userById, filterCompaniesForUsers } from "../controllers/user.controller";
import { createUserTrade } from "../controllers/userTrade.controller";
import { createCompanyUser } from "../controllers/companyUser.controller";

const userRouter = Router();

userRouter.get("/all-users", getAllUser);
userRouter.post("/create-user", createUser);
userRouter.post("/user-by-id", userById);
userRouter.post("/create-trade-user", createUserTrade)
userRouter.post("/create-company-user", createCompanyUser)

/* filter create user from front */
userRouter.get("/filter-company-user", filterCompaniesForUsers);

export default userRouter;
