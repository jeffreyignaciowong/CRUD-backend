const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inventoryRouter = require('./routes/inventory');

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000/inventory';

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(url, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

app.get('/', (req, res) => {
    console.log('hello');
    res.send('hello');
});


app.use('/inventory', inventoryRouter);

app.listen(8000, () => {
    console.log('Server started');
});