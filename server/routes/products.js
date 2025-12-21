const router = require('express').Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Product
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const productData = { ...req.body };
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }
        const newProduct = new Product(productData);
        const saved = await newProduct.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Product
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const productData = { ...req.body };
        if (req.file) {
            productData.image = `/uploads/${req.file.filename}`;
        }
        const updated = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product && product.image && product.image.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seed Initial Products
router.post('/seed', async (req, res) => {
    try {
        await Product.deleteMany({});
        const products = [
            {
                title: "The Chelsea Boot",
                category: "Boot",
                image: "/assets/chelsea-boots.jpg",
                description: "Classic elegance meets modern durability. Crafted from premium calfskin leather.",
                price: "$450"
            },
            {
                title: "Penny Loafer",
                category: "Loafer",
                image: "/assets/penny-loafers.jpg",
                description: "The quintessential slip-on. Hand-stitched for superior comfort.",
                price: "$380"
            },
            {
                title: "Whole Cut Oxford",
                category: "Oxford",
                image: "/assets/whole-cut-oxfords.jpg",
                description: "Made from a single piece of leather. The epitome of formal sophistication.",
                price: "$550"
            },
            {
                title: "Double Monk Strap",
                category: "Monk",
                image: "/assets/whole-cut-oxfords.jpg", // Placeholder until we have a 4th image, using same for now or random
                description: "A bold statement for the distinguished gentleman.",
                price: "$420"
            }
        ];
        await Product.insertMany(products);
        res.json({ msg: "Products seeded" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
