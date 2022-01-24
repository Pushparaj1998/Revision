const User = require('../models/User');
const express = require('express');
const router = express.Router();

router.get('/getUser', async(req,res) => {
    try {
        const users = await User.find();
     res.status(400).send(users)   
    } catch (error) {
      res.status(400).send('Error ' + error);
  
    }
}
)
//create User
router.post('/createUser', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        age: req.body.age,
        DOB: req.body.DOB,
        experience: req.body.experience,
        team: req.body.team
    })
    try {
        const saveUser = await user.save();
        res.status(200).json(saveUser);
    } catch (error) {
        res.status(400).send('Error ' + error);
    }
})

//Update User
router.put('/updateUser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const body = req.body;
        if (body.name) user.name = body.name;
        if (body.email) user.email = body.email;
        if (body.role) user.role = body.role;
        if (body.age) user.age = body.age;
        if (body.DOB) user.DOB = body.DOB;
        if (body.experience) user.experience = body.experience;
        if (body.team) user.team = body.team;
        res.status(200).json(await user.save())
    } catch (error) {
        res.status(400).send('Error' + error);
    }
})

//Delete User
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send(`this id ${req.params.id} User was Deleted `);

    } catch (error) {
        res.status(400).send(`Error ${error}`);
    }
})


//count Employees
router.get('/countEmp', async(req,res) => {
    try {
        const count = await User.count({role:"Employee"});
        res.status(200).json(`The Number of Employees ${count}`);
    } catch (error) {
        res.status(400).send(`Error : ${error}`)
    }
})

//distinct Roles
router.get('/distinctTeam', async(req,res) => {
    try {
        const role = await User.distinct("team");
        res.status(200).json(`The team we Having in company ${role}`)
    } catch (error) {
        res.status(400).send(`Error : ${error}`);
    }
})

//sort by Experience
router.get('/sortExp', async(req,res) => {
    try {
        const sort = await User.aggregate(
            [
                { $match: { team: {$in: ["Development", "ContentWriting", "Marketing"]}}},
                { $sort: { experience: -1}}
            ]
        )
        res.status(200).json(sort);
    } catch (error) {
        res.status(400).send(`Error: ${error}`);
    }
})

//print the particullar data
router.get('/group', async(req,res) => {
    try {
        const sort = await User.aggregate(
            [
                {$match: { team: {$in : ["Development", "ContentWriting", "Marketing"]}}},
                {$group: {_id: { name: "$name", age: "$age", role: "$role"}}}
            ]
        )
        res.json(sort);
    } catch (error) {
        res.status(400).send(`Error ${error}`);
    }
})

//get the data whose having exprience more than five years
router.get('/gte2', async(req,res) => {
    try {
        const gte = await User.aggregate(
            [
                {$match: { experience: {$gte: 5}}},
                {$sort: { experience: -1}}
            ]
        )
        res.status(200).json(gte)
    } catch (error) {
        res.status(400).send(`Error ${error}`);
    }
})

//get the data Based on DOB
router.get('/getDate/date', async (req,res)=> {
    try {
        const datefilter = await User.aggregate(
            [
                {$addFields : { stringDate : {$dateToString : { format: "%Y-%m-%d", date: "$DOB" } }}},
                {$match: {"stringDate" : {$gte: "1985-01-01"}}},
                {$sort : { DOB: -1}}
            ]
        )
        res.status(200).json(datefilter);
    } catch (error) {
        res.status(400).send(`Error ${error}`);
    }
})

//search the data based on starting words
router.post('/searchUser', async(req,res) => {
    try {
        const user = await User.find({ name: { $regex: `^${req.body.search.text.trim()}`, $options: 'i'}});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(`Error : ${error}`)
    }
})
module.exports = router;