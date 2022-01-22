const express = require('express');
const router = express();
const CleanItem = require('../controller/cleaningControl');
const {auth} = require('../controller/verifyToken');

router.get('/getCleanItems',auth, CleanItem.getCleanItems);

router.post('/createCleanItems',auth, CleanItem.createCleanItems);

router.put('/updateCleanItems/:id',auth, CleanItem.updateCleanItems);

// router.delete('/deleteCleanItems/:id', CleanItem.deleteCleanItems)
module.exports = router;