const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // 'Loafer', 'Oxford', 'Boot', etc.
    image: { type: String, required: true }, // URL or path
    description: { type: String, required: true },
    price: { type: String, required: true } // format like "$450"
});

module.exports = mongoose.model('Product', ProductSchema);
