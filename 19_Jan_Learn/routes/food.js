const express = require('express');
const router = express();
const Food = require('../controller/foodControl')
const {authRole} = require('../controller/verifyToken')
router.get('/getFood',authRole, Food.getFood);

router.post('/createFood',authRole, Food.createFood);

router.put('/updateFood/:id',authRole, Food.updateFood);

router.delete('/deleteFood',authRole, Food.deleteFood);

module.exports = router;