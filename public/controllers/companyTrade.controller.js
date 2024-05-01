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
exports.createCompanyTrade = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const createCompanyTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CompanyId, TradeId } = req.body;
    try {
        const createCompanyTrade = yield dbConnect_1.default.CompanyTrade.create({
            CompanyId, TradeId
        });
        return res.status(201).json({
            message: 'CompranyTrade created successfully',
            status: 201,
            CompanyTrade: createCompanyTrade,
            isSuccess: true
        });
    }
    catch (error) {
        console.error('Error creating company:', error);
        return res.status(500).json({
            message: 'Company-Trade already exists',
            status: 500,
            isSuccess: false
        });
    }
});
exports.createCompanyTrade = createCompanyTrade;
