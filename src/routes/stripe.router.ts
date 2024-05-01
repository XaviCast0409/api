import { Router } from "express";
import cors from 'cors';
import * as StripeController from "../controllers/stripe.controllers";

const stripeRouter = Router();
stripeRouter.use(cors({ origin: 'http://localhost:3000' }));



// Checkout
stripeRouter
    .post("/checkout", StripeController.stripeId)
    .get("/checkout-session/:id", StripeController.stripeById)
    .get("/create-checkout-session", StripeController.createCheckoutSession)

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
    .delete("/delete-payment-method" , StripeController.deletePaymentMethod); 

// Tarjetas
stripeRouter 
    .post("/associate-card-with-payment" , StripeController.associateCardWithPayment)
    .post('/add-card-details', StripeController.addCardDetails)
    .post("/create-card-token", StripeController.createCardToken);

// Webhooks
stripeRouter
    .post("/webhook", StripeController.webhook)
    .get("/webhook-endpoint", StripeController.webhook);

export default stripeRouter;


/**
 * cus_Q1Rkf1P6hRCEAv
 */