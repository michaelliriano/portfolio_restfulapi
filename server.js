const express = require('express');
const app = express();
const port = process.env.PORT || '5000';
const compression = require('compression');
const helmet = require('helmet');
const config = require('config');
const me = require('./routes/me');
var projects = require('./routes/projects');
var mail = require('./routes/guests');
var path = require('path');
const users = require('./routes/users');
const auth = require('./routes/auth');
var cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use('/signup', users);
require('dotenv').config();
require('./database/db');
require('./mailer/Welcome');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').urlencoded({ extended: false }));
require('dotenv').config();

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/api/v1/', projects);
app.use('/api/v1/', mail);
app.use('/api/v1/', auth);
app.use('/api/v1/', me);
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
