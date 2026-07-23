const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const stripe = require("stripe")("YOUR_STRIPE_SECRET_KEY"); // ⚡ GET THIS FROM STRIPE DASHBOARD

admin.initializeApp();
const db = admin.firestore();

// THE APP_ID YOU PROVIDED
const APP_ID = '1:735791748207:web:74fd6412684db238b6e99a';

// 1. CREATE CHECKOUT SESSION (The Gateway)
exports.createCheckoutSession = onRequest({ cors: true }, async (req, res) => {
    const { uid, email } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'cashapp'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'Titan Status - Snt.L.Mo. Sports Network' },
unit_amount: 1000, // $10.00                },
                quantity: 1,
            }],
            mode: 'pant',
            customer_email: email,
            client_reference_id: uid, 
            success_url: 'https://yymeour-site.com/success.html',
            cancel_url: 'https://your-site.com/cancel.html',
        });
        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Session Error:", error);
        res.status(500).send(error.message);
    }
});

// 2. STRIPE WEBHOOK (The Automatic Upgrade)
exports.stripeWebhook = onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        // req.rawBody is critical for Stripe verification
        event = stripe.webhooks.constructEvent(req.rawBody, sig, 'YOUR_WEBHOOK_SIGNING_SECRET');
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const uid = session.client_reference_id;
        
        // UPGRADE THE USER IN YOUR DATABASE
        await db.doc(`artifacts/${APP_ID}/users/${uid}/profile/info`)
            .set({ isPro: true }, { merge: true });
            
        console.log(`⚡ User ${uid} has ascended to Titan Status automatically.`);
    }
    res.json({ received: true });
});