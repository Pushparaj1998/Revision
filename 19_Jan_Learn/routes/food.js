const express = require('express');
const router = express();
const Food = require('../controller/foodControl')
const {auth} = require('../controller/verifyToken')


router.get('/getFood',auth, Food.getFood);

router.post('/createFood',auth, Food.createFood);

router.put('/updateFood/:id',auth, Food.updateFood);

router.delete('/deleteFood/:id',auth, Food.deleteFood);

module.exports = router;