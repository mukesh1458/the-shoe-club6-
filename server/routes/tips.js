const router = require('express').Router();
const Tip = require('../models/Tip');

// Get All Tips
router.get('/', async (req, res) => {
    try {
        const tips = await Tip.find().sort({ createdAt: -1 });
        res.json(tips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Tip
router.post('/', async (req, res) => {
    try {
        const newTip = new Tip(req.body);
        const saved = await newTip.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Tip
router.put('/:id', async (req, res) => {
    try {
        const updated = await Tip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Tip
router.delete('/:id', async (req, res) => {
    try {
        await Tip.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Tip deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
