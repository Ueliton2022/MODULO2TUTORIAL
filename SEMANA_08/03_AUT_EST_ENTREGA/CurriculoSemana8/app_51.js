
const express = require('express');
const bodyParser = require('body-parser') 
const app = express();
var port = 3000
const sqlite3 = require('sqlite3').verbose(); 
const DBPATH = 'bdcurrriculo.db'; 
app.use(express.static("."));
app.use(express.json());
const hostname = "127.0.0.2"
const urlencodedParser = bodyParser.urlencoded({extended:false})


app.get('/curriculobd', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  var db = new sqlite3.Database(DBPATH); 
var sql = 'SELECT * FROM curriculo ORDER BY id COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); 
});

app.post('/curriculobd', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  sql = `INSERT INTO curriculobd contrate_me = ${req.body.contrate_me}, cep = ${req.body.cep}, estado = ${req.body.estado}, Login = ${req.body.Login}, Senha = ${req.body.Senha}, WHERE idcurriculo = ${req.body.idcurriculo}`; 
  var db = new sqlite3.Database(DBPATH); 
  db.run(sql, [],  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); 
  res.end()
});

app.post('/curriculobdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  sql = `DELETE FROM curriculodb WHERE idcurriculo = ${req.body.idcurriculo}`;
  var db = new sqlite3.Database(DBPATH);
  db.run(sql, [],  err => {
      if (err) {
          throw err;
      }
      res.end();
  });
  db.close();
});

app.post('/curriculobdupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

 sql = `UPDATE curriculobd SET contrate_me = "${req.body.contrate_me}", cep = ${req.body.cep}, estado = "${req.body.estado}", Login = ${req.body.Login}, Senha = ${req.body.Senha} WHERE idcurriculo = ${req.body.idcurriculo}`;
  var db = new sqlite3.Database(DBPATH);
  db.run(sql, [],  err => {
      if (err) {
          throw err;
      }
      res.end();
  });
  db.close();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




