
const express = require('express');
const router = express.Router();
const path = require('path');
const { generateToken, generateTokensForAllUsers } = require('../controllers/tokenController');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/generate-token', generateToken);
router.get('/generate-tokens', generateTokensForAllUsers);

module.exports = router;
