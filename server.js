const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
// const Service = require('./models/serviceModel');




const DB_CONN = process.env.NODE_ENV === 'production' ?
                process.env.DATABASE_PRODUCTION.replace('<PWD>', process.env.DATABASE_PASSWORD) :
                process.env.DATABASE;


mongoose.connect(DB_CONN)
        .then( conn=>{
            console.log("Successfully connected to Sparkling's database");
        })



const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`)
})