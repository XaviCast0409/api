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
exports.filterCompaniesForUsers = exports.userById = exports.createUser = exports.getAllUser = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const companyUser_controller_1 = require("./companyUser.controller");
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(size, 10);
    const offset = (pageNumber - 1) * pageSize;
    try {
        const { count, rows } = yield dbConnect_1.default.User.findAndCountAll({
            offset,
            limit: pageSize,
            include: dbConnect_1.default.ZipCode,
        });
        const totalPages = Math.ceil(count / pageSize);
        return res.status(200).json({
            message: "ok",
            status: 200,
            totalPages,
            currentPage: pageNumber,
            totalUsers: count,
            user: rows,
        });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getAllUser = getAllUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name, email, phone, address, zipCodeId, CompanyId, } = req.body;
    try {
        const findUser = yield dbConnect_1.default.User.findOne({
            where: { email },
        });
        if (findUser) {
            return res.status(400).send({
                message: "User already exists",
                status: 200,
            });
        }
        const newUser = yield dbConnect_1.default.User.create({
            name,
            last_name,
            email,
            phone,
            address,
            ZipCodeId: zipCodeId,
        });
        console.log(newUser);
        if (CompanyId && CompanyId.length > 0) {
            for (let i = 0; i < CompanyId.length; i++) {
                yield (0, companyUser_controller_1.createCompanyUserFunction)(newUser.id, CompanyId[i]);
            }
        }
        return res.status(200).send({
            status: 200,
            message: "User was created correctly",
            user: newUser,
        });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.createUser = createUser;
const userById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const findUserId = yield dbConnect_1.default.User.findOne({
            where: { id },
        });
        return res.status(200).json({
            message: "ok",
            status: 200,
            user: findUserId,
        });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.userById = userById;
const filterCompaniesForUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { zipcode, tradeId, classId } = req.query;
        console.log(zipcode, tradeId, classId);
        let whereClause = {};
        if (zipcode) {
            whereClause.zipcode = zipcode;
        }
        let includeClauses = [
            {
                model: dbConnect_1.default.ZipCode,
                where: { code: zipcode },
            },
        ];
        if (Number(tradeId) !== 0 && Number(tradeId) > 0) {
            includeClauses.push({
                model: dbConnect_1.default.TradeCompanyUser,
                required: true,
                where: {
                    id: tradeId,
                },
            });
        }
        else {
            includeClauses.push({
                model: dbConnect_1.default.TradeCompanyUser,
                required: true,
            });
        }
        if (Number(classId) && Number(classId) > 0) {
            const classIdFilter = {
                model: dbConnect_1.default.Class,
                where: {
                    id: classId,
                },
            };
            includeClauses[1] = Object.assign(Object.assign({}, includeClauses[1]), { include: classIdFilter });
        }
        else {
            const classIdFilter = {
                model: dbConnect_1.default.Class,
            };
            includeClauses[1] = Object.assign(Object.assign({}, includeClauses[1]), { include: classIdFilter });
        }
        const companies = yield dbConnect_1.default.Company.findAll({
            include: includeClauses,
        });
        const trades = [];
        const classes = [];
        companies === null || companies === void 0 ? void 0 : companies.forEach((company) => {
            var _a;
            (_a = company === null || company === void 0 ? void 0 : company.TradeCompanyUsers) === null || _a === void 0 ? void 0 : _a.forEach((trade) => {
                const { id, name, Classes } = trade;
                const existingTrade = trades === null || trades === void 0 ? void 0 : trades.find((t) => t.id === id);
                if (!existingTrade) {
                    trades.push({ id, name });
                }
                Classes === null || Classes === void 0 ? void 0 : Classes.forEach((cls) => {
                    const { id: classId, name: className } = cls;
                    const existingClass = classes === null || classes === void 0 ? void 0 : classes.find((c) => c.id === classId);
                    if (!existingClass) {
                        classes.push({ id: classId, name: className });
                    }
                });
            });
        });
        const companiesId = companies.map((company) => company.id);
        return res.status(200).json({
            message: "ok",
            trades,
            classes,
            companiesId,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener las compañías." });
    }
});
exports.filterCompaniesForUsers = filterCompaniesForUsers;
