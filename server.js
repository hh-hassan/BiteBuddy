import express from 'express';
import cors from 'cors';
import stripePackage from 'stripe';
import fetch from 'node-fetch';
import { MAIN_DATA_URL, MENU_URL, HELP_URL } from './src/utils/constants.js';

const stripe = stripePackage(process.env.REACT_APP_STRIPE_SECRET_KEY);

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/restaurants', async (req, res) => {
    
    const { lat, lng } = req.query;

    if (!lat || !lng)   return res.status(400).json({ error: 'Latitude and Longitude are required.' });

    try {
        
        const response = await fetch(MAIN_DATA_URL + "lat=" + lat + "&lng=" + lng, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept-Encoding': 'br',
                'Accept': 'text/html',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok)   return res.status(response.status).json({ error: 'Error fetching data from Swiggy API.' });

        const data = await response.json();

        res.json(data);
    } 
    
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

});

app.get('/api/menu', async (req, res) => {
    
    const { lat, lng, restaurantId } = req.query;

    try {
        const response = await fetch(MENU_URL + "lat=" + lat + "&lng=" + lng + "&restaurantId=" + restaurantId, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept-Encoding': 'br',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok)   return res.status(response.status).json({ error: 'Failed to fetch data from Swiggy' });

        const data = await response.json();
        res.json(data);
    } 
    
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

});

app.get('/api/support', async (req, res) => {

    try {
        const response = await fetch(HELP_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept-Encoding': 'br',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) return res.status(response.status).json({ error: 'Failed to fetch data from Swiggy' });

        const data = await response.json();
        res.json(data);
    } 
    
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

});

app.get('/api/support/issues/:type', async (req, res) => {
    
    const { type } = req.params;

    try {
        const response = await fetch(HELP_URL + "/issues/" + type, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept-Encoding': 'br',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        res.json(data);
    } 
    
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

});

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