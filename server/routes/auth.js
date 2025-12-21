const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret Key (should be in .env in production)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_nano_bannana';

// Login (Simplified to only password)
router.post('/login', async (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = 'yahya1234';

    try {
        if (password !== ADMIN_PASSWORD) {
            return res.status(401).json({ msg: 'Invalid Password' });
        }

        // Return a generic token
        const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { username: 'admin' } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// For frontend compatibility, we keep is-setup but always return true
router.get('/is-setup', async (req, res) => {
    res.json({ isSetup: true });
});

module.exports = router;

