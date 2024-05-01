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
const node_cron_1 = __importDefault(require("node-cron"));
const companyTrade_controller_1 = require("../controllers/companyTrade.controller");
// Importa las funciones necesarias
const stripe_controllers_1 = require("../controllers/stripe.controllers");
node_cron_1.default.schedule('0 0 * * 1', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activeSubscriptions = yield (0, stripe_controllers_1.getAllActiveSubscriptions)();
        activeSubscriptions.forEach((subscription) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, companyTrade_controller_1.createCompanyTrade)({ tradeId: subscription.tradeId, companyId: subscription.companyId }, 5);
        }));
        console.log('Trades asignados correctamente a todas las suscripciones activas');
    }
    catch (error) {
        console.error('Error al asignar trades a las suscripciones activas:', error);
    }
}));
