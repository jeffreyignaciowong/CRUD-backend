const express = require('express');
const router = express.Router({mergeParams: true});

const fs = require('fs').promises;
const moment = require('moment');
const mdq = require('mongo-date-query');
const json2csv = require('json2csv').parse;
const path = require('path')
const fields = ['_id', 'name', 'sku', 'quantity'];
const Inventory = require('../models/inventory')

// router.get('/', function (req, res) {
//     Inventory.find({createdAt: mdq.lastYear()}, function (err, students) {
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
//             const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv")
//             fs.writeFile(filePath, csv, function (err) {
//                 if (err) {
//                     return res.status(500).send({ err });
//                 }
//                 else {
//                     setTimeout(function () {
//                         fs.unlinkSync(filePath); // delete this file after 30 seconds
//                     }, 30000)
//                     console.log('test');
//                     return res.json("/exports/csv-" + dateTime + ".csv");
//                 }
//             });
//
//         }
//     })
// })

// router.get('/', async (req, res) => {
//     Inventory.find({createdAt: mdq.lastYear()}, function (err, students) {
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

router.get('/', async (req, res) => {
    let csv;
    let invItems;
    try{
        invItems = await Inventory.find();
        // console.log(invItems.constructor.name);
        // console.log(invItems);
    } catch (err) {
        // res.send('Error ' + err);
        console.log(`err1: ${err}`);
        res.sendStatus(500);
    }
    try {
        csv = json2csv(invItems, { fields });
        console.log(`csv: ${csv}`);
    } catch (err) {
        console.log(`err2: ${err}`);
        res.status(500).send('test2');
    }


    const dateTime = moment().format('YYYYMMDDhhmmss');
    const filePath = path.join(__dirname, '..', 'exports', 'csv-' + dateTime + '.csv');
    try{
        await fs.writeFile(filePath, csv);
    } catch (err){
        // res.send('Error ' + err);
        // res.sendStatus(500);
        console.log(`err3: ${err}`);
        res.status(500).send('test3');
        return;
    }
    setTimeout(() => {
        fs.unlink(filePath) // delete this file after 30 seconds
    }, 30000);
    res.sendFile(filePath);
});


module.exports = router;