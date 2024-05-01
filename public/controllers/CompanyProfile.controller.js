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
exports.deleteTradeClassCompanyUser = exports.getTradeCompanyUser = exports.createTradeClassCompanyUser = exports.createRelationCompanyProfileTrade = exports.createTradeCompanyUser = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const createTradeCompanyUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tradeCompanyProfile = yield dbConnect_1.default.TradeCompanyUser.create({
            name,
        });
        return tradeCompanyProfile;
    }
    catch (error) {
        return error;
    }
});
exports.createTradeCompanyUser = createTradeCompanyUser;
const createRelationCompanyProfileTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, companyId } = req.body;
        if (!name || !companyId) {
            return res.status(400).json({
                message: "Please provide a name and company id",
                status: 400,
            });
        }
        const findTradeProfile = yield dbConnect_1.default.TradeCompanyUser.findOne({
            where: { name },
        });
        if (findTradeProfile) {
            return res.status(400).json({
                message: "Trade Profile already exists",
                status: 400,
            });
        }
        const createTradeProfile = yield (0, exports.createTradeCompanyUser)(name);
        const relationTradeProfile = yield dbConnect_1.default.TradeCompanyProfile.create({
            TradeCompanyUserId: createTradeProfile.id,
            CompanyId: companyId,
        });
        return res.status(201).json({
            message: "Company Profile created successfully",
            status: 201,
            data: relationTradeProfile,
            trade: createTradeProfile,
        });
    }
    catch (error) {
        console.error("Error retrieving companies:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            error: error.message,
        });
    }
});
exports.createRelationCompanyProfileTrade = createRelationCompanyProfileTrade;
const createTradeClassCompanyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ClassId, TradeCompanyUserId } = req.body;
        if (!ClassId || !TradeCompanyUserId) {
            return res.status(400).json({
                message: "Please provide a ClassId and TradeCompanyUserId",
                status: 400,
            });
        }
        const findTradeClassCompanyUser = yield dbConnect_1.default.TradeClassCompanyUser.findOne({
            where: { ClassId, TradeCompanyUserId },
        });
        if (findTradeClassCompanyUser) {
            return res.status(400).json({
                message: "Trade Class Company User already exists",
                status: 400,
            });
        }
        const createTradeClassCompanyUser = yield dbConnect_1.default.TradeClassCompanyUser.create({
            ClassId,
            TradeCompanyUserId,
        });
        return res.status(201).json({
            message: "Trade Class Company User created successfully",
            status: 201,
            data: createTradeClassCompanyUser,
        });
    }
    catch (error) {
        console.error("Error retrieving companies:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            error: error.message,
        });
    }
});
exports.createTradeClassCompanyUser = createTradeClassCompanyUser;
const getTradeCompanyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tradeCompanyUser = yield dbConnect_1.default.TradeCompanyUser.findAll();
        return res.status(200).json({
            message: "Trade Company User retrieved successfully",
            status: 200,
            data: tradeCompanyUser,
        });
    }
    catch (error) {
        console.error("Error retrieving companies:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            error: error.message,
        });
    }
});
exports.getTradeCompanyUser = getTradeCompanyUser;
const deleteTradeClassCompanyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ClassId, TradeCompanyUserId } = req.body;
        if (!ClassId || !TradeCompanyUserId) {
            return res.status(400).json({
                message: "Please provide a ClassId and TradeCompanyUserId",
                status: 400,
            });
        }
        const findTradeClassCompanyUser = yield dbConnect_1.default.TradeClassCompanyUser.findOne({
            where: { ClassId, TradeCompanyUserId },
        });
        if (!findTradeClassCompanyUser) {
            return res.status(404).json({
                message: "Trade Class Company User not found",
                status: 404,
            });
        }
        yield findTradeClassCompanyUser.destroy();
        return res.status(200).json({
            message: "Trade Class Company User deleted successfully",
            status: 200,
        });
    }
    catch (error) {
        console.error("Error deleting Trade Class Company User:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            error: error.message,
        });
    }
});
exports.deleteTradeClassCompanyUser = deleteTradeClassCompanyUser;
