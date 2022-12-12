require('express-async-errors');
const express = require('express');
const app = express();

const home = require('../routes/home');
const category = require('../routes/category');
const product = require('../routes/product');
const order = require('../routes/order');
const costumer = require('../routes/costumer');
const login = require('../routes/login');

app.use(express.json());
app.use(category);
app.use(product);
app.use(order);
app.use(costumer);
app.use(login);
app.use(home);

exports.app = app;