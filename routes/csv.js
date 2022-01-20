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

// router.get('/', async (req, res) => {
//     Inventory.find({}, function (err, students) {
//         console.log(students.constructor.name);
//         console.log(students);
//         if (err) {
//             return res.status(500).send('test1');
//         }
//         else {
//             let csv
//             try {
//                 csv = json2csv(students, { fields });
//             } catch (err) {
//                 return res.status(500).send('test2');
//             }
//             const dateTime = moment().format('YYYYMMDDhhmmss');
//             const filePath = path.join(__dirname, '..', 'exports', 'csv-' + dateTime + '.csv')
//             fs.writeFile(filePath, csv, function (err) {
//                 if (err) {
//                     return res.status(500).send({ err });
//                 }
//                 else {
//                     setTimeout(function () {
//                         fs.unlinkSync(filePath); // delete this file after 30 seconds
//                     }, 30000)
//                     console.log('test');
//                     return res.sendFile(filePath);
//                 }
//             });
//
//         }
//     })
// })

module.exports = router;