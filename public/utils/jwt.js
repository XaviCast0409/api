"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";
const generateToken = (id, isAdmin) => {
    const jwt = (0, jsonwebtoken_1.sign)({ id, isAdmin }, JWT_SECRET, {
        expiresIn: '2h'
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
