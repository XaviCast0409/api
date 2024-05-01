"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = require("../controllers/company.controller");
const companyTrade_controller_1 = require("../controllers/companyTrade.controller");
const CompanyProfile_controller_1 = require("../controllers/CompanyProfile.controller");
const blog_controller_1 = require("../controllers/blog.controller");
const companyRouter = (0, express_1.Router)();
companyRouter.get("/all-companies", company_controller_1.getAllCompany);
companyRouter.get("/company-by-id/:id", company_controller_1.getCompanyById);
companyRouter.post("/create-company", company_controller_1.createCompany);
companyRouter.post("/login-company", company_controller_1.companyLogin);
companyRouter.get("/company-zip-code", company_controller_1.companyByZipCode);
companyRouter.put("/add-card-company", company_controller_1.addCardCompany);
companyRouter.patch("/change-status", company_controller_1.changeStatusCompany);
/* rutas blogs company */
companyRouter.get("/company-all-blogs", blog_controller_1.getAllBlogs);
companyRouter.post("/company-blog-create", blog_controller_1.createBlog);
companyRouter.post("/company-blog-byId", blog_controller_1.getBlogById);
companyRouter.post("/company-blog-update", blog_controller_1.updateBlog);
companyRouter.post("/company-blog-delete", blog_controller_1.deleteBlog);
/* company profile */
companyRouter.post("/create-trade-companyProfile", CompanyProfile_controller_1.createRelationCompanyProfileTrade);
companyRouter.post("/create-trade-class-company-profile", CompanyProfile_controller_1.createTradeClassCompanyUser);
companyRouter.get("/trade-company-profile", CompanyProfile_controller_1.getTradeCompanyUser);
companyRouter.delete("/delete-trade-class-company-profile", CompanyProfile_controller_1.deleteTradeClassCompanyUser);
// add tradeCompany admin
companyRouter.post("/add-trade-company", companyTrade_controller_1.createCompanyTrade);
exports.default = companyRouter;
