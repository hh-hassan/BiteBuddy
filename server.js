const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
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

            success_url: 'http://localhost:1234/success',
            cancel_url: 'http://localhost:1234/cancel',
        });

        res.json({ id: session.id });
    } 
    
    catch (error) {
      res.status(500).json({ error: error.message });
    }

});
  
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});