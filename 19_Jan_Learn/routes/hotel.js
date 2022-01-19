
const express = require('express');
const router  = express();
const Workers  = require('../controller/hotelControl')


router.get('/getWorkers', Workers.getWorkers )

router.post('/createWorker', Workers.createWorker);

router.put('/updateWorker', Workers.updateWorker);

router.delete('/deleteWorker', Workers.deleteWorker);

router.post('/loginWorker', Workers.loginWorker);

module.exports = router;