const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inventoryRouter = require('./routes/inventory');
const { env } = require('process');
const path = require('path');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongooseUri = env.MONGOOSE_URI;

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(mongooseUri, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

// app.get('/', (req, res) => {
//     console.log('hello');
//     res.send('hello');
// });


app.use('/inventory', inventoryRouter);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('./front_end/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front_end', 'build', 'index.html'))
    });
}

app.listen(PORT, () => {
    console.log('Server started');
    console.log(process.env.NODE_ENV);
});