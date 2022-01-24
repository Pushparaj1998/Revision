const express = require('express');
const mongoose = require('mongoose');
const app = express();
const url = "mongodb://localhost/SchemaTypeDB";

mongoose.connect(url, {useNewUrlParser : true});
const con = mongoose.connection;
con.on('open', ()=> {
    console.log("DB Connected...")
})
app.use(express.json());
app.use('/',require('./routes/user'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on that Port ${PORT}`));