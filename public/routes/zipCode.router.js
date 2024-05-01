"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zipCode_controller_1 = require("../controllers/zipCode.controller");
const zipCodeRouter = (0, express_1.Router)();
zipCodeRouter.post('/validate-zip-code', zipCode_controller_1.validateZipCode);
zipCodeRouter.post('/validate-search-code', zipCode_controller_1.findMatchingZipCodes);
zipCodeRouter.post('/create-zip-code', zipCode_controller_1.createZipCode);
exports.default = zipCodeRouter;
