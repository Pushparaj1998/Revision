const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Workers = require('../model/hotel');

//getWorkers
const getWorkers = async(req,res) => {
    try {
        const workers = await Workers.find();
        res.status(200).json(workers);
    } catch (error) {
        res.status(400).send(`Error ${error}`)
    }
}

//createWorker
const createWorker = async(req,res) => {
    //hashPasswords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const worker = new Workers({
        name : req.body.name,
        role : req.body.role,
        email : req.body.email,
        password : hashPassword
    })
    try {
        const saveWorker  = await worker.save();
        res.status(200).json(saveWorker);
    } catch (error) {
        res.status(400).send(`Error ${error}`)
    }
}
//updateWorker
const updateWorker = async(req,res) => {
    //hashPasswords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    try {
        const worker = await Workers.findById(req.params.id);
         const body = req.body
        if(body.name)
        worker.name = body.name;
        if(body.role)
        worker.role = body.role;
        if(body.email)
        worker.email = body.email;
        if(body.password)
        worker.password = body.password;
        res.status(200).json(await worker.save());
    } catch (error) {
        res.status(400).send(`Error ${error}`)
    }
}
//deleteWorker
const deleteWorker = async(req,res) => {
    try {
        await Workers.deleteOne({_id:req.params.id});
        res.status(200).json(`The User with the id ${req.params.id}was deleted`)
    } catch (error) {

        res.status(400).send(`Error ${error}`);
    }
}
//loginWorker
const loginWorker = async(req,res) => {
    try {
        //checkEmail
        const checkEmail = await Workers.findOne({email: req.body.email});
        if(!checkEmail) return res.status(400).send("Invalid Email");
        //checkPassword
        const checkPass = await bcrypt.compare(req.body.password, checkEmail.password);
        if(!checkPass) return res.status(400).send("Invalid Password");
        //create and assign Token
        const token = await jwt.sign({role : checkEmail.role}, process.env.TokenSecret);
        res.header('Auth-token', token).send(token);
    } catch (error) {
        
    }
}

module.exports = {getWorkers , createWorker, updateWorker, deleteWorker, loginWorker}