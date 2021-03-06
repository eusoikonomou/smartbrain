const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const redis = require('redis');
module.exports.redisClient = redis.createClient(process.env.REDIS_URI);

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const signout = require('./controllers/signout');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const rank = require('./controllers/rank');
const auth = require('./middleware/authorization');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

/* ----------------------------- API Start ----------------------------------------- */
app.get('/', (req, res) => { res.send('API is online') });
app.post('/signin', signin.signInAuthentication(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

/*c ---------------------------- Protected API -------------------------------------- */
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db); });
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db); });
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db); });
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res); });
app.post('/signout', auth.requireAuth, (req, res) => { signout.handleSignOut(req, res); });
app.get('/rank', auth.requireAuth, (req, res) => { rank.rank(req, res); });
/* ----------------------------- API End ------------------------------------------ */

app.listen(3002, () => {
  console.log('app is running on port 3002');
});
