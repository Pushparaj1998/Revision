const express = require('express');
const router = express();
const Book = require('../model/book');


router.get('/getBook', async(req,res) => {
    try {
        const book = await Book.find();
        res.status(200).send(book);
    } catch (error) {
        res.status(200).send(`Error ${error}`)
    }
})

router.post('/createBook', async(req,res) => {
    try {
        const book = new Book({
            bookName : req.body.bookName,
            author : req.body.author,
            price : req.body.price
        })
        const saveBook = await book.save();
        res.status(200).json(saveBook);
    } catch (error) {
        res.status(400).send(`Error : ${error}`)
    }
})


//deleteBook
router.delete ('/deleteBook/:id',async(req,res) => {
    try {
        await Book.deleteOne({_id:req.params.id});
        res.status(200).json(`The Book with the id ${req.params.id}was deleted`)
    } catch (error) {

        res.status(400).send(`Error ${error}`);
    }
})
module.exports = router;