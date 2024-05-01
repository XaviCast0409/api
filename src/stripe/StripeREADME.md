<h1>Resumen de Stripe pagos futuros.</h1>
<hr>
<h2>LINKS</h2>
<h3>https://docs.stripe.com/payments/save-and-reuse?platform=web&ui=elements&client=react</h3>

La API (https://docs.stripe.com/api/setup_intents)guardar los datos de pago de un cliente sin que se haya realizado un pago inicial. Esta opción resulta útil si quieres hacer el onboarding de clientes ahora, realizar la configuración de pagos y cobrarles más adelante. Pagos recurrentes o crear pagos puntuales.
Para recopilar los detalles de pago del cliente que se pueden reutilizar más tarde, utilice el modo de configuración de <span>Checkout </span>. El modo de configuración utiliza la API de Intents de configuración para crear métodos de pago.

 <h5>Ejemplo completo y funcional en GitHub. <p>(https://github.com/stripe-archive/checkout-remember-me-with-twilio-verify) </p> </h5>

<h6> Ejemplo de código </h6>
<p>

const purchase = {
amount: 1099,
currency: "USD"
};

const createPurchase = items => {
// Extiende esta función con tu lógica para validar
// los detalles de la compra en el servidor y prevenir
// la manipulación de los detalles del precio en el cliente.
return purchase;
};

app.use(express.static(process.env.STATIC_DIR));
// Note: Utiliza el analizador JSON para todas las rutas que no sean de webhook.
app.use((req, res, next) => {
if (req.originalUrl === "/webhook") {
next();
} else {
bodyParser.json()(req, res, next);
}
});

<h4>Webhook</h4>
<p>Los eventos de webhook se utilizan para notificar a una aplicación sobre cambios en el estado de una transacción o cualquier otra actividad importante.</p>

app.get("/config", (req, res) => {
res.send({
clavePublica: process.env.STRIPE_PUBLISHABLE_KEY,
purchase
});
});

app.get("/", (req, res) => {
const ruta = resolve(process.env.STATIC_DIR + "/index.html");
res.sendFile(ruta);
});

<h3>CREACIÓN DEL USUARIO</h3>

app.post("/create-customer", async (req, res) => { <p>
Ruta de creación del cliente

</p>
  const { phone, email } = req.body; <p>¿Hacemos validación?</p>
  try {
    // Valida la entrada del número de teléfono
    const numero = await client.lookups.phoneNumbers(phone).fetch();
    // Crea un nuevo objeto de cliente
    const customer = await stripe.customers.create({
      phone: numero.phoneNumber,
      email
    });

    // Crea una sesión de pago para configurar el uso recurrente de nuestros métodos de pago
    <p>Ya implementamos una lógica parecida en los controllers de Stripe</p>
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: customer.id,
      success_url: `${req.headers.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`
    });
    res.send({ cliente: customer, checkoutSession });

} catch (error) {
res.status(400).send({ error });
}
});

<h4> Lo implemente en el controlador y ruta de stripe</h4>
app.get("/checkout-session/:id", async (req, res) => {
const { id } = req.params;
const checkoutSession = await stripe.checkout.sessions.retrieve(id, {
expand: ["customer", "setup_intent.payment_method"]
});
res.send({ checkoutSession });
});

<h4> Esta es la ruta para la validación por teléfono. Con TWILIO </h4>
app.post("/start-twilio-verify", async (req, res) => {
const { customerId } = req.body;

// Recupera el objeto de cliente
const customer = await stripe.customers.retrieve(customerId);

// Inicia la verificación de Twilio
const verification = await client.verify
.services(process.env.VERIFY_SERVICE_SID)
.verifications.create({ to: customer.phone, channel: "sms" });

// Envía el client_secret de PaymentIntent al cliente.
const status = verification.status;
res.send({ status });
});

app.post("/check-twilio-verify", async (req, res) => {
const { customerId, code, items } = req.body;

try {
// Recupera el objeto de cliente
const customer = await stripe.customers.retrieve(customerId);

    // Verifica el código de Twilio
    const verificationCheck = await client.verify
      .services(process.env.VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: customer.phone, code });

    // Si es exitoso, crea el pago con la tarjeta almacenada
    if (verificationCheck.status === "approved") {
      // Obtiene el método de pago almacenado
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card"
      });
      if (paymentMethods.data.length !== 1) {
        throw new Error("¡Demasiados o muy pocos métodos en el cliente!");
      }
      // Cobra el método almacenado
      const { amount, currency } = createPurchase(items);
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        payment_method: paymentMethods.data[0].id,
        off_session: false, // El cliente está en sesión durante el pago
        confirm: true // Confirma y cobra el pago inmediatamente
      });

      // Devuelve el resultado del pago
      res.send({ paymentIntent });
    } else {
      res
        .status(400)
        .send({ error: { message: "¡Código incorrecto. Por favor, intenta de nuevo!" } });
    }

} catch (error) {
res.status(400).send({ error });
}
});

// Stripe requiere el cuerpo sin procesar para construir el evento.
app.post(
"/webhook",
bodyParser.raw({ type: "application/json" }),
(req, res) => {
let evento;

    try {
      evento = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      // En caso de error, registra y devuelve el mensaje de error
      console.log(`❌ Mensaje de error: ${error.message}`);
      return res.status(400).send(`Error de Webhook: ${error.message}`);
    }

    if (evento.type === "payment_intent.succeeded") {
      // Los fondos han sido capturados
      // Satisface cualquier pedido, envía recibos por correo electrónico, etc.
      // Para cancelar el pago después de la captura, deberás emitir un reembolso (https://stripe.com/docs/api/refunds)
      console.log("💰 ¡Pago capturado!");
    } else if (evento.type === "payment_intent.payment_failed") {
      console.log("❌ Pago fallido.");
    }

    // Devuelve una respuesta para confirmar la recepción del evento
    res.json({ recibido: true });

}
);

