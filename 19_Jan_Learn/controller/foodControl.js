
const Food = require('../model/food')

//get All the Food Items
const getFood =  async (req,res) => {
    try {
        const food = await Food.find();
        res.status(200).json(food);
    } catch (error) {
        res.status(400).send(`Error ${error}`)
    }
}
//create Food
const createFood = async (req,res) => {
    const food = new Food({
        item1: req.body.item1,
        item2 : req.body.item2,
        item3 : req.body.item3,
        item4 : req.body.item4
    })
    try {
        const saveFood = await food.save();
        res.status(200).json(saveFood);
    } catch (error) {
        res.status(400).send(`Error: ${error}`)
    }
}
//update Food
const updateFood = async(req,res) => {
    try {
        
         const food = await Food.findById(req.params.id);
         const body = req.body
        if(body.item1)
        food.item1 = body.item1;
        if(body.item2)
        food.item2 = body.item2;
        if(body.item3)
        food.item3 = body.item3;
        if(body.item4)
        food.item4 = body.item4;
        res.status(200).json(await food.save());
    } catch (error) {
        res.status(400).send(`Error ${error}`)
    }
}
//deleteFood
const deleteFood = async(req,res) => {
    try {
        await food.deleteOne({_id:req.params.id});
        res.status(200).json(`The food with the id ${req.params.id}was deleted`)
    } catch (error) {

        res.status(400).send(`Error ${error}`);
    }
}
module.exports = {getFood, createFood, updateFood, deleteFood}