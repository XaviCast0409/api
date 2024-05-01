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
exports.createZipCode = exports.findMatchingZipCodes = exports.validateZipCode = void 0;
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const zipCodes_json_1 = __importDefault(require("../json/zipCodes.json"));
const functionZipCode_1 = require("../utils/functionZipCode");
const validateZipCode = (req, res) => {
    try {
        const zipCode = req.body.zipCode;
        if (!zipCode || isNaN(parseInt(zipCode))) {
            res.status(400).json({
                status: 400,
                message: 'zipcode invalidate',
                validate: false,
            });
            return;
        }
        const jsonData = zipCodes_json_1.default;
        if (!jsonData[zipCode]) {
            res.json({
                status: 400,
                message: 'zipcode invalidate',
                validate: false,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            validate: true,
            message: 'zipcode validate',
            zipCodeData: Object.assign(Object.assign({}, jsonData[zipCode]), { code: zipCode }),
        }); // Código postal encontrado
    }
    catch (error) {
        console.error("Error al validar el código postal:", error);
        res.status(500).json(false); // Error interno del servidor
    }
};
exports.validateZipCode = validateZipCode;
const findMatchingZipCodes = (req, res) => {
    try {
        const searchText = req.body.searchText; // Texto de búsqueda desde el front-end
        if (!searchText) {
            res.status(400).json([]);
            return;
        }
        const zipCodeData = (0, functionZipCode_1.loadZipCodeData)();
        const matches = [];
        for (const zipCodeEntry of zipCodeData) {
            if (zipCodeEntry && zipCodeEntry.includes(searchText)) {
                matches.push(zipCodeEntry);
            }
        }
        res.json(matches.reverse());
    }
    catch (error) {
        console.error("Error al buscar coincidencias de códigos postales:", error);
        res.status(500).json([]);
    }
};
exports.findMatchingZipCodes = findMatchingZipCodes;
const createZipCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, code, state } = req.body;
    try {
        const checkCode = yield dbConnect_1.default.ZipCode.findOne({
            where: { code },
        });
        if (checkCode) {
            return res.status(200).send({
                status: 200,
                message: "ZipCode already exists",
                zipCode: checkCode,
            });
        }
        const newZipCode = yield dbConnect_1.default.ZipCode.create({
            city,
            code,
            state,
        });
        return res.status(200).send({
            status: 200,
            message: "ZipCode was created correctly",
            zipCode: newZipCode,
        });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.createZipCode = createZipCode;
