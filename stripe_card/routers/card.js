const express = require('express');
const router = express.Router();

const cardController = require('../controllers/card');

router.post("/card/add", cardController.addCard);
router.post("/card/buy/:id", cardController.buyNow);

module.exports = router;