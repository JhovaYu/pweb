const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',     
  user: 'root',
  password: 'root',      
  database: 'db_clinica'
});

db.connect(err => {
  if (err) console.error('Error conectando a MySQL:', err.message);
  else console.log('MySQL conectado');
});

function findByUsernameAndPassword(username, password, cb) {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1';
  db.query(sql, [username, password], (err, rows) => {
    if (err) return cb(err);
    cb(null, rows[0] || null);
  });
}

module.exports = { findByUsernameAndPassword };
