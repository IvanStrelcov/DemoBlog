const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const routes     = require('./routes');
const http       = require('http');
const path       = require('path');
const nofavicon  = require('no-favicon');
const session    = require('express-session');
const port       = process.env.PORT || 8080;
const app        = express();

// Configurations
app.use(cors());
app.use(session({ secret: 'demo blog' }));
app.use(nofavicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(express.static('../dist'));

// Routes
app.use('/api', routes);

// Run
app.listen( port, () => {
  console.log("Express server listening on port " + port);
});
