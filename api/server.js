const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const pg = require('pg');
require('dotenv').config();

// Environmental values
const PORT = 3000; // post number
const HOST = '0.0.0.0' // host IP
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


////////////////////////////////API CALLS//////////////////////////////////////////////
app.get('/sobaditsgood/api', (req, res) => {
  res.send("Hello from So Bad It's Good backend!");
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
  res.send('*')
})


app.get('/test', (req, res) => {
  // MAKE QUERIES 
  pool.query(`SELECT * FROM watchlist;`, (error, results) => {
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

app.get('/sobaditsgood/api/getReviews/:movieid', async(req, res)=>{
  const movieid = req.body.movieid
  sql = `SELECT movieid FROM REVIEWS m WHERE m.movieid = $1`
  var result = await pool.query(sql, [movieid])
  if (result.rowCount == 0){
    res.send({"hasReview": false})
    return
  }
  res.send({"hasReview": true, result})
})

app.post('/sobaditsgood/api/addReview/', async(req, res)=>{
  const username = req.body.username
  const movieid = req.body.movieId
  const title = req.body.title
  const description = req.body.description
  const rating = req.body.rating
  const postedOn = new Date();
  sql = `INSERT INTO reviews (username, movieid, title, description, rating, postedOn) VALUES ($1, $2, $3, $4, $5, $6);`
  await pool.query(sql,[username, movieid, title, description, rating, postedOn])
  res.send("Review created")
})

app.get('/sobaditsgood/api/getCurrentUserInfo', async(req, res)=>{
  const username = req.session.user.username
  sql = `SELECT u.fname, u.lname, u.username, u.email, u.profilepic, u.password FROM users u where u.username=$1;`
  result = await pool.query(sql, [username])
  res.send(result.rows)
})

app.get('/sobaditsgood/api/getUserInfo/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.fname, u.lname, u.username FROM users u WHERE u.username=$1'
  result = await pool.query(sql, [username])
  res.send(result.rows[0])
})

app.get('/sobaditsgood/api/getfavMovies/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT f.movieid FROM favoritemovies f WHERE f.userid=$1'
  result = await pool.query(sql, [Qresult.rows[0].userid])
  res.send(result.rows)
})

app.get('/sobaditsgood/api/getWatchedMovies/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT f.movieid FROM watchedmovies f WHERE f.userid=$1'
  result = await pool.query(sql, [Qresult.rows[0].userid])
  res.send(result.rows)
})

app.get('/sobaditsgood/api/getWatchlistedMovies/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT f.movieid FROM watchlist f WHERE f.userid=$1'
  result = await pool.query(sql, [Qresult.rows[0].userid])
  res.send(result.rows)
})

app.get('/sobaditsgood/api/addfavourite/:movieID', isLoggedIn, async(req, res)=>{
  const movieid = req.params.movieID
  const username = req.session.user.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'INSERT INTO favoritemovies (userid, movieid) VALUES ($1, $2);'
  result = await pool.query(sql, [Qresult.rows[0].userid, movieid])
  res.send("Movie added to Favourites")
})

app.get('/sobaditsgood/api/removefavourite/:movieid', isLoggedIn, async(req, res)=>{
  const movieid = req.params.movieid
  const username = req.session.user.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1;'
  Qresult = await pool.query(sql, [username])
  sql2 = `DELETE FROM favoritemovies WHERE movieid=$1 AND userid=$2;`
  result = await pool.query(sql2, [movieid, Qresult.rows[0].userid])
  res.send("Movie Unfavourited")
})

//Check if a movie has been favourited or not
app.get('/sobaditsgood/api/isFav/:movieid', isLoggedIn, async(req, res)=>{
  const username = req.session.user.username
  const movieid = req.params.movieid
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT count(*) FROM favoritemovies WHERE movieid=$1 AND userid=$2'
  result = await pool.query(sql, [movieid, Qresult.rows[0].userid])
  if (parseInt(result.rows[0].count) == 1){
    res.send({isFave: true})
    return
  }
  res.send({isFave: false})
})

