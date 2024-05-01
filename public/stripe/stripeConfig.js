"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default("sk_test_51OzkqmP7so0IzTMyNLbj2rNtyis9WMgo4ExYARMBrW3Mwqu6NnqoSo9Vf2LsGcQxQvTpgK5bcm1FqsERiSUQluC100DoeIwWR8");
exports.default = stripe;
