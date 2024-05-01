"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadZipCodeData = void 0;
const zipCodes_json_1 = __importDefault(require("../json/zipCodes.json"));
function loadZipCodeData() {
    try {
        const jsonData = zipCodes_json_1.default;
        return Object.keys(jsonData);
    }
    catch (error) {
        console.error("Error cargando los datos de los códigos postales:", error);
        return [];
    }
}
exports.loadZipCodeData = loadZipCodeData;
