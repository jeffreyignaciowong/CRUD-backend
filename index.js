const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000/inventory';

const app = express();

app.use(express.json());

mongoose.connect(url, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

app.get('/', (req, res) => {
    console.log('hello');
    res.send('hello');
});

const inventoryRouter = require('./routes/inventory');
app.use('/inventory', inventoryRouter);

app.listen(9000, () => {
    console.log('Server started');
});