app.listen(4242, () => console.log(`Servidor Node escuchando en el puerto ${4242}!`));

<h6> El evento <span>"payment_intent.succeeded" </span> indica que un intento de pago ha sido procesado con éxito y los fondos han sido capturados. Es un evento importante que desencadena acciones posteriores en la aplicación, como la confirmación del pedido y la notificación al cliente sobre el pago exitoso. </h6>

</p>

<h1> Debito Automatico </h1>
Hay que tener estos dos elementos:

Planes (Plans): Un plan en Stripe define los términos de una suscripción, incluyendo el precio, la frecuencia de facturación y otros detalles. Primero, necesitas crear un plan que describa el servicio que estás ofreciendo y cómo se facturará.

<h6>Ejemplo de código</h6>
const stripe = require('stripe')('tu_clave_secreta_de_stripe');

// Crear un nuevo plan
const plan = await stripe.plans.create({
amount: 1000, // Monto en centavos
currency: 'usd',
interval: 'month', // Frecuencia de facturación (puede ser 'day', 'week', 'month', 'year')
product: {
name: 'Mi producto' // Nombre del producto asociado al plan
}
});

Suscripciones (Subscriptions): Una suscripción representa un acuerdo entre tú y tu cliente para cobrar automáticamente por tu servicio en intervalos regulares. Una vez que hayas creado un plan, puedes suscribir a tus clientes a ese plan para que se les cobre automáticamente.

<h6>Ejemplo de código</h6> <p>Implemente el front de esto </p>
// Crear una suscripción para un cliente
const subscription = await stripe.subscriptions.create({
  customer: 'id_del_cliente_de_stripe', // ID del cliente al que se le cobrará la suscripción 
  items: [{ plan: plan.id }], // ID del plan creado anteriormente
});

Para crear un producto y un precio en Stripe, puedes seguir estos pasos:

Iniciar sesión en tu Panel de Control de Stripe: Accede a tu cuenta de Stripe en el Panel de Control de Stripe en https://dashboard.stripe.com/login.

Ir a la sección de Productos: Una vez que hayas iniciado sesión, ve a la sección de "Productos" en el Panel de Control de Stripe. Aquí es donde puedes crear y administrar tus productos y precios.

Crear un Producto: Haz clic en el botón "Nuevos" o "Crear producto" para comenzar a crear un nuevo producto. Aquí podrás especificar el nombre del producto, la descripción, la categoría, las imágenes, etc. Completa todos los detalles necesarios y guarda el producto.

Crear un Precio para el Producto: Después de crear el producto, haz clic en el producto para ver sus detalles. En la sección de precios, haz clic en el botón "Agregar precio" o "Nuevo" para crear un nuevo precio para el producto. Aquí podrás especificar el precio, la moneda, la renovación (si es una suscripción), etc. Completa todos los detalles necesarios y guarda el precio.

Revisar y Activar: Una vez que hayas creado el producto y el precio, revisa todos los detalles para asegurarte de que estén correctos. Después de revisar, puedes activar el producto y el precio para que estén disponibles para su uso en tu aplicación.

Usar la API de Stripe (opcional): Si prefieres crear productos y precios programáticamente a través de la API de Stripe en lugar de hacerlo manualmente en el Panel de Control, puedes hacerlo utilizando los endpoints adecuados de la API de Stripe. Esto te permitirá automatizar el proceso de creación de productos y precios en tu aplicación.

<h1> Payment method integration options </h1>
https://docs.stripe.com/payments/payment-methods/integration-options#payment-method-product-support

<h2>Link para Nacho</h2>
https://stripe.com/es/pricing/local-payment-methods

https://docs.stripe.com/security/guide#tls


<h2>SETUPINTENT</h2>
El SetupIntent es un objeto que representa tu intención de establecer un método de pago para los pagos futuros de un cliente. 
Stripe tome los métodos de pago de forma automática desde la configuración de tu Dashboard o puedes enumerarlos de forma manual.
<h4>Recupera el secreto del cliente</h4>
El SetupIntent incluye un secreto de cliente <span>client secret: https://docs.stripe.com/api/payment_intents/object#payment_intent_object-client_secret</span> que el lado del cliente utiliza para completar el proceso de pago de forma segura. Puedes usar diferentes métodos para pasar el secreto del cliente al lado del cliente.



<h2>Lo que esta hecho</h2>

stripeId:
Procesa pagos con Stripe a partir de un ID de método de pago y un monto.
Crea un cliente Stripe si no existe.
Asocia el método de pago al cliente.
Crea un PaymentIntent para confirmar la transacción.

stripeById:
Recupera la información de una sesión de pago de Stripe mediante su ID.

createCheckoutSession:
Crea una sesión de pago de Stripe para iniciar un proceso de pago en modo suscripción.

createCustomer:
Crea un cliente en Stripe a partir de su correo electrónico.

createSetupIntent:
Crea un SetupIntent en Stripe para recolectar información de pago.

secretClient:
Realiza una solicitud a otra API de arriba para obtener un client_secret de Stripe.

createPaymentIntent:
Crea un PaymentIntent en Stripe con parámetros específicos para procesar un pago.

handlePaymentFailure:
Maneja los errores que puedan ocurrir durante el proceso de pago, redirigiendo al frontend si es necesario.

webhook:
Procesa eventos enviados por Stripe a través de webhooks, como pagos exitosos o fallidos.