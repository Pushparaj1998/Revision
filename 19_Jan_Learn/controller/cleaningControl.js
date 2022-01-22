const CleanItem  = require('../model/cleaningItems');
const jwt = require('jsonwebtoken');

const getCleanItems = async(req,res) => {
    try {
        const token = req.header('auth-token');
        const decoded = jwt.decode(token);
        if(decoded.role == "Manager" || decoded.role == "Cleaning" )
        {
            const items = await CleanItem.find();
            res.status(200).send(items);
        }else{
            res.status(400).json("Access Denied");
        }
    } catch (error) {
        res.status(400).send(`Error : ${error}`);
    }
}

const createCleanItems  = async(req,res) => {
    
    try {
        const token = req.header('auth-token');
        const decoded = jwt.decode(token);
        if(decoded.role == "Manager")
        {
            const item = new CleanItem
            ({
                item1 : req.body.item1,
                item2 : req.body.item2,
                item3 : req.body.item3,
                item4 : req.body.item4
            })
            const saveItems = await item.save();
            res.status(200).send(saveItems);
        }else{
            res.status(400).send('Access Denied');
        }
    } catch (error) {
        res.status(400).send(`Error : ${error}`);
    }
}

const updateCleanItems = async(req,res) => {
    try {
        const token = req.header('auth-token');
        const decoded = jwt.decode(token);
        if(decoded.role == "Manager")
        {
            const cleanItem = await CleanItem.findById(req.params.id);
            const body = req.body;
            if(body.item1)
            cleanItem.item1 = body.item1
            if(body.item2)
            cleanItem.item2 = body.item2
            if(body.item3)
            cleanItem.item3 = body.item3
            if(body.item4)
            cleanItem.item4 = body.item4
            res.status(200).json(await cleanItem.save());
        }
        else{
            res.status(400).send('Access Denied');
        }
    } catch (error) {
        res.status(400).send(`Error : ${error}`)
    }
}

// const deleteCleanItems = async(req,res) => {
//     try {
//         const removedItem = await CleanItem.deleteOne(req.body);
//         res.status(200).send(removedItem)
//     } catch (error) {
//         res.status(400).send(`Error : ${error}`)
//     }
// }
module.exports = { getCleanItems, createCleanItems , updateCleanItems};