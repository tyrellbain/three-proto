'use strict';

const express = require('express');
const path = require('path');
const http = require('http');

// Constants
const PORT = 3000;

// App
const app = express();
app.use(express.static(path.join(__dirname, '../client')));
app.use('/client/', express.static(path.join(__dirname, '../client')));

app.use('/three', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')));
app.use(
  '/dat.gui',
  express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/dat.gui.module.js'))
);

app.listen(PORT);
console.log(`Running on port ${PORT}`);
