const express = require('express');
const cors = require('cors');
const path = require('path');
const pg = require('pg');

const PORT = 3000
const HOST = "0.0.0.0"

// express app
const app = express();

// Path to built angular project
const builtProjectDir = path.join(__dirname, '../sobaditsgood/dist/sobaditsgood/');

// connection string for postgreSQL
const pool = new pg.Pool({
  connectionString:'postgres://postgres:cmpt372@35.194.22.73/sobaditsgood-db'
})

// CORS settings
const corsOptions = {
    origin: 'http://localhost:4200', // Allow only this origin to access the API
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow only these HTTP methods
    allowedHeaders: ['Content-Type'] // Allow only these headers
  };

app.use(cors(corsOptions));

// access to static files in the built angular project
app.use(express.static(builtProjectDir))


app.get('/sobaditsgood/api', (req, res) => {
  res.send('Hello from Node.js backend!');
});

app.get('/test', (req, res) => {
  // MAKE QUERIES 
  pool.query(`SELECT * FROM users;`, (error, results) => {
  if (error) {
    console.error(error) 
    return
  }  
  console.log(results.rows) 
  res.send(results.rows)
  })
});

app.get("*", (req, res) => {
  res.sendFile(builtProjectDir+"index.html")
})

// Connect to server
app.listen(PORT, HOST, () => {
  console.log(`Server started on host ${HOST} and  port ${PORT}`);
});
