const express = require('express');
const app = express();
const port = 3000;
const config = require('config');
var projects = require('./routes/projects');
var mail = require('./routes/guests');
const users = require('./routes/users');
const auth = require('./routes/auth');
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/signup', users);
require('dotenv').config();
require('./database/db');
require('./mailer/Welcome');

app.use(require('body-parser').urlencoded({ extended: false }));
require('dotenv').config();

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}

app.use('/', projects);
app.use('/', mail);
app.use('/', auth);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
