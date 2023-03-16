const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();

const pool = new pg.Pool({
  connectionString:'postgres://postgres:cmpt372@35.194.22.73/sobaditsgood-db'
})

const corsOptions = {
    origin: 'http://localhost:4200', // Allow only this origin to access the API
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow only these HTTP methods
    allowedHeaders: ['Content-Type'] // Allow only these headers
  };

app.use(cors(corsOptions));


// MAKE QUERIES 
pool.query(`SELECT * FROM users;`, (error, results) => {
  if (error) {
    console.error(error) 
    return
  }  
  console.log(results.rows) 
})
//////////////////////////////////

app.get('/api', (req, res) => {
  res.send('Hello from Node.js backend!');
});

app.listen(3000, "0.0.0.0", () => {
  console.log('Server started on host "0.0.0.0" and  port 3000');
});
