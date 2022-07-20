const mongoose = require('mongoose');

const options = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect( process.env.URL, options );

mongoose.connection.on('connected' , () => {
    console.log("Mongoose connected successfully");

})