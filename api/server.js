const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const pg = require('pg');
require('dotenv').config();

// Environmental values
const PORT = process.env.PORT || 3000; // post number
const HOST = process.env.HOST // host IP
// const DB_URL = process.env.DB_URL // connection string for postgrSQL'
const SECRET_KEY = process.env.SECRET_KEY // secret key for using sessions
const ANGULAR_PROJECT_DIR = path.join(__dirname, '../sobaditsgood/dist/sobaditsgood/'); // Path to built angular project

const app = express(); // express app
const pool = new pg.Pool({connectionString:"postgres://postgres:cmpt372@35.194.22.73/sobaditsgood-db"}) // connection string for postgreSQL
const corsOptions = {
    origin: 'http://localhost:4200', // Allow only this origin to access the API
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow only these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow only these headers
    // credentials: true
  }; // CORS settings

// App settings
app.use(cors(corsOptions)); // CORS setup
app.use(express.static(ANGULAR_PROJECT_DIR)) // access to static files in the built angular project
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(
  session({
      name: 'session',
      secret: 'zordon',
      resave:false,
      maxAge: 30*60*1000,
      saveUninitialized: true
  })
)


function isLoggedIn(req,res,next){
  if (req.session.user){
      return next()
  } else {
      res.redirect('/login')
  }
}


////////////////////////////////DIRECTORY PATHS//////////////////////////////////////////////
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

app.post('/sobaditsgood/api/login/', (req, res)=>{
  console.log("logging in")
  req.session.user = {username:req.body.username}
  // req.session.regenerate()
  console.log(req.sessionID)
  res.send('*')
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

app.get('/sobaditsgood/api/isInSession', (req, res)=>{
  if(req.session.user){
    res.send({isInSession:true})
  }else{
    console.log(req.session)
    res.send({isInSession:false})
  }
})

// Angular project
app.get("/" ,(req, res) => {
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/login', (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/userprofile', isLoggedIn, (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/settings', isLoggedIn, (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

// Connect to server
app.listen(PORT, HOST, () => {
  console.log(`Server started on host ${HOST} and  port ${PORT}`);
});
