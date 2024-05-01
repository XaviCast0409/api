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
exports.createAction = exports.getAllEstimaticionAction = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const getAllEstimaticionAction = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllAction = yield dbConnect_1.default.EstimateAction.findAll();
        return res.status(200).json({
            message: 'ok',
            status: 200,
            estimateActions: getAllAction
        });
    }
    catch (error) {
        console.error('Error retrieving companies:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
            error: error.message,
        });
    }
});
exports.getAllEstimaticionAction = getAllEstimaticionAction;
const createAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const findAction = yield dbConnect_1.default.EstimateAction.findOne({
            where: { name }
        });
        if (findAction) {
            return res.status(400).json({
                message: 'Action already exists',
                status: 400
            });
        }
        const createAction = yield dbConnect_1.default.EstimateAction.create({
            name
        });
        return res.status(201).json({
            message: 'Action created successfully',
            status: 201,
            estimateAction: createAction
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
            error: error.message,
        });
    }
});
exports.createAction = createAction;
