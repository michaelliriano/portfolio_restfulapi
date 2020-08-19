let mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://mike:${process.env.DB_PASS}@cluster0.2ajz4.mongodb.net/<dbname>?retryWrites=true&w=majority`;

let Database = mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => console.log(err));

module.exports = Database;
