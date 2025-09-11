const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./src/routes/index.routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'clave-super-secreta',
  resave: false,
  saveUninitialized: true
}));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
