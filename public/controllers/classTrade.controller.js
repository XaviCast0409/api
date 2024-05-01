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
exports.deleteClassTrade = exports.createClassTrade = exports.createClass = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ClassId, TradeId } = req.body;
    try {
        const createClassTrade = yield dbConnect_1.default.ClassTrade.create({
            ClassId,
            TradeId,
        });
        return res.status(201).json({
            message: "ClassTrade created successfully",
            status: 201,
            ClassTrade: createClassTrade,
            isSuccess: true,
        });
    }
    catch (error) {
        console.error("Error creating company:", error);
        return res.status(500).json({
            message: "Company-Trade already exists",
            status: 500,
            isSuccess: false,
        });
    }
});
exports.createClass = createClass;
const createClassTrade = (ClassId, TradeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createClassTrade = yield dbConnect_1.default.ClassTrade.create({
            ClassId,
            TradeId,
        });
        return createClassTrade;
    }
    catch (error) {
        console.error("Error creating company:", error);
        return;
    }
});
exports.createClassTrade = createClassTrade;
const deleteClassTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ClassId, TradeId } = req.body; // Asumo que los IDs se envían en el cuerpo de la solicitud
    try {
        // Busca el registro ClassTrade que coincida con los IDs proporcionados
        const classTrade = yield dbConnect_1.default.ClassTrade.findOne({
            where: {
                ClassId,
                TradeId,
            },
        });
        if (!classTrade) {
            return res.status(404).json({
                message: "ClassTrade not found",
                status: 404,
                isSuccess: false,
            });
        }
        // Elimina el registro ClassTrade
        yield classTrade.destroy();
        return res.status(200).json({
            message: "ClassTrade deleted successfully",
            status: 200,
            isSuccess: true,
        });
    }
    catch (error) {
        console.error("Error deleting ClassTrade:", error);
        return res.status(500).json({
            message: "Error deleting ClassTrade",
            status: 500,
            isSuccess: false,
        });
    }
});
exports.deleteClassTrade = deleteClassTrade;
