const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({

    name: {
       type: String,
       required: true
    },
    sku: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('inventory', inventorySchema);