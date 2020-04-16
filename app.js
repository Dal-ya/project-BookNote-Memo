const express = require('express');

const app = express();

app.use('/', (req, res) => {
  res.send('hello world');
});

app.listen(5001, () => {
  console.log('5001 server start...');
});
