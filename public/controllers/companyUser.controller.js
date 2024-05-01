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
exports.createCompanyUserFunction = exports.createCompanyUser = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const stripeConfig_1 = __importDefault(require("../stripe/stripeConfig"));
const createCompanyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserId, CompanyId } = req.body;
    try {
        const createCompanyUser = yield dbConnect_1.default.CompanyUser.create({
            UserId, CompanyId
        });
        // pago de los 5 dolares
        const paymentIntent = yield stripeConfig_1.default.paymentIntents.create({
            amount: 5000,
            currency: "usd",
            customer: UserId.toString(), //custumerId
            confirm: true,
            metadata: {
                CompanyId: CompanyId.toString()
            }
        });
        return res.status(201).json({
            message: 'CompanyUser created successfully',
            status: 201,
            CompanyUser: createCompanyUser,
            paymentIntent
        });
    }
    catch (error) {
        console.error('Error creating company user:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.createCompanyUser = createCompanyUser;
const createCompanyUserFunction = (UserId, CompanyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createCompanyUser = yield dbConnect_1.default.CompanyUser.create({
            UserId: UserId, CompanyId: CompanyId
        });
        console.log('CompanyUser created successfully', createCompanyUser);
    }
    catch (error) {
        console.error('Error creating company user:', error);
        throw error;
    }
});
exports.createCompanyUserFunction = createCompanyUserFunction;
