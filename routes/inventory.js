const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');
const csvRouter = require('./csv');

router.use('/csv', csvRouter);

/*
ADD TO Check if body is empty
ADD Test cases

 */


router.get('/', async(req,res) => {
    try{
        const invenItems = await Inventory.find();
        // res.status(200).json(invenItems);
        res.status(200).json({
            status: 200,
            data: invenItems
        });
    } catch(err){
        // res.send('Error ' + err);
        res.sendStatus(500);
    }
});

const findHelper = async(req, res, itemType, value) => {
    const item = {
        [itemType]: value,
    };
    console.log(item);
    try{
        const invenItems = await Inventory.find(item);
        //res.status(200).json(invenItems);
        res.status(200).json({
            status: 200,
            data: invenItems
        });
    } catch(err){
        // res.send('Error ' + err);
        res.sendStatus(500);
    }
};

router.get('/searchbyid/:id', async(req,res) => {
    await findHelper(req, res, '_id', req.params.id);
    // let item = {
    //     "_id": req.params.id
    // };
    // try{
    //     const invenItems = await Inventory.find(item);
    //     res.json(invenItems)
    // } catch(err){
    //     res.send('Error ' + err)
    // }
});

router.get('/searchbyname/:name', async(req,res) => {
    await findHelper(req, res, 'name', req.params.name);
    // console.log('name params');
    // let keys = Object.keys(req.params);
    // console.log(req.params.name);
    // console.log(keys);
    // let item = {
    //     "name": req.params.name
    // };
    // try{
    //     const invenItems = await Inventory.find(item);
    //     res.json(invenItems)
    // } catch(err){
    //     res.send('Error ' + err)
    // }
});

router.get('/searchbysku/:sku', async(req,res) => {
    await findHelper(req, res, 'sku', req.params.sku);
});


router.post('/', async(req,res) => {
    console.log('post');
    console.log(req.body.name);
    console.log(req.body.sku);
    console.log(req.body.quantity);
    const invenItem = new Inventory({
        name: req.body.name,
        sku: req.body.sku,
        quantity: req.body.quantity
    });

    try{
        const item1 =  await invenItem.save();
        console.log(`item1: ${item1}`);
        // res.status(201).json(item1);
        res.status(201).json({
            status: 201,
            data: item1
        });
    }catch(err){
        // res.send('Error ' + err);
        res.sendStatus(500);
    }
});

router.patch('/:id',async(req,res)=> {
    const filter = { '_id': req.params.id};
    console.log(`req.body.name: ${req.body.name}`);
    console.log(`req.body.sku: ${req.body.sku}`);
    console.log(`req.body.quantity: ${req.body.quantity}`);
    const update = {
        name: req.body.name,
        sku: req.body.sku,
        quantity: req.body.quantity
    };
    try{
        const item = await Inventory.findOneAndUpdate(filter, update, {
            new: true
        });
        res.status(200).json({
            status: 200,
            data: item
        });
        // const alien = await Alien.findById(req.params.id);
        // alien.sub = req.body.sub;
        // const a1 = await alien.save();
        // res.json(a1);
    }catch(err){
        // res.send('Error ' + err);
        res.sendStatus(500);
    }

});

router.delete('/:id', async(req,res)=> {
    try {
        const item = await Inventory.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 200,
            data: item
        });
    } catch(err) {
        // res.send('Error ' + err);
        res.sendStatus(500);
    }
});

// router.get('/csv', async(req,res)=> {
//     try{
//         const cursor = await Inventory.find();
//
//
//         const transformer = (doc) => {
//             return {
//                 Id: doc._id,
//                 name: doc.name,
//                 sku: doc.sku,
//                 quantity: doc.quantity
//             }
//         };
//
//         const filename = 'inventory.csv';
//         res.setHeader('Content-disposition', `attachment; filename=${filename}`);
//         res.writeHead(200, { 'Content-Type': 'text/csv' });
//
//         res.flushHeaders();
//
//         let csvStream = fastCsv.format({headers: true}).transform(transformer);
//
//         //invenItems.stream().pipe(csvStream).pipe(res);
//         //nvenItems.stream()
//         cursor.stream()
//     } catch(err){
//         // res.send('Error ' + err);
//         res.sendStatus(500);
//     }
// });

module.exports = router;