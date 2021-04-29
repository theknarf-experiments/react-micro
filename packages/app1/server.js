#!/usr/bin/env node
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.use(express.static('build'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
