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
exports.createUserTrade = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const createUserTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserId, TradeId } = req.body;
    try {
        const createUserTrade = yield dbConnect_1.default.UserTrade.create({
            UserId, TradeId
        });
        return res.status(201).json({
            message: 'UserTrade created successfully',
            status: 201,
            UserTrade: createUserTrade
        });
    }
    catch (error) {
        console.error('Error creating company:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.createUserTrade = createUserTrade;
