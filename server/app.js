require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

const db = require('./database/db')();

db.on('error', () => console.log('connection error'));
db.once('open', () => console.log('connected to DB.'))

const passport = require('passport');
const local = require('./strategies/local');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 60000 * 60 * 24 * 365 },
    store: new MongoStore({ mongooseConnection: db })
}));

app.use(passport.initialize());
app.use(passport.session());

const careers = require('./routes/careers');
const auth = require('./routes/auth');

app.use('/careers', careers);
app.use('/auth', auth);

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
