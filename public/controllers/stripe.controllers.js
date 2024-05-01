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
exports.deletePaymentMethod = exports.getPaymentMethodId = exports.getAllCustomers = exports.createCardToken = exports.webhook = exports.handlePaymentFailure = exports.createPaymentIntent = exports.secretClient = exports.createSetupIntent = exports.addCardDetails = exports.associateCardWithPayment = exports.createCustomer = exports.createCheckoutSession = exports.stripeById = exports.stripeId = void 0;
//import db from "../config/dbConnect";
const axios_1 = __importDefault(require("axios"));
const stripeConfig_1 = __importDefault(require("../stripe/stripeConfig"));
// Funciones relacionadas con Stripe Payments
const stripeId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentMethodId, amount } = req.body;
    console.log("Creating payment intent with:");
    console.log({ paymentMethodId, amount });
    if (!paymentMethodId || !amount) {
        return res
            .status(400)
            .send({ error: "Payment method ID and amount are required in the request body" });
    }
    try {
        const paymentIntent = yield stripeConfig_1.default.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true,
        });
        console.log("Created payment intent:");
        console.log(paymentIntent);
        return res.send({ client_secret: paymentIntent.client_secret });
    }
    catch (error) {
        console.error("Error creating PaymentIntent:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.stripeId = stripeId;
const stripeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    console.log("Retrieving Stripe checkout session with id:", sessionId);
    const checkoutSession = yield stripeConfig_1.default.checkout.sessions.retrieve(sessionId, {
        expand: ["customer", "setup_intent.payment_method"],
    });
    console.log("Retrieved Stripe checkout session:", checkoutSession);
    res.send({ checkoutSession });
    console.log("Sent retrieved Stripe checkout session to client");
});
exports.stripeById = stripeById;
const priceId = "price_1P4Ve9P7so0IzTMyTEapwedZ"; //! Replace this with the actual ID of your price on Stripe.
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating Stripe checkout session");
    console.log("Using price ID:", priceId);
    const session = yield stripeConfig_1.default.checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: "https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://example.com/canceled.html",
    });
    console.log("Created Stripe checkout session:", session);
    res.send({ session });
});
exports.createCheckoutSession = createCheckoutSession;
//! This is linked to the phone and email form on the frontend.
const createCustomer = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Creating customer with email:", email);
        const customer = yield stripeConfig_1.default.customers.create({ email });
        console.log("Customer created:", customer.id);
        console.log("Returning customer:", customer);
        return customer;
    }
    catch (error) {
        console.error("Error creating customer:", error);
        console.error("Error details:", error);
        throw error;
    }
});
exports.createCustomer = createCustomer;
const associateCardWithPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, cardToken } = req.body;
        console.log("Received request to associate card with payment");
        console.log("customerId:", customerId);
        console.log("cardToken:", cardToken);
        if (!customerId || !cardToken) {
            throw new Error("Customer ID and card token are required in the request body");
        }
        // Asociar la tarjeta con el cliente en Stripe
        const card = yield stripeConfig_1.default.customers.createSource(customerId, {
            source: cardToken,
        });
        console.log("Created card with ID:", card.id);
        // Realizar un cargo de un dólar al cliente usando la tarjeta recién asociada
        const paymentIntent = yield stripeConfig_1.default.paymentIntents.create({
            amount: 100, // Monto en centavos (en este caso, 1 dólar)
            currency: "usd",
            customer: customerId,
            payment_method: card.id,
            off_session: true, // El pago no se realiza en una sesión activa
            confirm: true, // Confirmar automáticamente el pago
        });
        console.log("Created payment intent with ID:", paymentIntent.id);
        // Enviar la respuesta con los detalles de la tarjeta asociada y el intento de pago
        res.json({ card, paymentIntent });
    }
    catch (error) {
        console.error("Error associating card with customer and charging one dollar:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.associateCardWithPayment = associateCardWithPayment;
const addCardDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, cardNumber, expMonth, expYear, cvc } = req.body;
        if (!customerId || !cardNumber || !expMonth || !expYear || !cvc) {
            throw new Error("All fields are required");
        }
        const card = yield stripeConfig_1.default.paymentMethods.create({
            type: "card",
            card: {
                number: cardNumber,
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvc,
            },
        });
        // Attach the card to the customer
        yield stripeConfig_1.default.paymentMethods.attach(card.id, {
            customer: customerId,
        });
        // Set the card as the customer's default payment method
        yield stripeConfig_1.default.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: card.id,
            },
        });
        res.json({ message: "Card successfully added to customer" });
    }
    catch (error) {
        console.error("Error adding card to customer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addCardDetails = addCardDetails;
const createSetupIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Creating SetupIntent...");
        const setupIntent = yield stripeConfig_1.default.setupIntents.create({
            payment_method_types: ["card"],
        });
        console.log("SetupIntent created successfully:", setupIntent);
        res.json({ client_secret: setupIntent.client_secret });
    }
    catch (error) {
        console.error("Error creating SetupIntent:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createSetupIntent = createSetupIntent;
const secretClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Calling create-setupIntent endpoint...");
        const response = yield axios_1.default.post("http://localhost:3000/create-setupIntent");
        console.log("Response from create-setupIntent:", response.data);
        const { client_secret } = response.data;
        console.log("Successfully got client_secret:", client_secret);
        res.send({ client_secret });
    }
    catch (error) {
        console.error("Error getting client_secret from SetupIntent:", error);
        console.error("Full error:", error);
        res
            .status(500)
            .send({ error: "Error getting client_secret from SetupIntent" });
    }
});
exports.secretClient = secretClient;
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Creating PaymentIntent...");
        const { customerId, paymentMethodId } = req.body;
        const pricePerTrade = 5;
        const numberOfTradesPerWeek = 5;
        const totalAmountPerWeek = pricePerTrade * numberOfTradesPerWeek * 100; // Convert to cents
        console.log("Request body:", req.body);
        console.log("Total amount per week:", totalAmountPerWeek);
        console.log("customerId:", customerId);
        console.log("paymentMethodId:", paymentMethodId);
        // Create a PaymentIntent with the provided parameters
        const paymentIntent = yield stripeConfig_1.default.paymentIntents.create({
            amount: totalAmountPerWeek,
            currency: "usd",
            payment_method_types: ["card"],
            customer: customerId,
            payment_method: paymentMethodId,
            off_session: true,
            confirm: true,
            metadata: {
                numberOfTradesPerWeek: numberOfTradesPerWeek,
            },
        });
        console.log("Created PaymentIntent:", paymentIntent);
        res.send({ paymentIntent });
    }
    catch (error) {
        console.error("Error creating PaymentIntent:", error);
        console.error("Full error:", error);
        res.status(500).send({ error: "Error creating PaymentIntent" });
    }
});
exports.createPaymentIntent = createPaymentIntent;
const handlePaymentFailure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = req.body;
        if (error.code === "authentication_required") {
            const { payment_intent } = error;
            // Get the failed PaymentIntent
            const failedPaymentIntent = yield stripeConfig_1.default.paymentIntents.retrieve(payment_intent);
            if (failedPaymentIntent.status === "requires_payment_method") {
                // Send the client secret to the frontend to allow the client to authenticate the payment
                res
                    .status(402)
                    .send({ client_secret: failedPaymentIntent.client_secret });
                return;
            }
        }
        res.status(500).send({ error: "Payment could not be completed" });
    }
    catch (error) {
        console.error("Error handling payment failure:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
exports.handlePaymentFailure = handlePaymentFailure;
const webhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers["stripe-signature"] === undefined ||
            req.headers["stripe-signature"] === null) {
            throw new Error("No Stripe signature found in request headers");
        }
        const endpointSecret = "whsec_1f34030a3235f0ab5bede0bb713a552de306d64572b4e2ac1d5f65f9d68b6354";
        const sig = req.headers["stripe-signature"];
        const body = req.body;
        if (body === undefined || body === null) {
            throw new Error("No request body found");
        }
        const event = stripeConfig_1.default.webhooks.constructEvent(body, sig, endpointSecret);
        let paymentIntentFailed;
        let paymentIntent;
        switch (event.type) {
            case "payment_intent.succeeded":
                paymentIntent = event.data.object;
                console.log("PaymentIntent was successful!", paymentIntent);
                break;
            case "payment_intent.payment_failed":
                paymentIntentFailed = event.data.object;
                console.log("PaymentIntent failed!", paymentIntentFailed);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.json({ received: true });
    }
    catch (err) {
        console.error(`Error ${err.message}`, err);
        if (err.stack !== undefined) {
            console.error(err.stack);
        }
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});
exports.webhook = webhook;
const createCardToken = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ body: { customerId, token } }, res) {
    if (!customerId || !token) {
        console.log("createCardToken: Customer ID and card token are required in the request body");
        return res.status(400).json({ error: "Customer ID and card token are required in the request body" });
    }
    try {
        console.log("createCardToken: About to call stripe.customers.createSource");
        const { id } = yield stripeConfig_1.default.customers.createSource(customerId, { source: token });
        console.log("createCardToken: Successfully called stripe.customers.createSource, id:", id);
        res.json({ id });
    }
    catch (error) {
        console.error("Error creating card token:", error);
        console.error("createCardToken: Error creating card token");
        res.status(500).json({ error: "Error creating card token" });
    }
});
exports.createCardToken = createCardToken;
const getAllCustomers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("getAllCustomers: About to call stripe.customers.list");
        const customers = yield stripeConfig_1.default.customers.list({ limit: 100 });
        console.log("getAllCustomers: Successfully called stripe.customers.list");
        res.send({
            data: customers.data,
            has_more: customers.has_more,
            url: customers.url,
        });
    }
    catch (error) {
        console.error("Error getAllCustomers:", error);
        console.error("getAllCustomers: Error getting customers from Stripe");
        res.status(500).send({ error: "Error getting customers from Stripe" });
    }
});
exports.getAllCustomers = getAllCustomers;
const getPaymentMethodId = (_req, res) => {
    res.send({ id: "pm_card_visa" });
};
exports.getPaymentMethodId = getPaymentMethodId;
const deletePaymentMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let paymentMethodId;
    try {
        paymentMethodId = req.body.paymentMethodId;
        if (!paymentMethodId) {
            throw new Error("Payment method ID is required in the request body");
        }
    }
    catch (error) {
        console.error("Error deleting payment method:", error);
        res.status(400).json({ error: "Payment method ID is required in the request body" });
        return;
    }
    try {
        const detachedPaymentMethod = yield stripeConfig_1.default.paymentMethods.detach(paymentMethodId);
        res.json({ message: "Payment method successfully detached", detachedPaymentMethod });
    }
    catch (error) {
        console.error("Error detaching payment method:", error);
        if (error.type === "StripeInvalidRequestError" && error.code === "resource_missing") {
            res.status(404).json({ error: "Payment method not found" });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
exports.deletePaymentMethod = deletePaymentMethod;
