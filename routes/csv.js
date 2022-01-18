const express = require('express');
const router = express.Router({mergeParams: true});

const fs = require('fs');
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

router.get('/', function (req, res) {
    Inventory.find({createdAt: mdq.lastYear()}, function (err, students) {
        if (err) {
            return res.status(500).send('test1');
        }
        else {
            let csv
            try {
                csv = json2csv(students, { fields });
            } catch (err) {
                return res.status(500).send('test2');
            }
            const dateTime = moment().format('YYYYMMDDhhmmss');
            const filePath = path.join(__dirname, '..', 'exports', 'csv-' + dateTime + '.csv')
            fs.writeFile(filePath, csv, function (err) {
                if (err) {
                    return res.status(500).send({ err });
                }
                else {
                    setTimeout(function () {
                        fs.unlinkSync(filePath); // delete this file after 30 seconds
                    }, 30000)
                    console.log('test');
                    return res.sendFile(filePath);
                }
            });

        }
    })
})


module.exports = router;