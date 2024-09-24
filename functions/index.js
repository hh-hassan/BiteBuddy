const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require("stripe")(functions.config().stripe.secret_key);
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    
    try {
      
        const { items } = req.body;
  
        const lineItems = items.map(item => ({
            
            price_data: {
                currency: 'inr',
                product_data: {
                name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },

            quantity: item.quantity,
        }));
  
        const subtotal = lineItems.reduce((total, item) => {
            return total + (item.price_data.unit_amount * item.quantity);
        }, 0);
  
        const session = await stripe.checkout.sessions.create({
            
            payment_method_types: ['card'],
            
            mode: 'payment',
            
            line_items: [...lineItems, 
                
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                        name: 'GST (5%)',
                        },
                        unit_amount: Math.round(0.05 * subtotal),
                    },

                    quantity: 1, 
                },
                
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                        name: 'Platform Charges',
                        },
                        unit_amount: 600,
                    },

                    quantity: 1,
                },

            ],

            success_url: 'https://bitebuddy-2693a.firebaseapp.com/success',
            
            cancel_url: 'https://bitebuddy-2693a.firebaseapp.com/cancel',
        });

        res.json({ id: session.id });
    } 
    
    catch (error) {
      res.status(500).json({ error: error.message });
    }

});
  
exports.api = functions.https.onRequest(app);
