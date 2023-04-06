const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const pg = require('pg');
const fileupload = require('express-fileupload')
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
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(fileupload())
app.use(bodyParser.json({ extended: false, limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false, parameterLimit: 1000000000 }))

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
  const email = req.body.email
  sql = `INSERT INTO users (fname, lname, username, password, email) VALUES ($1, $2, $3, $4, $5);`
  await pool.query(sql,[fname, lname, username, password,email])
  res.send("User ccreated")
})
app.post('/sobaditsgood/api/updateInfo/', async(req, res)=>{
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  const id = req.body.userid
  const pic = req.body.pic
  // console.log(fname,lname,username,password,email,password,id)
  sql = `UPDATE "users"
         SET "fname"= $1, "lname"= $2, "username"= $3, "password"= $4, "email"= $5,"profilepic"=$7
         WHERE "userid"= $6 ;`
         await pool.connect();
  await pool.query(sql,[fname, lname, username, password,email, id,pic])
  res.send("User Edited")
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
  pool.query(`SELECT * FROM users;`, (error, results) => {
  if (error) {
    console.error(error) 
    return
  }  
  console.log(results.rows) 
  res.send(results.rows)
  })
});
 app.get('/sobaditsgood/api/getAll',  (req, res) => {
  // MAKE QUERIES 
  pool.query(`SELECT * FROM users;`, async (error, results) => {
  if (error) {
    console.error(error) 
    return
  }  
  await res.send(results.rows)
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
  const movieid = req.params.movieid
  console.log(movieid);
  sql = `SELECT * FROM reviews WHERE movieid = $1`
  var result = await pool.query(sql, [movieid])
  if (result.rowCount == 0){
    console.log(result.rowCount);
    return
  }
  res.send(result.rows)
})
app.get('/sobaditsgood/api/getUsername/:userid', async(req, res)=>{
  const userid = req.params.userid
  sql = `SELECT username FROM users WHERE userid = $1`
  var result = await pool.query(sql, [userid])
  res.send(result.rows[0].username)
})
app.post('/sobaditsgood/api/addReview/', isLoggedIn, async(req, res)=>{
  const username = req.body.username
  sql1 = `SELECT u.userid FROM users u where u.username=$1;`
  result = await pool.query(sql1, [username])
  const userid = result.rows[0].userid;
  console.log(username);
  console.log("this userid" + userid);
  const movieid = req.body.movieId
  const title = req.body.title
  const description = req.body.description
  const rating = req.body.rating
  sql = `INSERT INTO reviews (userid, movieid, title, description, rating) VALUES ($1, $2, $3, $4, $5);`
  await pool.query(sql,[userid, movieid, title, description, rating])
  res.send("Review created")
})

app.get('/sobaditsgood/api/getCurrentUserInfo', async(req, res)=>{
  const username = req.session.user.username
  sql = `SELECT u.fname, u.lname, u.username, u.email, u.profilepic, u.password, u.userid, u.profilepic FROM users u where u.username=$1;`
  result = await pool.query(sql, [username])
  res.send(result.rows)
})

app.get('/sobaditsgood/api/getUserInfo/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.fname, u.lname, u.username, u.profilepic FROM users u WHERE u.username=$1'
  result = await pool.query(sql, [username])
  res.send(result.rows[0])
})

app.get('/sobaditsgood/api/getMovies/:search', async(req, res)=>{
  const search = req.params.search
  console.log("this search " + search);
  sql = `SELECT movieID FROM movies WHERE title LIKE $1;`
  result = await pool.query(sql, [search])
  res.send(result.rows)
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

app.get('/sobaditsgood/api/isFollowing/:userid/:followingUsername', isLoggedIn, async(req, res)=>{
  const followingUsername = req.params.followingUsername
  const userID = req.params.userid
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [followingUsername])
  sql = 'SELECT f.followingID FROM following f WHERE userID = $1 and f.followingID = $2'
  result = await pool.query(sql, [userID, Qresult.rows[0].userid])
  if(result.rowCount == 0){
    res.send({isFollowing:false})
    return 
  }else{
    res.send({isFollowing:true})
  }
})

app.get('/sobaditsgood/api/followUser/:userid/:followingUsername', isLoggedIn, async(req, res)=>{
  const followingUsername = req.params.followingUsername
  const userID = req.params.userid
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [followingUsername])
  sql = 'INSERT INTO following(userID, followingID) VALUES($1, $2)'
  result = await pool.query(sql, [userID, Qresult.rows[0].userid])
  res.send('User Followed')
})

app.get('/sobaditsgood/api/unfollowUser/:userid/:followingUsername', isLoggedIn, async(req, res)=>{
  const followingUsername = req.params.followingUsername
  const userID = req.params.userid
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [followingUsername])
  sql = 'DELETE FROM following WHERE userID = $1 and followingID = $2'
  result = await pool.query(sql, [userID, Qresult.rows[0].userid])
  res.send('User Unfollowed')
})

app.get('/sobaditsgood/api/getNumFollowing/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT id FROM following WHERE userID = $1;'
  result = await pool.query(sql, [Qresult.rows[0].userid])
  res.send({NumFollowing:result.rowCount})
})

app.get('/sobaditsgood/api/getNumFollowers/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT id FROM following WHERE followingID = $1;'
  result = await pool.query(sql, [Qresult.rows[0].userid])
  res.send({NumFollowing:result.rowCount})
})

app.get('/sobaditsgood/api/getFollowingInfo/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT u.username, f.followingID FROM following f JOIN users u ON f.followingID = u.userID WHERE f.userID = $1;'
  result = await pool.query(sql, [Qresult.rows[0].userid])
  res.send(result.rows)
})

app.get('/sobaditsgood/api/getFollowerInfo/:username', async(req, res)=>{
  const username = req.params.username
  sql = 'SELECT u.userid FROM users u WHERE u.username=$1'
  Qresult = await pool.query(sql, [username])
  sql = 'SELECT u.username, f.userID, f.followingID FROM following f JOIN users u ON f.userID = u.userID WHERE f.followingID = $1;'
  result = await pool.query(sql, [Qresult.rows[0].userid])
  res.send(result.rows)
})

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
app.get('/showusers',isLoggedIn, (req, res)=>{
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

// Connect to server
app.listen(PORT, HOST, () => {
  console.log(`Server started on host ${HOST} and  port ${PORT}`);
});