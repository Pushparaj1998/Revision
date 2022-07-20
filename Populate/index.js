const express = require('express');
const mongoose = require('mongoose');
const app = express();
const url = 'mongodb://localhost/populateDB';

mongoose.connect(url, {useNewUrlParser : true})
const con = mongoose.connection;
con.on('open' , () => {
    console.log('DB connected....');
})

app.use(express.json());
app.use('/', require('./routes/Book'));
app.use('/', require('./routes/Order'))
const PORT = 4005;
app.listen(PORT, ()=> console.log(`Server run on port ${PORT}`));