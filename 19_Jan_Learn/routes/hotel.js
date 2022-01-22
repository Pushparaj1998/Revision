
const express = require('express');
const router  = express();
const Workers  = require('../controller/hotelControl')
const {auth} = require('../controller/verifyToken')

router.get('/getWorkers',  Workers.getWorkers )

router.post('/createWorker',auth, Workers.createWorker);

router.put('/updateWorker/:id',auth, Workers.updateWorker);

router.delete('/deleteWorker/:id',auth, Workers.deleteWorker);

router.post('/loginWorker', Workers.loginWorker);

module.exports = router;