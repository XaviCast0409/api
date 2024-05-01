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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProjectDetail = exports.addEstimateAction = exports.createTrade = exports.getTradeById = exports.getAllTradePagination = exports.getAllTrade = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const classTrade_controller_1 = require("./classTrade.controller");
const getAllTrade = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllTrades = yield dbConnect_1.default.Trade.findAll();
        return res.status(200).send({
            message: "ok",
            status: 200,
            trade: findAllTrades,
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
exports.getAllTrade = getAllTrade;
const getAllTradePagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(size, 10);
    const offset = (pageNumber - 1) * pageSize;
    try {
        const { count, rows } = yield dbConnect_1.default.Trade.findAndCountAll({
            offset,
            limit: pageSize,
        });
        const totalPages = Math.ceil(count / pageSize);
        return res.status(200).send({
            message: "Success",
            status: 200,
            totalPages,
            currentPage: pageNumber,
            totalTrade: count,
            trades: rows,
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
exports.getAllTradePagination = getAllTradePagination;
const getTradeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TradeId } = req.query;
    try {
        const findTradeId = yield dbConnect_1.default.Trade.findOne({
            where: { name: TradeId },
            include: dbConnect_1.default.Class
        });
        return res.status(200).send({
            message: "ok",
            status: 200,
            trade: findTradeId,
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
exports.getTradeById = getTradeById;
const createTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const { name, account, classIdArray } = req.body;
    // Validación de datos de entrada
    if (!name || !account) {
        return res.status(400).json({
            message: 'Name and account are required',
            status: 400,
        });
    }
    try {
        const findTrade = yield dbConnect_1.default.Trade.findOne({
            where: { name },
        });
        if (findTrade) {
            return res.status(400).json({
                message: 'Trade already exists',
                status: 400,
            });
        }
        const newTrade = yield dbConnect_1.default.Trade.create({
            name,
            account,
        });
        if (classIdArray && classIdArray.length > 0) {
            console.log(classIdArray);
            try {
                for (var _d = true, classIdArray_1 = __asyncValues(classIdArray), classIdArray_1_1; classIdArray_1_1 = yield classIdArray_1.next(), _a = classIdArray_1_1.done, !_a; _d = true) {
                    _c = classIdArray_1_1.value;
                    _d = false;
                    const classId = _c;
                    if (classId === 0) {
                        continue; // Ignora la iteración actual y pasa a la siguiente
                    }
                    yield (0, classTrade_controller_1.createClassTrade)(classId, newTrade.id);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = classIdArray_1.return)) yield _b.call(classIdArray_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        const tradeClass = yield dbConnect_1.default.Trade.findOne({
            where: { id: newTrade.id },
            include: dbConnect_1.default.Class,
        });
        return res.status(201).json({
            message: 'Trade was created',
            status: 201,
            trade: tradeClass,
        });
    }
    catch (error) {
        console.error('Error creating trade:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
            error: error.message,
        });
    }
});
exports.createTrade = createTrade;
const addEstimateAction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { EstimateActionId, TradeId } = req.body;
    try {
        const updateTrade = yield dbConnect_1.default.Trade.update({ EstimateActionId }, { where: { id: TradeId } });
        if (updateTrade[0] === 1) {
            return res.status(200).json({
                message: "EstimateActionId added successfully to Trade",
                status: 200,
            });
        }
        else {
            return res.status(404).json({
                message: "Trade not found",
                status: 404,
            });
        }
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
exports.addEstimateAction = addEstimateAction;
const addProjectDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProjectDetailId, TradeId } = req.body;
    try {
        const updateTrade = yield dbConnect_1.default.Trade.update({ ProjectDetailId }, { where: { id: TradeId } });
        if (updateTrade[0] === 1) {
            return res.status(200).json({
                message: "ProjectDetailId added successfully to Trade",
                status: 200,
            });
        }
        else {
            return res.status(404).json({
                message: "Trade not found",
                status: 404,
            });
        }
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
exports.addProjectDetail = addProjectDetail;
