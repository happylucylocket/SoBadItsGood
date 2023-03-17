const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
// const { async } = require('jshint/src/prod-params');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )


app.get('/sobaditsgood/api', (req, res) => {
  res.send('Hello from Node.js backend!');
})

//Validating if the user login is correct
app.get('/sobaditsgood/api/isUserValid/:username/:pass', async (req, res)=>{
  const username = req.params.username
  const password = req.params.pass
  sql = `SELECT username FROM USERS u WHERE u.username = $1 AND u.password = $2`
  var result = await pool.query(sql, [username, password])
  if (result.rowCount == 0){
    res.send({"isValid": false})
    return
  }
  res.send({"isValid": true})
})

// adding user to the database
app.post('/sobaditsgood/api/registerUser/', async(req, res)=>{
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username
  const password = req.body.password
  sql = `INSERT INTO users (fname, lname, username, password) VALUES ($1, $2, $3, $4);`
  await pool.query(sql,[fname, lname, username, password])
  res.send("User ccreated")
})

//check if user exists
app.get('/sobaditsgood/api/userExists/:username', async(req, res)=>{
  const username = req.params.username
  sql = `SELECT COUNT(*) FROM users u WHERE u.username = $1;`
  result = await pool.query(sql, [username])
  if (parseInt(result.rows[0].count) >= 1){
    res.send({userExists:true})
    return
  }
  res.send({userExists:false})
})

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

// Angular project
app.get("*", (req, res) => {
  res.sendFile(builtProjectDir+"index.html")
})

// Connect to server
app.listen(PORT, HOST, () => {
  console.log(`Server started on host ${HOST} and  port ${PORT}`);
});
