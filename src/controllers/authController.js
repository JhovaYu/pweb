const path = require('path');
const userModel = require('../models/userModel');

const showLogin = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Faltan datos');

  userModel.findByUsernameAndPassword(username, password, (err, user) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (!user) return res.status(401).send('Credenciales inválidas');

    req.session.user = { id: user.id, username: user.username };
    res.redirect('/dashboard');
  });
};

const dashboard = (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
};

const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

module.exports = { showLogin, login, dashboard, logout };
