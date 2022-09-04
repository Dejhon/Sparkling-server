require("dotenv/config");
const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const serviceRouter = require('./routes/serviceRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const bookingRouter = require('./routes/bookingRoute');
const assessRouter = require('./routes/assesmentRoute');
const messageRouter = require('./routes/messageRoute');
const app = express();
const cors = require('cors');

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use(cors())

app.use((req, res, next) =>{
  console.log('[ANGULAR-APP3.1] - User Created Middleware!!');
  next();
})

// 2) ROUTES
app.use('/sparkling/authentication',authRouter);
app.use('/sparkling/assessment',assessRouter);
app.use('/sparkling/bookings',bookingRouter);
app.use('/sparkling/services',serviceRouter);
app.use('/sparkling/users',userRouter); 
app.use('/sparkling/messages', messageRouter);


// const DB_CONN = process.env.NODE_ENV === "production"
//     ? process.env.DATABASE_PRODUCTION.replace("<PWD>",process.env.DATABASE_PASSWORD)
//     : process.env.DATABASE;
const DB_CONN = process.env.DATABASE;

mongoose.connect(DB_CONN).then((conn) => {
  console.log("Successfully connected to Sparkling's database");
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
