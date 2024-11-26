const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Mock database
let products = [
  { id: '1', name: "Men's T-Shirt", price: "$20", image: "https://via.placeholder.com/200" },
  { id: '2', name: "Women's Dress", price: "$35", image: "https://via.placeholder.com/200" },
  { id: '3', name: "Cap", price: "$10", image: "https://via.placeholder.com/200" },
];
let cart = [];

// Middleware
app.use(express.static('public')); // Serve static files
app.use(bodyParser.json());

// API Endpoints
app.get('/api/products', (req, res) => res.json(products));

app.post('/api/cart', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    res.json({ success: true, cartCount: cart.length });
  } else {
    res.json({ success: false });
  }
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
