const mongoose = require('mongoose');

// Schema for inventory items
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