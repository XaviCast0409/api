"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const class_controller_1 = require("../controllers/class.controller");
const classRouter = (0, express_1.Router)();
classRouter.get("/all-classes", class_controller_1.getAllClass);
classRouter.post("/create-class", class_controller_1.classCreate);
exports.default = classRouter;
