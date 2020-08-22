const express = require('express');
const app = express();
const port = 3000;
var projects = require('./routes/projects');
var mail = require('./routes/guests');
const users = require('./routes/users');
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/users', users);
require('dotenv').config();
require('./database/db');
require('./mailer/Welcome');

app.use(require('body-parser').urlencoded({ extended: false }));
require('dotenv').config();

app.use('/', projects);
app.use('/', mail);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
