const debug = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// create express app
const app = express();

// middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('tiny'));
//app.use(helmet());

// routes
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/jquery/js', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use(express.static('public'));
app.use((request, response) => {
  response.status(404).type('text/plain').send('Page Not Found');
});
app.use(require('./middleware/error'));

// bind the server to an http port
const hostname = config.get('http.hostname');
const port = config.get('http.port');
app.listen(port, () => {
  debug(`Server running at http://${hostname}:${port}/`);
});
