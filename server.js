const express = require('express');
const app = express();
const port = 3000;
var projects = require('./routes/projects');
var mail = require('./routes/guests');
app.use(express.json());
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
