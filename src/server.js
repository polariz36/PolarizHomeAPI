/**
 * Adapted from Samuele Zaza https://scotch.io
 * Authors: Brian Thompson
 * Last edited: 8/15/08
 */

let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let book = require('./routes/book');
let config = require('config'); // Load the db location from the JSON files

// db options
// let options = {
//   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
// };


// db connection
mongoose.connect(config.DBHost);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

// Don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
  // Use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the Apache style logs
}

// Parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.get('/', (req, res) => res.json({message: 'Welcome!'}));

app.route('/book')
  .get(book.getBooks)
  .post(book.postBook);
app.route('/book/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing
