const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const URL = process.env.mongoDbUrl;

mongoose.connect(URL, {useNewUrlParser : true});
const con = mongoose.connection;
con.on('open' , ()=> console.log("DB Connected"));

app.use(express.json());
app.use('/api', require('./routes/food'));
app.use('/api', require('./routes/hotel'))
const PORT = 5000;
app.listen(PORT, ()=> console.log("Server running on that port 5004"))