const express = require('express');
const fs = require('fs');

let fullData = [];
fs.readFile('data.json', 'utf8', (err, data) => {
    fullData = data;
});


const router = express.Router();

router.get('/data/:index', (req, res) => {
    const data = JSON.parse(fullData);
    const index = req.params.index;

    if (index < 0 || index > data.data.length - 1) {
        res.status = 500;
        return res.json({ error: 'data not found' });
    }

    return res.json({
        data: data.data[index],
    });
});

module.exports = router;