app.get('/sobaditsgood/api/watched/:movieid', isLoggedIn, async(req, res)=>{
  const username = req.session.user.username
  const movieid = req.params.movieid
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT count(*) FROM watchedmovies WHERE movieid=$1 AND userid=$2'
  result = await pool.query(sql, [movieid, Qresult.rows[0].userid])
  if (parseInt(result.rows[0].count) == 1){
    res.send({watched: true})
    return
  }
  res.send({watched: false})
})

app.get('/sobaditsgood/api/removewatched/:movieid', isLoggedIn, async(req, res)=>{
  const movieid = req.params.movieid
  const username = req.session.user.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1;'
  Qresult = await pool.query(sql, [username])
  sql2 = `DELETE FROM watchedmovies WHERE movieid=$1 AND userid=$2;`
  result = await pool.query(sql2, [movieid, Qresult.rows[0].userid])
  res.send("removed from watched")
})

app.get('/sobaditsgood/api/addwatched/:movieID', isLoggedIn, async(req, res)=>{
  const movieid = req.params.movieID
  const username = req.session.user.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'INSERT INTO watchedmovies (userid, movieid) VALUES ($1, $2);'
  result = await pool.query(sql, [Qresult.rows[0].userid, movieid])
  res.send("Movie added to watched")
})

app.get('/sobaditsgood/api/watchlisted/:movieid', isLoggedIn, async(req, res)=>{
  const username = req.session.user.username
  const movieid = req.params.movieid
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT count(*) FROM watchlist WHERE movieid=$1 AND userid=$2'
  result = await pool.query(sql, [movieid, Qresult.rows[0].userid])
  if (parseInt(result.rows[0].count) == 1){
    res.send({watchlisted: true})
    return
  }
  res.send({watchlisted: false})
})

app.get('/sobaditsgood/api/removedwatchlist/:movieid', isLoggedIn, async(req, res)=>{
  const movieid = req.params.movieid
  const username = req.session.user.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1;'
  Qresult = await pool.query(sql, [username])
  sql2 = `DELETE FROM watchlist WHERE movieid=$1 AND userid=$2;`
  result = await pool.query(sql2, [movieid, Qresult.rows[0].userid])
  res.send("removed from watchlist")
})

app.get('/sobaditsgood/api/addtowatchlist/:movieID', isLoggedIn, async(req, res)=>{
  const movieid = req.params.movieID
  const username = req.session.user.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'INSERT INTO watchlist (userid, movieid) VALUES ($1, $2);'
  result = await pool.query(sql, [Qresult.rows[0].userid, movieid])
  res.send("added to watchlist")
})

app.get('/sobaditsgood/api/getWatchlist', isLoggedIn, async(req, res)=>{
  const username = req.session.user.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT movieid FROM watchlist WHERE userid=$1;'
  result = await pool.query(sql, [Qresult.rows[0].userid])
  res.send(result.rows)
})

app.get('/sobaditsgood/api/getPopular', async(req, res) => {
  result = await pool.query(`SELECT movieID FROM movies ORDER BY popularity DESC limit 12`); 
  res.send(result.rows)
})

app.get('/sobaditsgood/api/logout', (req, res) => {
  req.session.destroy((err) => { 
    if (err) {
      console.log(err);
    } else {
      res.send('Logged out'); // Redirect to the login page after successful logout
    }
  });
});


/////////////////////////////////////////////////// WEBSITE PATHS////////////////////////////////////////////
// Angular project
app.get("/" ,(req, res) => {
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/login', (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/userprofile/:username', isLoggedIn, (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/settings', isLoggedIn, (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/movieinfo/:movieid', (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/castcrew/:movieid', (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

// Connect to server
app.listen(PORT, HOST, () => {
  console.log(`Server started on host ${HOST} and  port ${PORT}`);
});