const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'mysql',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'appdb'
});

db.connect(function(err) {
    if (err) throw err;
    db.query('CREATE DATABASE IF NOT EXISTS appdb;');
    db.query('CREATE TABLE IF NOT EXISTS people (name VARCHAR(100));');
  });

app.get('/', (req, res) => {
    db.connect(function(err) {
        if (err) throw err;

        db.query('SELECT name FROM people;', function (err, people, _) {
            if (err) throw err;

            let html = '<h1>Full Cycle Rocks!</h1>';

            if (people.length > 0) {
                html += '<table><thead><tr><th>Name</th></tr></thead><tbody>';

                people.forEach(p => {
                    html += `<tr><td>${p.name}</td></tr>`;
                });

                html += '</tbody></table>';
            }

            res.send(html);
        });
      });
});

app.post('/add-person', (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).send('Nome é obrigatório');
  }

  db.connect(function(err) {
    if (err) throw err;
    const query = 'INSERT INTO people (name) VALUES (?)';
    db.query(query, [name], function (err, result, _) {
      if (err) throw err;
      console.log(result);
      res.send('Pessoa adicionada com sucesso');
    });
  });
});

app.listen(3000, () => {
  console.log('App rodando na porta 3000');
});
