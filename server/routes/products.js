const router = require('express').Router();
const Product = require('../models/Product');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const convertToBase64 = (file) => {
    return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
};

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
            productData.image = convertToBase64(req.file);
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
            productData.image = convertToBase64(req.file);
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
                price: "450"
            },
            {
                title: "Penny Loafer",
                category: "Loafer",
                image: "/assets/penny-loafers.jpg",
                description: "The quintessential slip-on. Hand-stitched for superior comfort.",
                price: "380"
            },
            {
                title: "Whole Cut Oxford",
                category: "Oxford",
                image: "/assets/whole-cut-oxfords.jpg",
                description: "Made from a single piece of leather. The epitome of formal sophistication.",
                price: "550"
            },
            {
                title: "Double Monk Strap",
                category: "Monk",
                image: "/assets/whole-cut-oxfords.jpg", // Placeholder until we have a 4th image, using same for now or random
                description: "A bold statement for the distinguished gentleman.",
                price: "420"
            }
        ];
        await Product.insertMany(products);
        res.json({ msg: "Products seeded" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
