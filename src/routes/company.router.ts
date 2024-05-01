import { Router } from "express";
import {
  getAllCompany,
  createCompany,
  companyByZipCode,
  addCardCompany,
  companyLogin,
  getCompanyById,
  changeStatusCompany,
} from "../controllers/company.controller";

import { createCompanyTrade } from "../controllers/companyTrade.controller";
import {
  createRelationCompanyProfileTrade,
  createTradeClassCompanyUser,
  getTradeCompanyUser,
  deleteTradeClassCompanyUser,
} from "../controllers/CompanyProfile.controller";

import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../controllers/blog.controller";

const companyRouter = Router();

companyRouter.get("/all-companies", getAllCompany);
companyRouter.get("/company-by-id/:id", getCompanyById);
companyRouter.post("/create-company", createCompany);
companyRouter.post("/login-company", companyLogin);
companyRouter.get("/company-zip-code", companyByZipCode);
companyRouter.put("/add-card-company", addCardCompany);
companyRouter.patch("/change-status", changeStatusCompany);

/* rutas blogs company */

companyRouter.get("/company-all-blogs", getAllBlogs);
companyRouter.post("/company-blog-create", createBlog);
companyRouter.post("/company-blog-byId", getBlogById);
companyRouter.post("/company-blog-update", updateBlog);
companyRouter.post("/company-blog-delete", deleteBlog);


/* company profile */
companyRouter.post("/create-trade-companyProfile", createRelationCompanyProfileTrade);
companyRouter.post("/create-trade-class-company-profile", createTradeClassCompanyUser);
companyRouter.get("/trade-company-profile", getTradeCompanyUser);
companyRouter.delete("/delete-trade-class-company-profile", deleteTradeClassCompanyUser);

// add tradeCompany admin
companyRouter.post("/add-trade-company", createCompanyTrade);

export default companyRouter;
