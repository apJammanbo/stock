const express = require('express');
const fs = require('fs');

let data = [];
fs.readFile('data.json', 'utf8', (err, d) => {
    data = d;
});


const router = express.Router();

router.get('/data', (req, res) => {
    const d = JSON.parse(data);
    res.json({
        d }
    );
});

module.exports = router;
