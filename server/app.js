require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

const db = require('./database/db')();

db.on('error', () => console.log('connection error'));
db.once('open', () => console.log('connected to DB.'))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const careers = require('./routes/careers');
const auth = require('./routes/auth');

app.use('/careers', careers);
app.use('/auth', auth);

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
