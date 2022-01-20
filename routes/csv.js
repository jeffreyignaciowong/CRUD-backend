const express = require('express');
const router = express.Router({mergeParams: true});

const fs = require('fs').promises;
const moment = require('moment');
const json2csv = require('json2csv').parse;
const path = require('path');
const fields = ['_id', 'name', 'sku', 'quantity'];
const Inventory = require('../models/inventory');

router.get('/', async (req, res) => {
    try{
        let invItems = await Inventory.find();
        let csv = json2csv(invItems, { fields });

        const dateTime = moment().format('YYYYMMDDhhmmss');
        const filePath = path.join(__dirname, '..', 'exports', 'csv-' + dateTime + '.csv');

        await fs.writeFile(filePath, csv);

        setTimeout(() => {
            fs.unlink(filePath); // delete this file after 30 seconds
        }, 30000);
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).send('Error ' + err);
        // res.sendStatus(500);
    }
});

module.exports = router;