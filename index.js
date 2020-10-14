const express = require('express');
const app = express();
const port = 3000;
const service = require('./service');

app.get('/bitcoin', (req, res) => {
    service().then((bitcoinPrice) => {
        res.send(bitcoinPrice.bpi.USD.rate);
    });
})

app.listen(port, () => {
  console.log(`Server started`);
})