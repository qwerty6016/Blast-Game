'use strict';

const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const path    = require('path');
const PORT    = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
