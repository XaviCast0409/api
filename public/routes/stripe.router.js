"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const StripeController = __importStar(require("../controllers/stripe.controllers"));
const stripeRouter = (0, express_1.Router)();
stripeRouter.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
// Checkout
stripeRouter
    .post("/checkout", StripeController.stripeId)
    .get("/checkout-session/:id", StripeController.stripeById)
    .get("/create-checkout-session", StripeController.createCheckoutSession);
// Clientes y métodos de pago
stripeRouter
    .post("/create-customer", StripeController.createCustomer)
    .get("/secret-client", StripeController.secretClient)
    .get("/all-customers", StripeController.getAllCustomers)
    .get("/payment-method-id", StripeController.getPaymentMethodId);
// Configuración de pagos
stripeRouter
    .post("/create-setupIntent", StripeController.createSetupIntent)
    .post("/create-payment-intent", StripeController.createPaymentIntent)
    .post("/handle-payment-failure", StripeController.handlePaymentFailure)
    .delete("/delete-payment-method", StripeController.deletePaymentMethod);
// Tarjetas
stripeRouter
    .post("/associate-card-with-payment", StripeController.associateCardWithPayment)
    .post('/add-card-details', StripeController.addCardDetails)
    .post("/create-card-token", StripeController.createCardToken);
// Webhooks
stripeRouter
    .post("/webhook", StripeController.webhook)
    .get("/webhook-endpoint", StripeController.webhook);
exports.default = stripeRouter;
/**
 * cus_Q1Rkf1P6hRCEAv
 */ 
