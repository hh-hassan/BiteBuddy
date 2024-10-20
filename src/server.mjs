import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:1234',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Cookie'],
}));

app.use(express.json());

app.post('/api/restaurants', async (req, res) => {
    
    const { body } = req;

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': req.headers.cookie || '',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    };

    const swiggyResponse = await fetch('https://www.swiggy.com/dapi/restaurants/list/update', fetchOptions);
    const responseBody = await swiggyResponse.json();
    res.status(swiggyResponse.status).json(responseBody);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});