var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(cors())

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

//create application/json parser
app.use(bodyParser.json());


function Pedido(id, idxForma, quantidade) {
  this.id = id;
  this.idxForma = idxForma;
  this.quantidade = quantidade;
}

const PEDIDOS = [
 { id: 0, idxForma: 0, quantidade: 3 }
];
var SEQUENCE = 1;

app.get('/api/pedidos', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');

  res.json(PEDIDOS);
});

app.get('/api/pedidos/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');

  const result = PEDIDOS.find(e => e.id === +req.params['id']);
  if (!result) {
    res.sendStatus(404); // 404 Not Found
  } else {
    res.json(result);
  }
});

app.post('/api/pedidos', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');

  PEDIDOS.push(new Pedido(SEQUENCE++, req.body.idxForma, req.body.quantidade));
  res.sendStatus(200);
});

app.put('/api/pedidos', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');

  const index = PEDIDOS.findIndex(e => e.id === +req.body.id);
  if (index === -1) {
    res.sendStatus(400); // 400 Bad Request
  } else {
    const pedido = new Pedido(req.body.id, req.body.idxForma, req.body.quantidade);
    PEDIDOS.splice(index, 1, pedido);
    res.sendStatus(200);
  }
});

app.delete('/api/pedidos/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');

  const index = PEDIDOS.findIndex(e => e.id === +req.params['id']);
  if (index === -1) {
    res.sendStatus(400); // 400 Bad Request
  } else {
    PEDIDOS.splice(index, 1);
    res.sendStatus(200);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
