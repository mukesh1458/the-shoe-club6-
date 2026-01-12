const router = require('express').Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure disk storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        // Ensure uploads directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Get All Products
router.get('/', async (req, res) => {
    try {
        console.log('GET /api/products - Request received');
        const products = await Product.find();
        console.log('GET /api/products - Found', products.length, 'products');
        res.json(products);
    } catch (err) {
        console.error('GET /api/products - Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Add Product
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const productData = { ...req.body };
        if (req.file) {
            // Store relative path to the uploaded file
            productData.image = '/uploads/' + req.file.filename;
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

        // If a new file was uploaded
        if (req.file) {
            // Get the old product to delete old image file
            const oldProduct = await Product.findById(req.params.id);
            if (oldProduct && oldProduct.image && oldProduct.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', oldProduct.image);
                // Delete old image file if it exists
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            // Store new image path
            productData.image = '/uploads/' + req.file.filename;
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

        // Delete associated image file if it exists
        if (product && product.image && product.image.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
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
