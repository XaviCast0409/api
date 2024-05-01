"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClass = exports.classCreate = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const classCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const findClass = yield dbConnect_1.default.Class.findOne({
            where: { name },
        });
        if (findClass) {
            return res.status(400).json({
                message: "class already exits",
                status: 400,
            });
        }
        const createClass = yield dbConnect_1.default.Class.create({
            name,
        });
        return res.status(200).json({
            message: "Class created",
            status: 200,
            class: createClass,
        });
    }
    catch (error) {
        console.error("Error creating Class:", error);
        return res.status(500).json({
            message: "Class already exists",
            status: 500,
            isSuccess: false,
        });
    }
});
exports.classCreate = classCreate;
const getAllClass = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllClass = yield dbConnect_1.default.Class.findAll();
        return res.status(200).json({
            message: "ok",
            status: 200,
            classes: findAllClass,
        });
    }
    catch (error) {
        console.error("Error creating Class:", error);
        return res.status(500).json({
            message: "Class already exists",
            status: 500,
            isSuccess: false,
        });
    }
});
exports.getAllClass = getAllClass;
