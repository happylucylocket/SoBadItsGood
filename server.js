const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200', // Allow only this origin to access the API
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow only these HTTP methods
    allowedHeaders: ['Content-Type'] // Allow only these headers
  };

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
  res.send('Hello from Node.js backend!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
 