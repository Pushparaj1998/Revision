const express = require('express');
const router = express();
const Order = require('../model/order');


router.get('/getOrder', async(req,res) => {
    try {
        const order = await Order.find({}).populate('book_id');
        console.log('order',order)
        res.status(200).send(order);
    } catch (error) {
        res.status(200).send(`Error ${error}`)
    }
})

router.post('/createOrder', async(req,res) => {
    try {
        const order = new Order({
            book_id : req.body.book_id,
            deliveryDate : req.body.deliveryDate
        })
        await order.save()
        // const saveOrder = await order.save();
        let createorder = await Order.find({_id:order._id}).populate('book_id')
        res.status(200).json(createorder);

    } catch (error) {
        res.status(400).send(`Error : ${error}`)
    }
})

//deleteBook
router.delete ('/deleteOrder/:id',async(req,res) => {
    try {
        await Order.deleteOne({_id:req.params.id});
        res.status(200).json(`The Order with the id ${req.params.id}was deleted`)
    } catch (error) {
        res.status(400).send(`Error ${error}`);
    }
})
module.exports = router;