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
exports.getBlogs = exports.changeStatusCompany = exports.getCompanyById = exports.addCardCompany = exports.companyByZipCode = exports.companyLogin = exports.createCompany = exports.getAllCompany = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const hass_1 = require("../utils/hass");
const jwt_1 = require("../utils/jwt");
const stripe_controllers_1 = require("../controllers/stripe.controllers");
const getAllCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(size, 10);
    const offset = (pageNumber - 1) * pageSize;
    try {
        const { count, rows } = yield dbConnect_1.default.Company.findAndCountAll({
            offset,
            limit: pageSize,
            include: [
                {
                    model: dbConnect_1.default.Token,
                },
                {
                    model: dbConnect_1.default.ZipCode,
                },
                {
                    model: dbConnect_1.default.Trade,
                    include: dbConnect_1.default.Class
                },
            ],
        });
        const totalPages = Math.ceil(count / pageSize);
        return res.status(200).send({
            message: "Success",
            status: 200,
            totalPages,
            currentPage: pageNumber,
            totalCompany: count,
            companies: rows,
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
exports.getAllCompany = getAllCompany;
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name_company, address, phone, email, password, ZipCodeId, customerstripeId } = req.body;
    try {
        const existingCompany = yield dbConnect_1.default.Company.findOne({
            where: { email },
        });
        if (existingCompany) {
            console.log("Company already exists");
            return res.status(200).json({
                message: "Company already exists",
                status: 400,
                created: false,
            });
        }
        const hashedPassword = yield (0, hass_1.encrypt)(password);
        const createdCompany = yield dbConnect_1.default.Company.create({
            name_company,
            address,
            phone,
            email,
            password: hashedPassword,
            ZipCodeId,
            customerstripeId,
        });
        yield (0, stripe_controllers_1.createCustomer)(email);
        console.log("Company created successfully:", createdCompany.get({ plain: true }));
        return res.status(201).json({
            message: "Company created successfully",
            status: 201,
            company: createdCompany,
            created: true
        });
    }
    catch (error) {
        console.error("Error creating company:", error);
        return res.status(500).json({
            message: "Error created Company",
            created: false,
            status: 500,
        });
    }
});
exports.createCompany = createCompany;
const companyLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const checkIs = yield dbConnect_1.default.Company.findOne({
            where: { email },
        });
        if (!checkIs) {
            return res.status(200).send({
                status: 400,
                message: "NOT_FOUND_USER",
                login: false,
                company: { token: "" }
            });
        }
        const passwordHash = checkIs.password;
        const isCorrect = yield (0, hass_1.verified)(password, passwordHash);
        if (!isCorrect) {
            return res.status(200).send({
                status: 400,
                message: "NOT_FOUND_USER",
                login: false,
                company: { token: "" }
            });
        }
        const token = (0, jwt_1.generateToken)(checkIs.id, checkIs.isAdmin);
        const data = {
            token
        };
        return res.status(200).send({
            status: 200,
            message: "Login correct",
            company: data,
            login: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
            login: false
        });
    }
});
exports.companyLogin = companyLogin;
const companyByZipCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { zipCode } = req.query;
    try {
        const findAllCompany = yield dbConnect_1.default.Company.findAll({
            include: [
                {
                    model: dbConnect_1.default.ZipCode,
                    where: { code: zipCode },
                },
                {
                    model: dbConnect_1.default.Trade
                },
            ],
        });
        if (findAllCompany.length === 0) {
            return res.status(400).json({
                message: "No hay compañias con ese codigo postal",
                status: "400",
                companies: [],
            });
        }
        return res.status(200).json({
            message: "ok",
            status: 200,
            companies: findAllCompany,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
        });
    }
});
exports.companyByZipCode = companyByZipCode;
const addCardCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TokenId, CompanyId } = req.body;
    try {
        const updatedCompany = yield dbConnect_1.default.Company.update({ TokenId }, { where: { id: CompanyId } });
        if (updatedCompany[0] === 1) {
            return res.status(200).json({
                message: "TokenId added successfully to Company",
                status: 200,
            });
        }
        else {
            return res.status(404).json({
                message: "Company not found",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
        });
    }
});
exports.addCardCompany = addCardCompany;
const getCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const company = yield dbConnect_1.default.Company.findByPk(id, {
            include: [
                {
                    model: dbConnect_1.default.TradeCompanyUser,
                    attributes: ["id", "name"],
                    include: {
                        model: dbConnect_1.default.Class,
                        attributes: ["id", "name"],
                    }
                },
                {
                    model: dbConnect_1.default.User,
                }
            ],
        });
        if (company) {
            return res.status(200).json({
                message: "ok",
                status: 200,
                company,
            });
        }
        else {
            return res.status(404).json({
                message: "Company not found",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
        });
    }
});
exports.getCompanyById = getCompanyById;
const changeStatusCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CompanyId, status } = req.body;
    if (!CompanyId || typeof status !== 'boolean') {
        return res.status(400).json({
            message: 'Invalid request body',
            status: 400,
        });
    }
    try {
        const company = yield dbConnect_1.default.Company.findOne({
            where: { id: CompanyId }
        });
        if (!company) {
            return res.status(404).json({
                message: 'Company not found',
                status: 404,
            });
        }
        company.status = status;
        const updatedCompany = yield company.save();
        return res.status(200).json({
            message: 'Company status has been changed',
            status: 200,
            company: updatedCompany,
        });
    }
    catch (error) {
        console.error('Error changing company status:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
            error: error.message,
        });
    }
});
exports.changeStatusCompany = changeStatusCompany;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield dbConnect_1.default.Blog.findAll();
        return res.status(200).json({
            message: 'ok',
            status: 200,
            blogs,
        });
    }
    catch (error) {
        console.error('Error getting blogs:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
            error: error.message,
        });
    }
});
exports.getBlogs = getBlogs;
