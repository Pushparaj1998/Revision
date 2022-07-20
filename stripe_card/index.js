require('dotenv').config({path: __dirname + '/config/.env'})
const express = require('express');
require('./config/db');
const app = express();

const cardRouter = require('./routers/card');
app.use(express.json())
app.use(cardRouter)

app.listen(4007, ()=> {
    console.log("Server running on that port : 4007")
})